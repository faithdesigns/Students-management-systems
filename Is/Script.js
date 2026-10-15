document.addEventListener("DOMContentLoaded", function () {
    // Mobile navigation
    const menuButton = document.querySelector(".nav-toggle");
    const navigation = document.querySelector(".nav");

    if (menuButton && navigation) {
        menuButton.addEventListener("click", function () {
            navigation.classList.toggle("open");
        });
    }

    // Student management
    const form = document.getElementById("student-form");

    if (form) {
        const nameInput = document.getElementById("student-name");
        const admissionInput = document.getElementById("student-admission");
        const courseInput = document.getElementById("student-course");
        const phoneInput = document.getElementById("student-phone");
        const idInput = document.getElementById("student-id");
        const list = document.getElementById("student-list");
        const search = document.getElementById("student-search");
        const message = document.getElementById("student-message");
        const formTitle = document.getElementById("form-title");

        let students = [];

        try {
            students = JSON.parse(
                localStorage.getItem("studentRecords") || "[]"
            );
        } catch (error) {
            students = [];
        }

        function saveStudents() {
            localStorage.setItem("studentRecords", JSON.stringify(students));
        }

        function showMessage(text) {
            message.textContent = text;
        }

        function renderStudents() {
            const term = search.value.toLowerCase().trim();
            list.replaceChildren();

            const filtered = students.filter(function (student) {
                return (
                    student.name.toLowerCase().includes(term) ||
                    student.admission.toLowerCase().includes(term) ||
                    student.course.toLowerCase().includes(term) ||
                    student.phone.toLowerCase().includes(term)
                );
            });

            if (filtered.length === 0) {
                const row = document.createElement("tr");
                const cell = document.createElement("td");
                cell.colSpan = 5;
                cell.textContent = students.length
                    ? "No matching students found."
                    : "No students registered yet.";
                row.appendChild(cell);
                list.appendChild(row);
                return;
            }

            filtered.forEach(function (student) {
                const row = document.createElement("tr");

                [student.name, student.admission, student.course, student.phone]
                    .forEach(function (value) {
                        const cell = document.createElement("td");
                        cell.textContent = value;
                        row.appendChild(cell);
                    });

                const actions = document.createElement("td");

                const editButton = document.createElement("button");
                editButton.type = "button";
                editButton.textContent = "Edit";
                editButton.className = "btn sm";
                editButton.addEventListener("click", function () {
                    idInput.value = student.id;
                    nameInput.value = student.name;
                    admissionInput.value = student.admission;
                    courseInput.value = student.course;
                    phoneInput.value = student.phone;
                    formTitle.textContent = "Edit Student";
                    form.scrollIntoView({ behavior: "smooth" });
                });

                const deleteButton = document.createElement("button");
                deleteButton.type = "button";
                deleteButton.textContent = "Delete";
                deleteButton.className = "btn sm secondary";
                deleteButton.style.marginLeft = "6px";
                deleteButton.addEventListener("click", function () {
                    if (confirm("Delete " + student.name + "?")) {
                        students = students.filter(function (item) {
                            return item.id !== student.id;
                        });
                        saveStudents();
                        renderStudents();
                        showMessage("Student deleted.");
                    }
                });

                actions.append(editButton, deleteButton);
                row.appendChild(actions);
                list.appendChild(row);
            });
        }

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const student = {
                id: idInput.value || String(Date.now()),
                name: nameInput.value.trim(),
                admission: admissionInput.value.trim(),
                course: courseInput.value,
                phone: phoneInput.value.trim()
            };

            if (!student.name || !student.admission || !student.course) {
                showMessage("Please fill in all required fields.");
                return;
            }

            const duplicate = students.some(function (item) {
                return item.admission.toLowerCase() ===
                    student.admission.toLowerCase() &&
                    item.id !== student.id;
            });

            if (duplicate) {
                showMessage("That admission number already exists.");
                return;
            }

            const existingIndex = students.findIndex(function (item) {
                return item.id === student.id;
            });

            if (existingIndex >= 0) {
                students[existingIndex] = student;
                showMessage("Student updated successfully.");
            } else {
                students.push(student);
                showMessage("Student registered successfully.");
            }

            saveStudents();
            form.reset();
            idInput.value = "";
            formTitle.textContent = "Register a Student";
            renderStudents();
        });

        form.addEventListener("reset", function () {
            setTimeout(function () {
                idInput.value = "";
                formTitle.textContent = "Register a Student";
            }, 0);
        });

        search.addEventListener("input", renderStudents);

        renderStudents();
    }

    console.log("Student Management System loaded.");
});
