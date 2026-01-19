function openDietitian(evt, dietitianName) {
    // 1. Hide all dietitian views
    var i, dietView, dietBtns;
    dietView = document.getElementsByClassName("dietitian-view");
    for (i = 0; i < dietView.length; i++) {
        dietView[i].style.display = "none";
        dietView[i].classList.remove("active");
    }

    // 2. Remove "active" class from top-level buttons
    dietBtns = document.getElementsByClassName("diet-btn");
    for (i = 0; i < dietBtns.length; i++) {
        dietBtns[i].className = dietBtns[i].className.replace(" active", "");
    }

    // 3. Show the current dietitian
    document.getElementById(dietitianName).style.display = "block";

    // 4. Add active class to button
    if (evt.currentTarget) {
        evt.currentTarget.className += " active";
    }
}

function openProgram(evt, programName) {
    // 1. Hide all tab content within the visible dietitian view
    // Actually, ID uniqueness allows us to just hide all 'tab-content' globally 
    // or we can be specific. For simplicity, let's hide all tab-contents 
    // but we need to be careful not to hide the dietitian container itself.

    // Better approach: Hide all tab-contents.
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }

    // 2. Remove "active" from all program buttons
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // 3. Show specific program
    var selectedProgam = document.getElementById(programName);
    if (selectedProgam) {
        selectedProgam.style.display = "block";
        selectedProgam.classList.add("active");
    }

    // 4. Update button state
    if (evt.currentTarget) {
        evt.currentTarget.className += " active";
    }

    // 5. Update mobile dropdown if exists
    // We might have multiple dropdowns now, one per dietitian.
    // We'll leave this simple for now.
}

// Initialize default view
document.addEventListener('DOMContentLoaded', function () {
    // Open default dietitian (Beste)
    document.getElementById('beste').style.display = 'block';
});
