$(document).ready(function() {

    function loadSearchableTable(tableId, tsvUrl) {
        $.ajax({
            url: tsvUrl,
            dataType: 'text',
            success: function(data) {
                const lines = data.trim().split('\n');
                const headers = lines[0].split('\t');
                const columns = headers.map(h => ({ title: h.trim() }));
                const rows = lines.slice(1).map(l => l.split('\t'));

                $(tableId).DataTable({
                    data: rows,
                    columns: columns,
                    pageLength: 10,
                    deferRender: true,
                    scrollX: true,
                    autoWidth: false
                });
            },
            error: function(xhr, status, error) {
                console.error("Error loading " + tsvUrl, error);
            }
        });
    }

    loadSearchableTable('#integron-table', 'integronfinder_results_integrons.tsv');

    loadSearchableTable('#gene-table', 'bakta_annotations.tsv');
});
