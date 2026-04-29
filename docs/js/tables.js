$(document).ready(function() {

    function loadSearchableTable(tableId, tsvUrl) {
        const finalUrl = '../' + tsvUrl;

        $.ajax({
            url: finalUrl,
            dataType: 'text',
            success: function(data) {
                const lines = data.trim().split('\n');
                if (lines.length < 2) {
                    console.error("File is empty or only has headers: " + finalUrl);
                    return;
                }

                const headers = lines[0].split('\t');
                const columns = headers.map(h => ({ title: h.trim() }));
                const rows = lines.slice(1).map(l => l.split('\t'));

                $(tableId).closest('.wy-table-responsive').contents().unwrap();

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
                console.error("Error loading TSV from: " + finalUrl);
                $(tableId).after('<p style="color:red;">Failed to load data from ' + finalUrl + '. Check if the file exists in the docs/ folder.</p>');
            }
        });
    }

    loadSearchableTable('#integron-table', 'integronfinder_results_integrons.tsv');
    loadSearchableTable('#gene-table', 'bakta_annotations.tsv');
});
