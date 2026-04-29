$(document).ready(function() {

    function loadTableData(tsvUrl, tableSelector) {
        $.ajax({
            url: tsvUrl,
            dataType: 'text',
            success: function(data) {
                const lines = data.trim().split('\n');
                
                if (lines.length === 0 || lines[0] === "") return; 

                const headers = lines[0].split('\t');
                const columns = headers.map(h => ({ title: h }));
                const rows = lines.slice(1).map(l => l.split('\t'));

                $(tableSelector).DataTable({
                    data: rows,
                    columns: columns,
                    pageLength: 10,
                    deferRender: true,
                    scrollX: true,
                    autoWidth: false
                });
            },
            error: function(xhr, status, error) {
                console.error("Failed to load data for " + tableSelector + ":", error);
            }
        });
    }

    loadTableData(
        'integronfinder_results_integrons.tsv', 
        '#integron-table'
    );

    loadTableData(
        'bakta_annotations.tsv',
        '#gene-table'
    );

});
