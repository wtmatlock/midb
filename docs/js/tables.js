console.log("tables.js loaded");

function initTables() {

    function loadTable(tableId, tsvFile) {

        fetch(tsvFile)
            .then(r => {
                if (!r.ok) throw new Error(`Failed to load ${tsvFile}`);
                return r.text();
            })
            .then(text => {

                const lines = text.trim().split('\n');

                const headers = lines[0]
                    .split('\t')
                    .map(h => ({ title: h }));

                const rows = lines.slice(1)
                    .map(l => l.split('\t'));

                if (!window.jQuery || !$.fn.DataTable) {
                    console.error("DataTables not loaded");
                    return;
                }

                if ($.fn.DataTable.isDataTable(tableId)) {
                    $(tableId).DataTable().destroy();
                }

                $(tableId).empty();

                console.log("Rendering DataTable:", tableId, rows.length);

                $(tableId).DataTable({
                    data: rows,
                    columns: headers,

                    pageLength: 10,
                    lengthChange: false,
                    searching: true,
                    paging: true,
                    info: true,

                    scrollX: true,
                    autoWidth: false,
                    deferRender: true
                });

            })
            .catch(err => console.error(err));
    }

    loadTable('#integron-table', 'integronfinder_results_integrons.tsv');
    loadTable('#gene-table', 'bakta_annotations.tsv');
}

document$.subscribe(function () {
    setTimeout(initTables, 50);
});
