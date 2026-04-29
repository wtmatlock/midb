document.addEventListener("DOMContentLoaded", function () {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js';
    document.head.appendChild(script);

    script.onload = () => {
        const tables = document.querySelectorAll(".tsv-table");

        tables.forEach((table) => {
            const tsvFile = table.getAttribute("data-tsv");
            
            const filePath = `../${tsvFile}`;

            Papa.parse(filePath, {
                download: true,
                header: true,
                skipEmptyLines: true,
                delimiter: "\t", 
                complete: function(results) {
                    $(table).DataTable({
                        data: results.data,
                        columns: results.meta.fields.map(field => ({ 
                            title: field, 
                            data: field 
                        })),
                        pageLength: 10,
                        searching: true,
                        scrollX: true,
                        autoWidth: false
                    });
                },
                error: function(err) {
                    console.error("Error loading TSV:", tsvFile, err);
                }
            });
        });
    };
});
