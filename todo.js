let inputBx = document.querySelector('#inputBx');
let list = document.querySelector('#list');
let taskCount = document.querySelector('#taskCount');
let clearAllBtn = document.querySelector('#clearAll');

// Load saved tasks
window.onload = () => {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => createTask(task.text, task.done, task.time));
    updateCount();
};

// Add task on Enter
inputBx.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        if (this.value.trim() === "") {
            alert("Please enter a task!");
            return;
        }
        let time = new Date().toLocaleString();
        createTask(this.value, false, time);
        saveData();
        this.value = "";
    }
});

function createTask(text, done = false, time = "") {
    let listItem = document.createElement("li");

    listItem.innerHTML = `
        ${text}
        <span class="small-text">${time}</span>
        <i></i>
    `;

    if (done) listItem.classList.add("done");

    // Toggle done
    listItem.addEventListener("click", function() {
        this.classList.toggle('done');
        saveData();
    });

    // Delete
    listItem.querySelector("i").addEventListener("click", function(e){
        e.stopPropagation();
        listItem.remove();
        saveData();
    });

    list.appendChild(listItem);
    updateCount();
}

// Save to local storage
function saveData() {
    let tasks = [];
    document.querySelectorAll("#list li").forEach(li => {
        tasks.push({
            text: li.childNodes[0].textContent.trim(),
            done: li.classList.contains("done"),
            time: li.querySelector(".small-text").textContent
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateCount();
}

// Task count
function updateCount() {
    let total = document.querySelectorAll("#list li").length;
    taskCount.innerText = `${total} Tasks`;
}

// Clear all tasks
clearAllBtn.addEventListener("click", () => {
    list.innerHTML = "";
    saveData();
});
