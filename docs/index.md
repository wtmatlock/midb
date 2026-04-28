# Mobile integron database

Welcome! The mobile integron database (MIDB) is a new, freely available resource of 8,854 complete and 3,576 partial plasmid-borne integrons. You can access the complete MIDB archive at `DOI`.

To learn about the complete archive contents, [go here](tutorial.md), and to find a full description of bioinformatic methods, [go here](workflow.md).

## Quickstart

The primary output is the aggregated integron annotations:

<div class="table-container" style="margin: 1.5em 0;">
    <table id="integron-table" class="display" style="width:100%"></table>
</div>

Using this, you can locate your desired nucleotide and amino acid sequences by combining `ID_replicon`, `ID_integron`, and `element`:

| Feature    | File(s) | Header naming convention  |
| -------- | ------- | ------- |
| Integrases | `integrases.fna` and `integrases.faa`  | `ID_replicon\|ID_integron\|element` |
| Putative gene cassettes proteins | `gene_cassettes.fna` and `gene_cassettes.faa`  | `ID_replicon\|ID_integron\|element` |

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
