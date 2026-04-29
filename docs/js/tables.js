function loadTSV(url, tableId) {
    $.get(url, function(data) {
        const lines = data.trim().split("\n");
        const headers = lines[0].split("\t");

        const rows = lines.slice(1).map(line => line.split("\t"));

        const columns = headers.map(h => ({ title: h }));

        $(`#${tableId}`).DataTable({
            data: rows,
            columns: columns,
            scrollX: true,
            pageLength: 25
        });
    });
}

$(document).ready(function () {
    loadTSV("integronfinder_results_integrons.tsv", "integron-table");
    loadTSV("bakta_annotations.tsv", "gene-table");
});
