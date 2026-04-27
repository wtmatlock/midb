# Quickstart

The primary lookup file is `integronfinder_results_integrons.tsv`. This aggregates the raw IntegronFinder outputs, and describes the following nucleotide and amino acid sequences:

| Feature    | File | Header naming convention  |
| -------- | ------- | ------- |
| Whole integron elements  | `integrons.fna` | `<ID_replicon>&#124;<ID_integron>` |
| Integrases | `integrases.fna` and `integrases.faa`  | `<ID_replicon>&#124;<ID_integron>&#124;<element>` |
| Putative gene cassettes proteins | `gene_cassettes.fna` and `gene_cassettes.faa`  | `<ID_replicon>&#124;<ID_integron>&#124;<element>` |

 > `ID_replicon` is also the plasmid NCBI nucleotide accession, making it easy to map back to the NCBI assembly accession.

{{ read_csv('docs/combined_integronfinder_results_integrons.tsv', sep='\t') }}
