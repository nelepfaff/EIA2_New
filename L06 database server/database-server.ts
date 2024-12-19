// Schnittstelle zur Definition von Aufgaben
interface Task {
    _id: string;
    title: string;
    date: string;
    time: string;
    person: string;
    comment: string;
    inProgress: boolean;
}

// Array zur Verwaltung der Aufgaben
let taskListData: Task[] = [];

// Basis-URL Ihrer MingiDB
const MINGI_DB_URL = "https://7c8644f9-f81d-49cd-980b-1883574694b6.fr.bw-cloud-instance.org/npf48480/";
const COLLECTION_NAME = "tasks";

// Funktion: Aufgaben aus MingiDB abrufen
async function fetchTasksFromMingiDB(): Promise<void> {
    const loadingIndicator = document.getElementById("loading-indicator");
    if (loadingIndicator) loadingIndicator.style.display = "block";

    try {
        const response = await fetch(`${MINGI_DB_URL}mingidb.php?command=find&collection=${COLLECTION_NAME}&data={}`);
        if (!response.ok) throw new Error("Fehler beim Abrufen der Aufgaben");
        const data: Task[] = await response.json();
        taskListData = data;
        renderTasks();
    } catch (error) {
        console.error("Fehler beim Abrufen der Aufgaben:", error);
    } finally {
        if (loadingIndicator) loadingIndicator.style.display = "none";
    }
}

// Funktion: Aufgabe zu MingiDB hinzufügen
async function addTaskToMingiDB(task: Omit<Task, "_id">): Promise<void> {
    const loadingIndicator = document.getElementById("loading-indicator");
    if (loadingIndicator) loadingIndicator.style.display = "block";

    try {
        const response = await fetch(`${MINGI_DB_URL}${COLLECTION_NAME}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
        });
        if (!response.ok) throw new Error("Fehler beim Hinzufügen der Aufgabe");
        console.log("Aufgabe erfolgreich hinzugefügt.");
    } catch (error) {
        console.error("Fehler beim Hinzufügen der Aufgabe:", error);
    } finally {
        if (loadingIndicator) loadingIndicator.style.display = "none";
    }
}

// Funktion: Aufgabe aus MingiDB löschen
async function deleteTaskFromMingiDB(taskId: string): Promise<void> {
    const loadingIndicator = document.getElementById("loading-indicator");
    if (loadingIndicator) loadingIndicator.style.display = "block";

    try {
        const response = await fetch(`${MINGI_DB_URL}${COLLECTION_NAME}/${taskId}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Fehler beim Löschen der Aufgabe");
        console.log("Aufgabe erfolgreich gelöscht.");
    } catch (error) {
        console.error("Fehler beim Löschen der Aufgabe:", error);
    } finally {
        if (loadingIndicator) loadingIndicator.style.display = "none";
    }
}

// Funktion: Aufgabe in MingiDB aktualisieren
async function updateTaskInMingiDB(taskId: string, updatedTask: Partial<Task>): Promise<void> {
    const loadingIndicator = document.getElementById("loading-indicator");
    if (loadingIndicator) loadingIndicator.style.display = "block";

    try {
        const response = await fetch(`${MINGI_DB_URL}${COLLECTION_NAME}/${taskId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTask),
        });
        if (!response.ok) throw new Error("Fehler beim Aktualisieren der Aufgabe");
        console.log("Aufgabe erfolgreich aktualisiert.");
    } catch (error) {
        console.error("Fehler beim Aktualisieren der Aufgabe:", error);
    } finally {
        if (loadingIndicator) loadingIndicator.style.display = "none";
    }
}

// Funktion: Aufgaben rendern
function renderTasks(): void {
    const taskList = document.getElementById("task-list");
    if (!taskList) return;

    taskList.innerHTML = "";
    taskListData.forEach((task) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <h2>${task.title}</h2>
            <p>Datum: ${task.date}, ${task.time} Uhr</p>
            <p>Bearbeiter: ${task.person}</p>
            <p>Kommentar: ${task.comment}</p>
            <button class="delete-btn" data-id="${task._id}">Löschen</button>
            <label><input type="checkbox" class="in-progress" data-id="${task._id}" ${task.inProgress ? "checked" : ""}> In Bearbeitung</label>
        `;
        taskList.appendChild(li);
    });
}

// Hauptfunktion: Nach dem Laden des Dokuments
document.addEventListener("DOMContentLoaded", () => {
    const addTaskBtn = document.getElementById("add-task-btn");
    if (!addTaskBtn) return;

    fetchTasksFromMingiDB();

    addTaskBtn.addEventListener("click", async () => {
        const newTask: Omit<Task, "_id"> = {
            title: "Neue Aufgabe",
            date: new Date().toISOString().split("T")[0],
            time: "12:00",
            person: "Unbekannt",
            comment: "Bitte Kommentar hinzufügen",
            inProgress: false,
        };
        await addTaskToMingiDB(newTask);
        await fetchTasksFromMingiDB();
    });

    document.getElementById("task-list")?.addEventListener("click", async (event) => {
        const target = event.target as HTMLElement;
        const taskId = target.getAttribute("data-id");
        if (!taskId) return;

        if (target.classList.contains("delete-btn")) {
            await deleteTaskFromMingiDB(taskId);
            await fetchTasksFromMingiDB();
        }

        if (target.classList.contains("in-progress")) {
            const task = taskListData.find((t) => t._id === taskId);
            if (task) {
                task.inProgress = (target as HTMLInputElement).checked;
                await updateTaskInMingiDB(taskId, { inProgress: task.inProgress });
                await fetchTasksFromMingiDB();
            }
        }
    });
});
