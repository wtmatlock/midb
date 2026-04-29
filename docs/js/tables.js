$(document).ready(function() {
    function loadMIDBTable(tableId, tsvUrl) {
        const finalUrl = '../' + tsvUrl;

        $.ajax({
            url: finalUrl,
            dataType: 'text',
            success: function(data) {
                const lines = data.trim().split('\n');
                if (lines.length < 2) return;

                const headers = lines[0].split('\t').map(h => ({ title: h.trim() }));
                const rows = lines.slice(1).map(l => l.split('\t'));

                $(tableId).DataTable({
                    data: rows,
                    columns: headers,
                    pageLength: 10,
                    scrollX: true,
                    autoWidth: false,
                    dom: 'frtip'
                });
            },
            error: function(xhr) {
                console.error("Failed to load: " + finalUrl);
            }
        });
    }

    loadMIDBTable('#integron-table', 'integronfinder_results_integrons.tsv');
    loadMIDBTable('#gene-table', 'bakta_annotations.tsv');
});
