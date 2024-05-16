document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('habit-form');
    const gridContainer = document.getElementById('grid-container');

    // Create the header row with days
    function createHeaderRow() {
        const headerRow = document.createElement('div');
        headerRow.classList.add('header');
        headerRow.innerHTML = '<div class="header-cell">Habits</div>'; // Label for the habit column
        for (let i = 1; i <= 31; i++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('header-cell');
            dayCell.textContent = i;
            headerRow.appendChild(dayCell);
        }
        gridContainer.appendChild(headerRow);
    }

    // Initialize the header row
    createHeaderRow();

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const habit = document.getElementById('habit').value.trim();
        if (habit) {
            addHabitRow(habit);
            document.getElementById('habit').value = ''; // Clear the input field
        }
    });

    function addHabitRow(habit) {
        const habitRow = document.createElement('div');
        habitRow.classList.add('row');
        const habitLabel = document.createElement('div');
        habitLabel.classList.add('habit-label');
        habitLabel.textContent = habit;
        habitRow.appendChild(habitLabel);
        for (let i = 0; i < 31; i++) {
            const cell = document.createElement('div');
            cell.addEventListener('click', () => {
                cell.classList.toggle('active');
            });
            habitRow.appendChild(cell);
        }
        gridContainer.appendChild(habitRow);
    }
});
