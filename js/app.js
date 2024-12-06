let tasks = [];

const addTask = () => {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = "";
        updateTasksList();
    }
};

const updateTasksList = () => {
    const taskList = document.getElementById("task-list");
    const totalTasks = document.getElementById("totalTasks");
    const completedTasks = document.getElementById("completedTasks");
    const progressBar = document.getElementById("progress");

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? "completed" : ""}">
                <input type="checkbox" class="checkbox" ${
                    task.completed ? "checked" : ""
                }>
                <p class="taskText">${task.text}</p>
                <input type="text" class="editInput" value="${task.text}" style="display: none;">
            </div>
            <div class="icons">
                <img src="./img/edit.png" alt="Edit" class="editIcon" style="cursor: pointer;">
                <img src="./img/bin.png" alt="Delete" onClick="deleteTask(${index})" style="cursor: pointer;">
            </div>
        </div>
        `;

        // Attach checkbox change event
        listItem.querySelector(".checkbox").addEventListener("change", () => toggleTaskComplete(index));

        // Handle inline editing
        const editIcon = listItem.querySelector(".editIcon");
        const taskText = listItem.querySelector(".taskText");
        const editInput = listItem.querySelector(".editInput");

        editIcon.addEventListener("click", () => {
            // Toggle between editing mode and view mode
            taskText.style.display = "none";
            editInput.style.display = "block";
            editInput.focus();

            // Save changes on blur or Enter key
            const saveChanges = () => {
                const newText = editInput.value.trim();
                if (newText) {
                    tasks[index].text = newText; // Update the task text
                }
                updateTasksList(); // Refresh the task list
            };

            editInput.addEventListener("blur", saveChanges);
            editInput.addEventListener("keydown", (e) => {
                if (e.key === "Enter") saveChanges();
            });
        });

        taskList.append(listItem);
    });

    // Update the task statistics
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;

    totalTasks.textContent = `Total Tasks: ${total}`;
    completedTasks.textContent = `Completed Tasks: ${completed}`;
    progressBar.style.width = total > 0 ? `${(completed / total) * 100}%` : "0%";
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
};

const deleteTask = (index) => {
    tasks.splice(index, 1); // Remove the task from the array
    updateTasksList(); // Update the displayed list
};

document.getElementById("newTask").addEventListener("click", function (e) {
    e.preventDefault();
    addTask();
});
