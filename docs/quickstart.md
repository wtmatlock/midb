## Quickstart

Whilst we recommend [downloading the archive](https://doi.org/10.5281/zenodo.19662544) and [exploring the files yourself](tutorial.md), here you can quickly screen for plasmids and genes or interest.

## Screen for plasmid accessions

Enter a plasmid accession from [PLSDB (v. 2024_05_31_v2)](https://ccb-microbe.cs.uni-saarland.de/plsdb2025/) to see if it contains an integron or integron-related elements:

<div class="table-container" style="margin: 2em 0;">
    <table id="integron-table" class="display" style="width:100%"></table>
</div>

Using this, you can locate your desired nucleotide and amino acid sequences by combining `ID_replicon`, `ID_integron`, and `element`:

| Feature    | File(s) | Header naming convention  |
| -------- | ------- | ------- |
| Integrases | `integrases.fna` and `integrases.faa`  | `ID_replicon`\|`ID_integron`\|`element` |
| Putative gene cassettes proteins | `gene_cassettes.fna` and `gene_cassettes.faa`  | `ID_replicon`\|`ID_integron`\|`element` |

## Screen for gene cassette protein annotations

Elements are uniquely names by  `ID_replicon`\|`ID_integron`\|`element`|.

<div class="table-container" style="margin: 2em 0;">
    <table id="gene-table" class="display" style="width:100%"></table>
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
