document.addEventListener('DOMContentLoaded', function () {
    // Get the hidden row element
    var hiddenRow = document.getElementById('course-grid-hidden');

    // Initially hide the hidden row
    hiddenRow.style.display = 'none';

    // Get the "Browse more courses" button
    var loadMoreCoursesBtn = document.getElementById('load-more-courses');

    // Add click event listener to the button
    loadMoreCoursesBtn.addEventListener('click', function (event) {
        // Prevent the default behavior of the button
        event.preventDefault();

        // Hide the "Browse more courses" button
        this.style.display = 'none';

        // Show the hidden row containing the new row of course cards
        hiddenRow.style.display = 'grid';

    });
});

