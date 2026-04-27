$(document).ready(function() {
    $.ajax({
        url: 'combined_integronfinder_results_integrons.tsv',
        dataType: 'text',
        success: function(data) {
            const lines = data.trim().split('\n');
            const headers = lines[0].split('\t');

            const columns = headers.map(h => ({ title: h }));
            const rows = lines.slice(1).map(l => l.split('\t'));

            $('#integron-table').DataTable({
                data: rows,
                columns: columns,
                pageLength: 10,
                deferRender: true
            });
        }
    });
});
