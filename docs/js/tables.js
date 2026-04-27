$(document).ready(function() {
    // This targets all tables rendered in your markdown
    $('article table').DataTable({
        "paging": true,
        "searching": true,
        "info": true,
        "pageLength": 25, // Number of rows to show by default
        "order": []       // Disable initial sort so it matches your TSV order
    });
});