"use strict";
// Hauptarray zur Verwaltung der Aufgaben
let taskListData = [];
// Funktion zum Rendern der Aufgaben
function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    taskListData.forEach((task) => {
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
// Funktion zum Laden der Startdaten aus einer JSON-Datei
async function loadTasksFromServer() {
    const loadingIndicator = document.getElementById('loading-indicator');
    loadingIndicator.style.display = 'block'; // Ladeanzeige anzeigen
    try {
        const response = await fetch('tasks.json'); // JSON-Datei auf dem Server
        if (!response.ok)
            throw new Error("Fehler beim Laden der Aufgaben");
        const serverTasks = await response.json();
        taskListData.push(...serverTasks); // Array mit Aufgaben aktualisieren
        renderTasks();
    }
    catch (error) {
        console.error("Laden der Aufgaben fehlgeschlagen:", error);
    }
    finally {
        loadingIndicator.style.display = 'none'; // Ladeanzeige ausblenden
    }
}
// Funktion zum Speichern der Änderungen auf dem Server (vorerst nur simuliert)
async function saveTasksToServer() {
    const loadingIndicator = document.getElementById('loading-indicator');
    loadingIndicator.style.display = 'block'; // Ladeanzeige anzeigen
    try {
        await fetch('/save-tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskListData)
        });
        console.log("Daten erfolgreich gespeichert.");
    }
    catch (error) {
        console.error("Fehler beim Speichern der Aufgaben:", error);
    }
    finally {
        loadingIndicator.style.display = 'none'; // Ladeanzeige ausblenden
    }
}
// Hauptfunktion, die nach dem Laden des Dokuments ausgeführt wird
document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    // Aufgaben vom Server laden
    loadTasksFromServer();
    // Event Listener für das Hinzufügen einer neuen Aufgabe
    addTaskBtn.addEventListener('click', async () => {
        const newTask = {
            title: "Neue Aufgabe",
            date: "2023-11-01",
            time: "18:00",
            person: "Kevin",
            comment: "Details hinzufügen",
            inProgress: false
        };
        taskListData.push(newTask);
        renderTasks();
        await saveTasksToServer(); // Änderungen speichern
        console.log("Neue Aufgabe hinzugefügt");
    });
    // Event Listener für die Bearbeitung und das Löschen von Aufgaben
    taskList.addEventListener('click', async (event) => {
        const target = event.target;
        if (target.classList.contains('edit-btn')) {
            console.log("Aufgabe bearbeiten");
        }
        else if (target.classList.contains('delete-btn')) {
            const li = target.closest('li');
            const index = Array.from(taskList.children).indexOf(li);
            taskListData.splice(index, 1);
            renderTasks();
            await saveTasksToServer(); // Änderungen speichern
            console.log("Aufgabe gelöscht");
        }
    });
    // Event Listener für "In Bearbeitung"-Checkbox
    taskList.addEventListener('change', async (event) => {
        const target = event.target;
        if (target.classList.contains('in-progress')) {
            const li = target.closest('li');
            const index = Array.from(taskList.children).indexOf(li);
            taskListData[index].inProgress = target.checked;
            await saveTasksToServer(); // Änderungen speichern
            console.log("Aufgabe ist in Bearbeitung:", target.checked);
        }
    });
});
//# sourceMappingURL=client.js.map