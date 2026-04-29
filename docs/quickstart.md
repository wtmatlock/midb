## Quickstart

Whilst we recommend [downloading the archive](https://doi.org/10.5281/zenodo.19662544) and [exploring the files yourself](tutorial.md), here you can quickly screen for plasmids or genes of interest.

## Screen for a plasmid

<div class="table-container" style="margin: 2em 0;">
    <table id="integron-table" class="display" style="width:100%"></table>
</div>

## Screen for a gene

<div class="table-container" style="margin: 2em 0;">
    <table id="gene-table" class="display" style="width:100%"></table>
</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.13.6/css/jquery.dataTables.min.css">
<script type="text/javascript" src="https://cdn.datatables.net/1.13.6/js/jquery.dataTables.min.js"></script>

<script>
$(document).ready(function() {
    function loadData(url, targetId) {
        $.ajax({
            url: url,
            dataType: 'text',
            success: function(data) {
                const lines = data.trim().split('\n');
                if (lines.length < 1) return;

                const headers = lines[0].split('\t').map(h => ({ title: h }));
                const rows = lines.slice(1).map(l => l.split('\t'));

                $(targetId).DataTable({
                    data: rows,
                    columns: headers,
                    pageLength: 10,
                    scrollX: true,
                    autoWidth: false
                });
            }
        });
    }

    loadData('integronfinder_results_integrons.tsv', '#integron-table');
    loadData('bakta_annotations.tsv', '#gene-table');
});
</script>

<style>
.md-typeset .table-container,
.md-typeset .dataTables_wrapper {
    width: 100% !important;
}

.md-typeset #integron-table, 
.md-typeset #gene-table {
    display: table !important;
    width: 100% !important;
    table-layout: auto !important;
}

.md-typeset table td, 
.md-typeset table th {
    max-width: 300px;
    white-space: normal !important;
    word-break: break-all !important;
}
</style>
