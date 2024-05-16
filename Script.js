document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('section-form');
    const gridContainer = document.getElementById('grid-container');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const period = document.getElementById('period').value;
        const habits = document.getElementById('habits').value.split(',').map(habit => habit.trim());
        createGrid(period, habits);
    });

    function createGrid(days, habits) {
        gridContainer.innerHTML = ''; // Clear the existing grid

        // Create header row with habit names
        const headerRow = document.createElement('div');
        headerRow.classList.add('header');
        headerRow.innerHTML = '<div class="header-cell"></div>'; // Empty cell for day labels
        habits.forEach(habit => {
            const habitCell = document.createElement('div');
            habitCell.classList.add('header-cell');
            habitCell.textContent = habit;
            headerRow.appendChild(habitCell);
        });
        gridContainer.appendChild(headerRow);

        // Create rows for each day
        for (let i = 0; i < days; i++) {
            const dayRow = document.createElement('div');
            dayRow.classList.add('row');
            const dayLabel = document.createElement('div');
            dayLabel.classList.add('day-label');
            dayLabel.textContent = `Day ${i + 1}`;
            dayRow.appendChild(dayLabel);
            habits.forEach(() => {
                const cell = document.createElement('div');
                cell.addEventListener('click', () => {
                    cell.classList.toggle('active');
                });
                dayRow.appendChild(cell);
            });
            gridContainer.appendChild(dayRow);
        }
    }
});
