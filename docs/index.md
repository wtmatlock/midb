# Mobile integron database

Welcome! The mobile integron database (MIDB) is a new, freely available resource of 8,854 complete and 3,576 partial plasmid-borne integrons derived from the publicly available plasmid sequences in PLSDB (v. 2024_05_31_v2). You can access the complete MIDB archive at `DOI`.

<div class="grid cards" markdown>

-   :material-school:{ .lg .middle } __[Tutorial](tutorial.md)__
    ---
    Learn about the archive contents.

-   :material-dna:{ .lg .middle } __[Workflow](workflow.md)__
    ---
    Full description of bioinformatic methods used.

</div>

## Quickstart

The primary output is the aggregated IntegronFinder annotations (`integronfinder_results_integrons.tsv`), which you can explore here:

<div class="table-container">
    <table id="integron-table" class="display" style="width:100%"></table>
</div>

Using these, you can locate the desired nucleotide and amino acid sequences:

| Feature    | File(s) | Header naming convention  |
| -------- | ------- | ------- |
| Whole integron elements  | `integrons.fna` | `ID_replicon\|ID_integron` |
| Integrases | `integrases.fna` and `integrases.faa`  | `ID_replicon\|ID_integron\|element` |
| Putative gene cassettes proteins | `gene_cassettes.fna` and `gene_cassettes.faa`  | `ID_replicon\|ID_integron\|element` |

Note that `ID_replicon` is also the plasmid NCBI nucleotide accession, making it easy to map back to the NCBI assembly accession.

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
