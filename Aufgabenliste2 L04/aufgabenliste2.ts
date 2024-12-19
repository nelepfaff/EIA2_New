// Aufgabe-Datenstruktur definieren
interface Task {
    title: string;
    date: string;
    time: string;
    person: string;
    comment: string;
    inProgress: boolean;
}

// Beispielhafte Aufgabenliste direkt in TypeScript
const tasks: Task[] = [
    {
        title: "Kloputzen",
        date: "2023-10-31",
        time: "20:00",
        person: "Lydia",
        comment: "die große Bürste benutzen",
        inProgress: false
    },
];

document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('add-task-btn') as HTMLButtonElement;
    const taskList = document.getElementById('task-list') as HTMLUListElement;

    // Funktion zum Rendern der Aufgaben
    function renderTasks(): void {
        taskList.innerHTML = ''; 
        tasks.forEach((task: Task) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h2>${task.title}</h2>
                <p>Datum: ${task.date}, ${task.time} Uhr</p>
                <p>Bearbeiter: ${task.person}</p>
                <p>Kommentar: ${task.comment}</p>
                <button class="edit-btn">Bearbeiten</button>
                <button class="delete-btn">Löschen</button>
                <label><input type="checkbox" class="in-progress" ${task.inProgress ? 'checked' : ''}> In Bearbeitung</label>
            `;
            taskList.appendChild(li);
        });
    }

    // Aufgaben beim Laden der Seite rendern
    renderTasks();

    // Event Listener für das Hinzufügen einer neuen Aufgabe
    addTaskBtn.addEventListener('click', () => {
        const newTask: Task = {
            title: "Neue Aufgabe",
            date: "2023-11-01",
            time: "18:00",
            person: "Kevin",
            comment: "Details hinzufügen",
            inProgress: false
        };
        tasks.push(newTask);
        renderTasks();
        console.log("Neue Aufgabe hinzugefügt");
    });

    // Event Listener für die Bearbeitung und das Löschen von Aufgaben
    taskList.addEventListener('click', (event: Event) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('edit-btn')) {
            console.log("Aufgabe bearbeiten");
        } else if (target.classList.contains('delete-btn')) {
            const li = target.closest('li');
            const index = Array.from(taskList.children).indexOf(li!);
            tasks.splice(index, 1);
            renderTasks();
            console.log("Aufgabe gelöscht");
        }
    });

    // Event Listener für "In Bearbeitung"-Checkbox
    taskList.addEventListener('change', (event: Event) => {
        const target = event.target as HTMLInputElement;
        if (target.classList.contains('in-progress')) {
            const li = target.closest('li');
            const index = Array.from(taskList.children).indexOf(li!);
            tasks[index].inProgress = target.checked;
            console.log("Aufgabe ist in Bearbeitung:", target.checked);
        }
    });
});
