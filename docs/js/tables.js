$(document).ready(function() {
    function loadTable(tableId, tsvFile) {
        $.get(tsvFile, function(data) {
            const lines = data.trim().split('\n');
            const headers = lines[0].split('\t').map(h => ({ title: h }));
            const rows = lines.slice(1).map(l => l.split('\t'));

            $(tableId).DataTable({
                data: rows,
                columns: headers,
                scrollX: true,
                pageLength: 10
            });
        });
    }

    loadTable('#integron-table', 'integronfinder_results_integrons.tsv');
    loadTable('#gene-table', 'bakta_annotations.tsv');
});
