# Mobile integron database

## Quickstart

The primary lookup file is `integronfinder_results_integrons.tsv`. This aggregates the raw IntegronFinder outputs, and describes the following nucleotide and amino acid sequences:

| Feature    | File | Header naming convention  |
| -------- | ------- | ------- |
| Whole integron elements  | `integrons.fna` | `<ID_replicon>\|<ID_integron>` |
| Integrases | `integrases.fna` and `integrases.faa`  | `<ID_replicon>\|<ID_integron>\|<element>` |
| Putative gene cassettes proteins | `gene_cassettes.fna` and `gene_cassettes.faa`  | `<ID_replicon>\|<ID_integron>\|<element>` |

 > `ID_replicon` is also the plasmid NCBI nucleotide accession, making it easy to map back to the NCBI assembly accession.

<div class="table-container">
    <table id="integron-table" class="display" style="width:100%"></table>
</div>

<style>
.md-typeset .table-container,
.md-typeset .dataTables_wrapper {
    width: 100% !important;
    max-width: 100% !important;
}

.md-typeset #integron-table {
    display: table !important;
    width: 100% !important;
    table-layout: auto !important;
}

.md-typeset #integron-table td, 
.md-typeset #integron-table th {
    max-width: 300px;
    white-space: normal !important;
    word-break: break-all !important;
}
</style>
