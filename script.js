const form = document.getElementById("studentForm");
const tableBody = document.getElementById("tableBody");

let students = JSON.parse(localStorage.getItem("students")) || [];

window.onload = () => displayStudents();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const studentId = document.getElementById("studentId").value.trim();
  const address = document.getElementById("address").value.trim();
  const contact = document.getElementById("contact").value.trim();
  const email = document.getElementById("email").value.trim();

  // Validation
  if (!/^[a-zA-Z ]+$/.test(name)) {
    alert("Name should only contain letters.");
    return;
  }
  if (!/^[0-9]+$/.test(studentId)) {
    alert("Student ID must be numbers only.");
    return;
  }
  if (!/^[0-9]{10,}$/.test(contact)) {
    alert("Contact must be at least 10 digits.");
    return;
  }
  if (!/^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  const student = { name, studentId, address, contact, email };
  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));

  displayStudents();
  form.reset();
});

function displayStudents() {
  tableBody.innerHTML = "";
  students.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.studentId}</td>
      <td>${student.address}</td>
      <td>${student.contact}</td>
      <td>${student.email}</td>
      <td>
        <button class="action-btn edit-btn" onclick="editStudent(${index})">Edit</button>
        <button class="action-btn delete-btn" onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

function editStudent(index) {
  const student = students[index];
  document.getElementById("name").value = student.name;
  document.getElementById("studentId").value = student.studentId;
  document.getElementById("address").value = student.address;
  document.getElementById("contact").value = student.contact;
  document.getElementById("email").value = student.email;

  deleteStudent(index);
}

function deleteStudent(index) {
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  displayStudents();
}
