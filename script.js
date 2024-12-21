document.addEventListener("DOMContentLoaded", () => {
    const aufgabeInput = document.getElementById("aufgabe");
    const personInput = document.getElementById("person");
    const datumInput = document.getElementById("datum");
    const erledigtInput = document.getElementById("erledigt");
    const taskTable = document.getElementById("taskTable").getElementsByTagName("tbody")[0];
    const addTaskButton = document.getElementById("addTask");
    const deleteTaskButton = document.getElementById("deleteTask");

    // Funktion: Aufgabe hinzufügen
    addTaskButton.addEventListener("click", () => {
        const aufgabe = aufgabeInput.value;
        const person = personInput.value;
        const datum = datumInput.value;
        const erledigt = erledigtInput.value;

        if (!aufgabe || !person || !datum || !erledigt) {
            alert("Bitte füllen Sie alle Felder aus!");
            return;
        }

        const newRow = taskTable.insertRow();
        newRow.insertCell(0).textContent = aufgabe;
        newRow.insertCell(1).textContent = person;
        newRow.insertCell(2).textContent = datum;
        newRow.insertCell(3).textContent = erledigt;

        alert("Aufgabe hinzugefügt!");
    });

    // Funktion: Aufgabe löschen
    deleteTaskButton.addEventListener("click", () => {
        const selectedRows = Array.from(taskTable.querySelectorAll("tr.selected"));

        if (selectedRows.length === 0) {
            alert("Bitte wählen Sie eine Aufgabe aus, die gelöscht werden soll!");
            return;
        }

        selectedRows.forEach(row => row.remove());
        alert("Aufgabe(n) gelöscht!");
    });

    // Tabelle: Zeile auswählen
    taskTable.addEventListener("click", (e) => {
        const row = e.target.closest("tr");
        if (row) {
            row.classList.toggle("selected");
        }
    });
});
