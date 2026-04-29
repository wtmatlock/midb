document$.subscribe(function () {

    function loadTable(tableId, tsvFile) {
        fetch(tsvFile)
            .then(response => response.text())
            .then(data => {
                const lines = data.trim().split('\n');
                const headers = lines[0].split('\t').map(h => ({ title: h }));
                const rows = lines.slice(1).map(l => l.split('\t'));

                $(tableId).DataTable({
                    data: rows,
                    columns: headers,
                    scrollX: true,
                    pageLength: 10,
                    destroy: true
                });
            })
            .catch(err => console.error("Failed to load:", tsvFile, err));
    }

    loadTable('#integron-table', '/integronfinder_results_integrons.tsv');
    loadTable('#gene-table', '/bakta_annotations.tsv');
});
