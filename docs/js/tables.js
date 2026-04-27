$(document).ready(function() {
    $('table').DataTable({
        "paging": true, 
        "pageLength": 10,
        "lengthMenu": [10, 25, 50, 100], 
        "searching": true, 
        "ordering": true, 
        "dom": 'lfrtip' 
    });
});
