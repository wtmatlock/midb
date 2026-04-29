document.addEventListener("DOMContentLoaded", function () {
    const tables = document.querySelectorAll("table");

    tables.forEach((table) => {
        if (!table.classList.contains("datatable-initialised")) {
            $(table).DataTable({
                pageLength: 10,
                scrollX: true,
                autoWidth: false
            });

            table.classList.add("datatable-initialised");
        }
    });
});
