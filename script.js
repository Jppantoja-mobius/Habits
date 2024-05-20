document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('habit-form');
    const gridContainer = document.getElementById('grid-container');
    const resetButton = document.getElementById('reset-button');
    const setDaysButton = document.getElementById('set-days-button');
    const daysInput = document.getElementById('days');
    const habitInput = document.getElementById('habit');
    const habitError = document.getElementById('habit-error');
    let numberOfDays = 31;
    const maxHabitLength = 10;

    setDaysButton.addEventListener('click', () => {
        numberOfDays = parseInt(daysInput.value);
        if (numberOfDays > 0) {
            createHeaderRow(numberOfDays);
            form.style.display = 'flex';
            document.getElementById('settings').style.display = 'none';
        }
    });

    habitInput.addEventListener('input', () => {
        if (habitInput.value.length > maxHabitLength) {
            habitError.textContent = `Too long, type until ${maxHabitLength} characters.`;
        } else {
            habitError.textContent = '';
        }
    });

    function createHeaderRow(days) {
        gridContainer.innerHTML = ''; // Clear any existing content
        const headerRow = document.createElement('div');
        headerRow.classList.add('header');
        const habitHeader = document.createElement('div');
        habitHeader.classList.add('header-cell', 'habit-header');
        habitHeader.textContent = 'Habits';
        headerRow.appendChild(habitHeader);
        for (let i = 1; i <= days; i++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('header-cell');
            dayCell.textContent = i;
            headerRow.appendChild(dayCell);
        }
        gridContainer.appendChild(headerRow);
    }

    function loadHabits() {
        const habits = JSON.parse(localStorage.getItem('habits')) || [];
        habits.forEach(habit => addHabitRow(habit.name, habit.days));
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const habit = habitInput.value.trim();
        if (habit && habit.length <= maxHabitLength) {
            addHabitRow(habit, new Array(numberOfDays).fill(false));
            saveHabit(habit);
            habitInput.value = '';
        }
    });

    function addHabitRow(habit, days = []) {
        const habitRow = document.createElement('div');
        habitRow.classList.add('row');
        const labelContainer = document.createElement('div');
        labelContainer.classList.add('label-container');
        const habitLabel = document.createElement('div');
        habitLabel.classList.add('habit-label');
        habitLabel.textContent = habit;

        // Handle right-click to delete
        habitLabel.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            const contextMenu = createContextMenu(habit, habitRow);
            document.body.appendChild(contextMenu);
            contextMenu.style.top = `${event.pageY}px`;
            contextMenu.style.left = `${event.pageX}px`;
        });

        labelContainer.appendChild(habitLabel);
        habitRow.appendChild(labelContainer);
        for (let i = 0; i < days.length; i++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-cell');
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

    function createContextMenu(habit, habitRow) {
        const contextMenu = document.createElement('div');
        contextMenu.classList.add('context-menu');
        const deleteOption = document.createElement('div');
        deleteOption.classList.add('context-menu-option');
        deleteOption.textContent = 'Delete Habit';
        deleteOption.addEventListener('click', () => {
            deleteHabit(habit);
            gridContainer.removeChild(habitRow);
            document.body.removeChild(contextMenu);
        });
        contextMenu.appendChild(deleteOption);

        // Remove context menu on click elsewhere
        document.addEventListener('click', () => {
            if (document.body.contains(contextMenu)) {
                document.body.removeChild(contextMenu);
            }
        }, { once: true });

        return contextMenu;
    }

    function saveHabit(habit) {
        const habits = JSON.parse(localStorage.getItem('habits')) || [];
        habits.push({ name: habit, days: new Array(numberOfDays).fill(false) });
        localStorage.setItem('habits', JSON.stringify(habits));
    }

    function deleteHabit(habitName) {
        let habits = JSON.parse(localStorage.getItem('habits')) || [];
        habits = habits.filter(h => h.name !== habitName);
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

    resetButton.addEventListener('click', () => {
        localStorage.removeItem('habits');
        gridContainer.innerHTML = '';
        document.getElementById('settings').style.display = 'flex';
        form.style.display = 'none';
    });

    loadHabits();
});
