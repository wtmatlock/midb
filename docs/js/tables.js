$(document).ready(function () {
    $(".tsv-table").each(function () {
        const table = this;
        const tsvFileName = $(table).data("tsv");
        
        const siteRoot = window.location.pathname.includes('/quickstart/') ? '../' : './';
        const tsvPath = siteRoot + tsvFileName;

        Papa.parse(tsvPath, {
            download: true,
            header: true,
            skipEmptyLines: true,
            delimiter: "\t",
            complete: function (results) {
                $(table).DataTable({
                    data: results.data,
                    columns: results.meta.fields.map(field => ({
                        title: field,
                        data: field
                    })),
                    pageLength: 10,
                    lengthMenu: [10, 25, 50],
                    searching: true,
                    scrollX: true,
                    autoWidth: false,
                    dom: 'frtip'
                });
            },
            error: function (err) {
                console.error("Could not load TSV file:", tsvPath, err);
            }
        });
    });
});
