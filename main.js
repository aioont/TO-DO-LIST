document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById("form");
  const textInput = document.getElementById("textInput");
  const dateInput = document.getElementById("dateInput");
  const textarea = document.getElementById("textarea");
  const msg = document.getElementById("msg");
  const tasksContainer = document.getElementById("tasks");
  const addButton = document.getElementById("add");

  // Initialize data from localStorage
  let tasksData = JSON.parse(localStorage.getItem("tasksData")) || [];

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    validateForm();
  });

  const validateForm = () => {
    if (textInput.value.trim() === "") {
      msg.innerHTML = "Task cannot be blank";
    } else {
      msg.innerHTML = "";
      saveTask();
      closeModal();
    }
  };

  const saveTask = () => {
    const newTask = {
      text: textInput.value.trim(),
      date: dateInput.value,
      description: textarea.value.trim(),
      completed: false
    };

    tasksData.push(newTask);
    localStorage.setItem("tasksData", JSON.stringify(tasksData));
    renderTasks();
    resetForm();
  };

  const renderTasks = () => {
    tasksContainer.innerHTML = "";
    tasksData.forEach((task, index) => {
      const taskElement = document.createElement("div");
      taskElement.id = index;
      taskElement.className = task.completed ? "completed" : "";

      taskElement.innerHTML = `
        <input type="checkbox" ${task.completed ? "checked" : ""} onclick="toggleComplete(${index})">
        <span class="fw-bold">${task.text}</span>
        <span class="small text-secondary">${task.date}</span>
        <p>${task.description}</p>
        <span class="options">
          <i onClick="editTask(${index})" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
          <i onClick="deleteTask(${index})" class="fas fa-trash-alt"></i>
        </span>
      `;

      tasksContainer.appendChild(taskElement);
    });
  };

  const closeModal = () => {
    addButton.setAttribute("data-bs-dismiss", "modal");
    addButton.click();
    setTimeout(() => {
      addButton.setAttribute("data-bs-dismiss", "");
    }, 0);
  };

  const resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
  };

  window.deleteTask = (index) => {
    tasksData.splice(index, 1);
    localStorage.setItem("tasksData", JSON.stringify(tasksData));
    renderTasks();
  };

  window.editTask = (index) => {
    const task = tasksData[index];

    textInput.value = task.text;
    dateInput.value = task.date;
    textarea.value = task.description;

    deleteTask(index);
  };

  window.toggleComplete = (index) => {
    tasksData[index].completed = !tasksData[index].completed;
    localStorage.setItem("tasksData", JSON.stringify(tasksData));
    renderTasks();
  };

  // Initial rendering of tasks
  renderTasks();
});
