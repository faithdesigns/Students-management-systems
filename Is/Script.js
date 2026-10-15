document.addEventListener("DOMContentLoaded", function () {
    // Mobile navigation menu
    const menuButton = document.querySelector(".nav-toggle");
    const navigation = document.querySelector(".nav");

    if (menuButton && navigation) {
        menuButton.addEventListener("click", function () {
            navigation.classList.toggle("open");
        });
    }

    // Current date
    const today = new Date();

    const dateLabel = document.getElementById("st-today-label");
    if (dateLabel) {
        dateLabel.textContent = today.toLocaleDateString("en-KE", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    }

    // Sample student and course data
    const students = [
        { id: 1, name: "John Kamau", course: "Computer Science" },
        { id: 2, name: "Mary Wanjiku", course: "Information Technology" },
        { id: 3, name: "Brian Otieno", course: "Computer Science" },
        { id: 4, name: "Grace Akinyi", course: "Business IT" },
        { id: 5, name: "Peter Mwangi", course: "Networking" }
    ];

    const courses = [
        "Computer Science",
        "Information Technology",
        "Business IT",
        "Networking"
    ];

    // Update dashboard statistics
    const studentCount = document.getElementById("st-students");
    const courseCount = document.getElementById("st-courses");
    const scoreCount = document.getElementById("st-score");
    const recentTable = document.getElementById("recent");

    if (studentCount) {
        studentCount.textContent = students.length;
    }

    if (courseCount) {
        courseCount.textContent = courses.length;
    }

    if (scoreCount) {
        scoreCount.textContent = "0%";
    }

    // Display recent students on the home page
    if (recentTable) {
        recentTable.innerHTML = "";

        students.slice(0, 5).forEach(function (student) {
            const row = document.createElement("tr");

            [student.id, student.name, student.course].forEach(function (value) {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });

            recentTable.appendChild(row);
        });
    }

    // Reset dashboard button
    const resetButton = document.getElementById("reset-btn");
    if (resetButton) {
        resetButton.addEventListener("click", function () {
            if (confirm("Reset the dashboard display?")) {
                if (studentCount) studentCount.textContent = "0";
                if (courseCount) courseCount.textContent = "0";
                if (scoreCount) scoreCount.textContent = "0%";
                if (recentTable) recentTable.innerHTML = "";

                alert("Dashboard display reset.");
            }
        });
    }

    console.log("Student Management System loaded successfully.");
});
