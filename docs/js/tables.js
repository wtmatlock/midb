$(document).ready(function () {

    function parseTSV(data) {
        const lines = data.trim().split('\n');
        const headers = lines[0].split('\t');

        const columns = headers.map(h => ({ title: h }));
        const rows = lines.slice(1).map(l => l.split('\t'));

        return { columns, rows };
    }

    function initTable($table) {
        const tsvFile = $table.data('tsv');

        if (!tsvFile) {
            console.warn("No data-tsv attribute found for table:", $table);
            return;
        }

        $.ajax({
            url: tsvFile,
            dataType: 'text',
            success: function (data) {
                const parsed = parseTSV(data);

                $table.DataTable({
                    data: parsed.rows,
                    columns: parsed.columns,
                    pageLength: 10,
                    deferRender: true,
                    scrollX: true,
                    autoWidth: false
                });
            },
            error: function (xhr, status, err) {
                console.error("Failed to load TSV:", tsvFile, err);
            }
        });
    }

    $('.tsv-table').each(function () {
        initTable($(this));
    });

});
