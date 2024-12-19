document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('add-task-btn') as HTMLButtonElement;
    const taskList = document.getElementById('task-list') as HTMLUListElement;

    // Event Listener für das Hinzufügen einer neuen Aufgabe
    addTaskBtn.addEventListener('click', () => {
        console.log("Neue Aufgabe hinzufügen");
        // Hier könnte ein Formular zum Hinzufügen einer neuen Aufgabe geöffnet werden
    });

    // Event Listener für die Bearbeitung und das Löschen von Aufgaben
    taskList.addEventListener('click', (event: Event) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('edit-btn')) {
            console.log("Aufgabe bearbeiten");
        } else if (target.classList.contains('delete-btn')) {
            console.log("Aufgabe löschen");
            target.closest('li')?.remove();
        }
    });

    // Event Listener für "In Bearbeitung"-Checkbox
    taskList.addEventListener('change', (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (target.classList.contains('in-progress')) {
            const inProgress = target.checked;
            console.log("Aufgabe ist in Bearbeitung:", inProgress);
        }
    });
});
