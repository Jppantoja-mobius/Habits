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

    // Load saved habits
    function loadHabits() {
        const habits = JSON.parse(localStorage.getItem('habits')) || [];
        habits.forEach(habit => addHabitRow(habit.name, habit.days));
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const habit = document.getElementById('habit').value.trim();
        if (habit) {
            addHabitRow(habit);
            saveHabit(habit);
            document.getElementById('habit').value = ''; // Clear the input field
        }
    });

    function addHabitRow(habit, days = []) {
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
                updateHabitStatus(habit, i, cell.classList.contains('active'));
            });
            if (days[i]) {
                cell.classList.add('active');
            }
            habitRow.appendChild(cell);
        }
        gridContainer.appendChild(habitRow);
    }

    function saveHabit(habit) {
        const habits = JSON.parse(localStorage.getItem('habits')) || [];
        habits.push({ name: habit, days: new Array(31).fill(false) });
        localStorage.setItem('habits', JSON.stringify(habits));
    }

    function updateHabitStatus(habitName, dayIndex, status) {
        const habits = JSON.parse(localStorage.getItem('habits')) || [];
        const habit = habits.find(h => h.name === habitName);
        if (habit) {
            habit.days[dayIndex] = status;
            localStorage.setItem('habits', JSON.stringify(habits));
        }
    }

    // Initialize the header row first
    createHeaderRow();
    // Load saved habits after the header row is created
    loadHabits();
});