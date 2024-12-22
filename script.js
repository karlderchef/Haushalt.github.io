// Funktion zum Laden der Aufgaben aus dem LocalStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Vorherige Liste löschen

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.add('task');

        // Aufgabenanzeige mit fett formatiertem Namen
        li.innerHTML = `
            <span>${task.task} - <strong>${task.person}</strong> bis zum ${task.date} - erledigt: ${task.done}</span>
            <button onclick="deleteTask(${index})">Löschen</button>
        `;

        taskList.appendChild(li);
    });
}

// Automatisch das heutige Datum in das "Wann"-Feld setzen
function setTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = ("0" + (today.getMonth() + 1)).slice(-2); // Monat mit führender Null
    const day = ("0" + today.getDate()).slice(-2); // Tag mit führender Null

    const dateString = `${year}-${month}-${day}`; // Format YYYY-MM-DD
    document.getElementById('date').value = dateString;
}

// Aufgabe hinzufügen
document.getElementById('taskForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const taskInput = document.getElementById('task');
    const personInput = document.getElementById('wer');
    const dateInput = document.getElementById('date');
    const doneSelect = document.getElementById('done');

    const task = taskInput.value.trim();
    let person = personInput.value.trim();
    const date = dateInput.value;
    const done = doneSelect.value;

    if (task !== '' && date !== '' && person !== '') {
        // Den Namen formatieren, sodass der erste Buchstabe groß ist
        person = person.charAt(0).toUpperCase() + person.slice(1).toLowerCase();

        // Datum nur als Tag und Monat formatieren (ohne Jahr)
        const formattedDate = new Date(date);
        const day = ("0" + formattedDate.getDate()).slice(-2);
        const month = ("0" + (formattedDate.getMonth() + 1)).slice(-2); // Monat mit führender Null
        const shortDate = `${day}.${month}`; // Nur Tag und Monat speichern

        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ task, person, date: shortDate, done });

        // Speichern der Aufgaben im LocalStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));

        // Aufgaben neu laden und Anzeige aktualisieren
        loadTasks();

        // Eingabefelder leeren
        taskInput.value = '';
        personInput.value = '';
        doneSelect.value = 'nein'; // Setzt den Standardwert für "Erledigt"
    }
});

// Aufgabe löschen
function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1); // Aufgabe entfernen

    // Aufgaben neu speichern
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Aufgaben neu laden
    loadTasks();
}

// Aufgaben beim Laden der Seite anzeigen
loadTasks();

// Setze das heutige Datum beim Laden der Seite
setTodayDate();
