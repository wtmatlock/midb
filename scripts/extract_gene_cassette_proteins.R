library(Biostrings)
library(readr)
library(stringr)

integron_dir <- "/shared/team/plsdb_integrons/integronfinder_results"
output_fasta_nn <- "/shared/team/plsdb_integrons/gene_cassettes.fna"
output_fasta_aa <- "/shared/team/plsdb_integrons/gene_cassettes.faa"
ambiguity_log_file <- "/shared/team/plsdb_integrons/ambiguity_log.csv"

# initialise empty files
file.create(output_fasta_nn)
file.create(output_fasta_aa)
writeLines("sequence,issue,detected_ambiguities", ambiguity_log_file)

files <- list.files(integron_dir, pattern="\\.integrons$", recursive=TRUE, full.names=TRUE)

get_fasta <- function(f){
  sample_dir <- dirname(dirname(f))
  sample_name <- basename(sample_dir)
  file.path(sample_dir, paste0(sample_name, ".fasta"))
}

fasta_map <- split(files, vapply(files, get_fasta, character(1)))

for(fasta_file in names(fasta_map)){
  
  message("Processing: ", fasta_file)
  if(!file.exists(fasta_file)) next
  
  seqs <- readDNAStringSet(fasta_file)
  names(seqs) <- sub(" .*", "", names(seqs))
  
  integron_files <- fasta_map[[fasta_file]]
  
  for(f in integron_files){
    df <- read_tsv(f, comment = "#", show_col_types = FALSE, lazy = FALSE)
    if(nrow(df) == 0) next
    
    df_prot <- df[df$annotation == "protein", ]
    df_prot <- df_prot[df_prot$ID_replicon %in% names(seqs), ]
    if(nrow(df_prot) == 0) next
    
    seq_names <- paste(df_prot$ID_integron, df_prot$element, sep="|")
    target_seqs <- seqs[df_prot$ID_replicon]
    subseqs_dna <- subseq(target_seqs, start=df_prot$pos_beg, end=df_prot$pos_end)
    names(subseqs_dna) <- seq_names
    
    # handle reverse complement
    neg_strand <- df_prot$strand == -1
    if(any(neg_strand)){
      subseqs_dna[neg_strand] <- reverseComplement(subseqs_dna[neg_strand])
    }
    
    # always save the nucleotide sequence as-is
    writeXStringSet(subseqs_dna, output_fasta_nn, append = TRUE)
    
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
    
    # only translate sequences divisible by 3
    valid_len_idx <- which(!mod3_bad)
    
    if(length(valid_len_idx) > 0){
      dna_for_aa <- subseqs_dna[valid_len_idx]
      
      # force ANY non-AGCT character to become 'X' in protein
      dna_as_char <- as.character(dna_for_aa)
      dna_as_char <- gsub("-", "", dna_as_char) # remove gaps
      dna_as_char <- gsub("[^AGCTagct]", "N", dna_as_char) # force all R, Y, S, etc to N
      
      translated_aa <- translate(DNAStringSet(dna_as_char), if.fuzzy.codon = "X")
      names(translated_aa) <- names(dna_for_aa)
      
      writeXStringSet(translated_aa, output_fasta_aa, append = TRUE)
    }
  }
  
  rm(seqs)
  gc(verbose = FALSE)
}