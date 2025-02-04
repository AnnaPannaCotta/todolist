class Task {
    constructor(title, description, dueDate, list, completed = false) {
    this.id = Date.now();
    this.title = title;
    this.description = description;
    this.list = list;
    this.dueDate = dueDate;
    this.completed = completed;
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }
}

class TaskList {
constructor() {
  this.tasks = this.loadFromLocalStorage("tasks");
  this.archivedTasks = this.loadFromLocalStorage("archivedTasks");
  this.renderTasks();
}

addTask(title, description, dueDate, list) {
  if (!title.trim() || !description.trim() || !dueDate.trim() || !list.trim()) return;
  
  const newTask = new Task(title, description, dueDate, list);
  this.tasks.push(newTask);
  this.saveToLocalStorage();
  this.renderTasks();
}

deleteTask(id) {
  this.tasks = this.tasks.filter(task => task.id !== id);
  this.saveToLocalStorage();
  this.renderTasks();
}

toggleTask(id) {
  const taskIndex = this.tasks.findIndex(task => task.id === id);
  if (taskIndex !== -1) {
    const task = this.tasks[taskIndex];
    task.toggleCompleted();

    if (task.completed) {
      this.archivedTasks.push(task);
      if (this.archivedTasks.length > 50) {
        this.archivedTasks.shift(); // Видаляємо найстаріший запис, якщо більше 50
      }
      this.tasks.splice(taskIndex, 1);
    }

    this.saveToLocalStorage();
    this.renderTasks();
  }
}

saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(this.tasks));
  localStorage.setItem("archivedTasks", JSON.stringify(this.archivedTasks));
}

loadFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

renderTasks() {
  const taskContainer = document.querySelector(".full-list ul");
  if (!taskContainer) return;

  taskContainer.innerHTML = "";

  this.tasks.forEach(task => {
    const taskElement = document.createElement("li");
    taskElement.classList.add("list-item");
    if (task.completed) taskElement.classList.add("completed");

    taskElement.innerHTML = `
      <div class="task-content">
        <p class="task-title">${task.title}</p>
        <p class="task-description">${task.description}</p>
        <span class="task-date">${task.dueDate}</span>
        <span class="task-list">${task.list}</span>
      </div>
      <div class="task-actions">
        <button class="toggle" data-id="${task.id}">✔</button>
        <button class="delete" data-id="${task.id}">🗑</button>
      </div>
    `;

    taskContainer.appendChild(taskElement);
  });

  document.querySelectorAll(".toggle").forEach(button => {
    button.addEventListener("click", (e) => {
      const id = Number(e.target.dataset.id);
      this.toggleTask(id);
    });
  });

  document.querySelectorAll(".delete").forEach(button => {
    button.addEventListener("click", (e) => {
      const id = Number(e.target.dataset.id);
      this.deleteTask(id);
    });
  });
}

showArchivedTasks() {
  if (this.archivedTasks.length === 0) {
    alert("Архів порожній!");
    return;
  }

  const archivedList = this.archivedTasks.map(task => 
    `${task.title} (${task.dueDate})\n${task.description}`
  ).join("\n\n");

  alert(`Архівовані завдання:\n\n${archivedList}`);
}
}

const taskList = new TaskList();
const chooseListButton = document.getElementById("choose-list");
let selectedList = "";

chooseListButton.addEventListener("click", () => {
  const savedLists = JSON.parse(localStorage.getItem("taskLists")) || [];
  if (savedLists.length === 0) {
    alert("Немає доступних списків. Спочатку створіть список.");
    return;
  }
  
  const listChoice = prompt("Оберіть список: " + savedLists.join(", "));
  if (listChoice && savedLists.includes(listChoice)) {
    selectedList = listChoice;
    chooseListButton.querySelector("span").textContent = listChoice;
  } else {
    alert("Неправильний вибір списку.");
  }
});

document.getElementById("add-button").addEventListener("click", () => {
const title = document.querySelector(".task-title").value;
const description = document.querySelector(".task-description").value;
const dueDate = document.getElementById("datePicker").value;

if (title && description && dueDate && selectedList) {
  taskList.addTask(title, description, dueDate, selectedList);
  document.querySelector(".task-title").value = "Заголовок";
  document.querySelector(".task-description").value = "";
  document.getElementById("datePicker").value = "";
  chooseListButton.querySelector("span").textContent = "Виконавець";
  selectedList = "";
}
});

document.getElementById("cancel-button").addEventListener("click", () => {
document.querySelector(".task-title").value = "";
document.querySelector(".task-description").value = "";
document.getElementById("datePicker").value = "";
chooseListButton.querySelector("span").textContent = "";
selectedList = "";
});

// Додаємо подію для кнопки "Архів"
document.getElementById("achive").addEventListener("click", () => {
taskList.showArchivedTasks();
});