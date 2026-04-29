## Quickstart

Whilst we recommend [downloading the archive](https://doi.org/10.5281/zenodo.19662544) and [exploring the files yourself](tutorial.md), here you can quickly screen for plasmids or genes of interest.

## Screen for a plasmid

Search by plasmid accession (`ID_replicon`)

<div class="table-container">
    <table id="integron-table" class="display" style="width:100%"></table>
</div>

---

## Screen for a gene or cassette
Search by gene name, protein product, or Bakta annotation.

<div class="table-container">
    <table id="gene-table" class="display" style="width:100%"></table>
</div>

---



[hidden](integronfinder_results_integrons.tsv){: style="display:none" }
[hidden](bakta_annotations.tsv){: style="display:none" }

<style>
/* Prevent layout overflow */
.md-typeset .table-container,
.md-typeset .dataTables_wrapper {
    width: 100% !important;
    max-width: 100% !important;
    margin-bottom: 2em;
}

/* Force DataTables to behave in Material Theme */
.md-typeset table.dataTable {
    display: table !important;
    width: 100% !important;
    table-layout: auto !important;
    font-size: 0.85em;
}

/* Wrap long biological IDs */
.md-typeset table.dataTable td, 
.md-typeset table.dataTable th {
    max-width: 300px;
    white-space: normal !important;
    word-break: break-all !important;
}
</style>
</style>
