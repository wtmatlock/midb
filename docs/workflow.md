# Workflow

MIDB is built on PLSDB (v. 2024_05_31_v2), a database of 72,360 plasmid sequences derived from NCBI. We processed <ins>all</ins> sequences, and leave any further curation to the user.

## Integron annotation

We ran IntegronFinder (v. 2.0.6) with the script `run_integronfinder.sh`, which parallelises the job and depends on seqkit (v. 2.13.0). We used default parameters except `--local-max --topology-file "$topo_file" --promoter-attI`, using the PLSDB topology metadata as input (`topology.txt`).

> Watch out for checkpoint directories when combining results at the end e.g. `integronfinder_results/NZ_CP135169.1/Results_Integron_Finder_NZ_CP135169.1/.ipynb_checkpoints/NZ_CP135169.1-checkpoint.integrons`

## Gene cassette protein annotation

We extracted the gene cassette proteins from the IntegronFinder output using `extract_gene_cassette_proteins.R`, which writes the `gene_cassettes.fna` and `gene_cassettes.faa` multi-FASTA files, as well as the `ambiguity_log.csv`, which reports any non-AGCT bases in the nucleotide multi-FASTA. These were translated to X's in `gene_cassettes.faa`.

Next, we annotated `gene_cassettes.faa` using Bakta (v. 1.12.0 with full database v. 6.0 including AMRFinderPlus v. 2026-01-21.1) in `bakta_proteins` mode with default parameters.

In addition, we annotated `gene_cassettes.faa` using DefenseFinder (v. 2.0.0 with models v. 2.0.2) with default parameters, and against ISfinder (v. Oct-2020) using blastp (v. 2.17.0+) with default parameters except `-evalue 1e-5 -outfmt "6 qseqid sseqid pident length mismatch gapopen qstart qend sstart send evalue bitscore qlen qcovs"`.

## Gene cassette protein clustering

We clustered `gene_cassettes.faa` using MMseqs2 (v. 18.8cc5c) with default parameters except `-s 10 --min-seq-id 0.95 -c 0.95 --cov-mode 0 --cluster-mode 0 --alignment-mode 3 --max-seqs $N`, where `$N` was the number of input sequences.

###Plasmid-level annotation

We also annotated the plasmids using ISEScan (v. 1.7.3) with default parameters, and NCBI AMRFinderPlus (v. 4.2.7 with db v. 2026-01-21.1) with default parameters except `--plus`, using `run_amrfinder.sh`.
