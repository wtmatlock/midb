function loadTable(file, tableId) {
    $.ajax({
        url: file,
        dataType: 'text',
        success: function(data) {
            const lines = data.trim().split('\n');
            const headers = lines[0].split('\t');

            const columns = headers.map(h => ({ title: h }));
            const rows = lines.slice(1).map(l => l.split('\t'));

            $(tableId).DataTable({
                data: rows,
                columns: columns,
                pageLength: 10,
                deferRender: true,
                scrollX: true,
                autoWidth: false
            });
        }
    });
}

loadTable('/integronfinder_results_integrons.tsv', '#integron-table');
loadTable('/bakta_annotations.tsv', '#gene-table');
