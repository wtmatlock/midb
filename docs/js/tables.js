$(document).ready(function() {
    function loadMIDBTable(tableId, filename) {
        // Use the explicit Read the Docs path structure
        const finalUrl = '/en/latest/' + filename;

        console.log("Attempting to load: " + finalUrl);

        $.ajax({
            url: finalUrl,
            dataType: 'text',
            success: function(data) {
                const lines = data.trim().split('\n');
                if (lines.length < 2) {
                    console.warn("File " + filename + " is empty or has no data rows.");
                    return;
                }

                const headers = lines[0].split('\t').map(h => ({ title: h.trim() }));
                const rows = lines.slice(1).map(l => l.split('\t'));

                $(tableId).DataTable({
                    data: rows,
                    columns: headers,
                    pageLength: 10,
                    scrollX: true,
                    autoWidth: false,
                    dom: 'frtip',
                    language: {
                        search: "Filter records:"
                    }
                });
                console.log("Successfully initialized " + tableId);
            },
            error: function(xhr, status, error) {
                console.error("Failed to load " + finalUrl + ": " + status + " " + error);
                $(tableId).after('<p style="color:red">Error: Could not find data at ' + finalUrl + '</p>');
            }
        });
    }

    loadMIDBTable('#integron-table', 'integronfinder_results_integrons.tsv');
    loadMIDBTable('#gene-table', 'bakta_annotations.tsv');
});
