library(Biostrings)
library(readr)
library(stringr)

integron_dir <- "/shared/team/plsdb_integrons/integronfinder_results"
ambiguity_log_file <- "/shared/team/plsdb_integrons/ambiguity_log.csv"

# gene cassettes
output_fasta_nn <- "/shared/team/plsdb_integrons/gene_cassettes.fna"
output_fasta_aa <- "/shared/team/plsdb_integrons/gene_cassettes.faa"

# full integrons
output_integrons_nn <- "/shared/team/plsdb_integrons/integrons.fna"

# tntegrases
output_intI_nn <- "/shared/team/plsdb_integrons/integrases.fna"
output_intI_aa <- "/shared/team/plsdb_integrons/integrases.faa"

# initialise empty files
file.create(output_fasta_nn)
file.create(output_fasta_aa)
file.create(output_integrons_nn)
file.create(output_intI_nn)
file.create(output_intI_aa)
writeLines("sequence,issue,detected_ambiguities", ambiguity_log_file)

files <- list.files(integron_dir, pattern="\\.integrons$", recursive=TRUE, full.names=TRUE)

get_fasta <- function(f){
  sample_dir <- dirname(dirname(f))
  sample_name <- basename(sample_dir)
  file.path(sample_dir, paste0(sample_name, ".fasta"))
}

fasta_map <- split(files, vapply(files, get_fasta, character(1)))

# helper function to extract, check ambiguities, and translate coding sequences
extract_and_translate <- function(df_subset, seqs, out_nn, out_aa) {
  df_subset <- df_subset[df_subset$ID_replicon %in% names(seqs), ]
  if(nrow(df_subset) == 0) return()
  
  seq_names <- paste(df_subset$ID_replicon, df_subset$ID_integron, df_subset$element, sep="|")
  target_seqs <- seqs[df_subset$ID_replicon]
  subseqs_dna <- subseq(target_seqs, start=df_subset$pos_beg, end=df_subset$pos_end)
  names(subseqs_dna) <- seq_names
  
  # handle reverse complement
  neg_strand <- df_subset$strand == -1
  if(any(neg_strand)){
    subseqs_dna[neg_strand] <- reverseComplement(subseqs_dna[neg_strand])
  }
  
  # always save the nucleotide sequence as-is
  writeXStringSet(subseqs_dna, out_nn, append = TRUE)
  
  dna_chars <- as.character(subseqs_dna)
  
  # identify sequences with anything non-AGCT (including gaps and IUPAC)
  ambig_matches <- str_extract_all(dna_chars, "[^AGCTagct]")
  has_ambig <- sapply(ambig_matches, length) > 0
  mod3_bad <- nchar(gsub("-", "", dna_chars)) %% 3 != 0
  
  # log sequences that have issues
  if(any(has_ambig | mod3_bad)){
    log_data <- data.frame(
      sequence = seq_names[has_ambig | mod3_bad],
      issue = ifelse(mod3_bad[has_ambig | mod3_bad], "Length not div 3", "Ambiguous characters"),
      detected_ambiguities = sapply(ambig_matches[has_ambig | mod3_bad], function(x) paste(unique(x), collapse = " "))
    )
    write_csv(log_data, ambiguity_log_file, append = TRUE)
  }
  
  # we only translate sequences divisible by 3
  valid_len_idx <- which(!mod3_bad)
  
  if(length(valid_len_idx) > 0){
    dna_for_aa <- subseqs_dna[valid_len_idx]
    
    # force ANY non-AGCT character to become 'X' in protein
    dna_as_char <- as.character(dna_for_aa)
    dna_as_char <- gsub("-", "", dna_as_char) # remove gaps
    dna_as_char <- gsub("[^AGCTagct]", "N", dna_as_char) # force all to N
    
    translated_aa <- translate(DNAStringSet(dna_as_char), if.fuzzy.codon = "X")
    names(translated_aa) <- names(dna_for_aa)
    
    writeXStringSet(translated_aa, out_aa, append = TRUE)
  }
}

for(fasta_file in names(fasta_map)){
  
  message("Processing: ", fasta_file)
  if(!file.exists(fasta_file)) next
  
  seqs <- readDNAStringSet(fasta_file)
  names(seqs) <- sub(" .*", "", names(seqs))
  
  integron_files <- fasta_map[[fasta_file]]
  
  for(f in integron_files){
    df <- read_tsv(f, comment = "#", show_col_types = FALSE, lazy = FALSE)
    if(nrow(df) == 0) next
    
    # extract full integron elements
    # group by ID_integron and ID_replicon to find the absolute start and end coordinates
    agg_start <- aggregate(pos_beg ~ ID_integron + ID_replicon, data = df, FUN = min)
    agg_end <- aggregate(pos_end ~ ID_integron + ID_replicon, data = df, FUN = max)
    df_integrons <- merge(agg_start, agg_end, by = c("ID_integron", "ID_replicon"))
    df_integrons <- df_integrons[df_integrons$ID_replicon %in% names(seqs), ]
    
    if(nrow(df_integrons) > 0){
      int_names <- paste(df_integrons$ID_replicon, df_integrons$ID_integron, sep="|")
      target_seqs_int <- seqs[df_integrons$ID_replicon]
      
      # use pmin/pmax as a safety measure just in case strand orientation swaps beg/end in some edge cases
      starts <- pmin(df_integrons$pos_beg, df_integrons$pos_end)
      ends <- pmax(df_integrons$pos_beg, df_integrons$pos_end)
      
      subseqs_int <- subseq(target_seqs_int, start=starts, end=ends)
      names(subseqs_int) <- int_names
      
      # we do not reverse complement full integrons as they contain mixed-strand elements natively
      writeXStringSet(subseqs_int, output_integrons_nn, append = TRUE)
    }
    
    # extract gene cassettes (annotation == "protein")
    df_prot <- df[df$annotation == "protein", ]
    extract_and_translate(df_prot, seqs, output_fasta_nn, output_fasta_aa)
    
    # extract integrases (annotation == "intI")
    df_intI <- df[df$annotation == "intI", ]
    extract_and_translate(df_intI, seqs, output_intI_nn, output_intI_aa)
  }
  
  rm(seqs)
  gc(verbose = FALSE)
}