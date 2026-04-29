function initMIDBTable(tableId, filename) {
    const tsvUrl = '/en/latest/' + filename;

    console.log(`[MIDB] Attempting to fetch: ${tsvUrl}`);

    $.ajax({
        url: tsvUrl,
        type: 'GET',
        dataType: 'text',
        success: function(data) {
            console.log(`[MIDB] Data received for ${tableId}`);
            const lines = data.trim().split('\n');
            if (lines.length < 2) {
                console.error(`[MIDB] ${filename} is empty or invalid.`);
                return;
            }

            const headers = lines[0].split('\t').map(h => ({ title: h.trim() }));
            const rows = lines.slice(1).map(l => l.split('\t'));

            if ($(tableId).length > 0) {
                $(tableId).DataTable({
                    data: rows,
                    columns: headers,
                    pageLength: 10,
                    scrollX: true,
                    autoWidth: false,
                    dom: 'frtip'
                });
                console.log(`[MIDB] Table ${tableId} successfully rendered.`);
            } else {
                console.error(`[MIDB] Target element ${tableId} not found in DOM.`);
            }
        },
        error: function(xhr, status, error) {
            console.error(`[MIDB] Failed to load TSV: ${tsvUrl}`, error);
            $(tableId).after(`<p style="color:red">Data Load Error: ${status}</p>`);
        }
    });
}

$(document).ready(function() {
    setTimeout(function() {
        initMIDBTable('#integron-table', 'integronfinder_results_integrons.tsv');
        initMIDBTable('#gene-table', 'bakta_annotations.tsv');
    }, 100);
});
