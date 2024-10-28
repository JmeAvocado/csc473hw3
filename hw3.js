function addRow() {
    const row = document.createElement('div');
    row.className = 'row';
    row.innerHTML = `
        <input type="text" placeholder="Course Name" required>
        <select required>
            <option value="">Select Grade</option>
            ${Object.keys(gradePoints).map(grade => `<option value="${grade}">${grade}</option>`).join('')}
        </select>
        <input type="number" min="1" placeholder="Credits" required>
        <input type="checkbox" checked>
        <button type="button" class="delete-row">X</button>
    `;
    row.querySelector('.delete-row').addEventListener('click', () => row.remove());
    document.getElementById('rows').appendChild(row);
}

function calculateGPA() {
    let totalPoints = 0;
    let totalCredits = 0;

    const rows = document.querySelectorAll('.row');

    rows.forEach(row => {
        const grade = row.children[1].value;
        const credits = parseInt(row.children[2].value);
        const include = row.children[3].checked;

        if (include && credits && grade) {
            totalPoints += gradePoints[grade] * credits;
            totalCredits += credits;
        }
    });

    const gpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
    document.getElementById('gpa').innerText = gpa;
}

function resetForm() {
    document.getElementById('rows').innerHTML = '';
    document.getElementById('gpa').innerText = '';
}

document.getElementById('add-row').addEventListener('click', addRow);
document.getElementById('calculate-gpa').addEventListener('click', calculateGPA);
document.getElementById('reset-form').addEventListener('click', resetForm);


const gradePoints = {
    'A': 4.0,
    'B+': 3.5,
    'B': 3.0,
    'C+': 2.5,
    'C': 2.0,
    'D': 1.0,
    'F': 0.0,
};