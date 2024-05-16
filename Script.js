document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('section-form');
    const gridContainer = document.getElementById('grid-container');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const period = document.getElementById('period').value;
        createGrid(period);
    });

    function createGrid(days) {
        gridContainer.innerHTML = ''; // Clear the existing grid
        for (let i = 0; i < days; i++) {
            const row = document.createElement('div');
            row.classList.add('row');
            for (let j = 0; j < 10; j++) {
                const cell = document.createElement('div');
                cell.addEventListener('click', () => {
                    cell.classList.toggle('active');
                });
                row.appendChild(cell);
            }
            gridContainer.appendChild(row);
        }
    }
});
