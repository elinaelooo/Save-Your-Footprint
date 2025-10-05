const totalEcoPoints = $("#points");

const lblTasksColumns = { 
  home: $("#taskList-home"), 
  travel: $("#taskList-travel"), 
  habits: $("#taskList-habits") 
};

function renderTasks() {
  Object.values(lblTasksColumns).forEach(c => c.innerHTML = "");
  const completedTasksIds = new Set(state.completed);

  [...lblDailyEcoTasksTitle, ...state.customTasks].forEach(task => {
    const newItem = document.createElement("li");
    newItem.className = "task";

    newItem.innerHTML = `
      <input type="checkbox" id="${task.id}" ${completedTasksIds.has(task.id) ? "checked" : ""}>
      <label for="${task.id}">
        <span>${task.text}</span>
        <span class="meta">Impact ${task.reduction.toFixed(2)}</span>
      </label>`;
    
    newItem.querySelector("input").addEventListener("change", () => toggleTask(task));
    (lblTasksColumns[task.type] || lblTasksColumns.habits).appendChild(newItem);
  });

  totalEcoPoints.textContent = state.points;
}

function toggleTask(task) {
  const i = state.completed.indexOf(task.id); 
  if (i >= 0) {
    state.completed.splice(i, 1);
    state.points = Math.max(0, state.points - 1);
  } else {
    state.completed.push(task.id);
    state.points++;
  }
  saveState();
  renderTasks();
  updateScreen();
}

$("#customTaskForm").addEventListener("submit", e => {
  e.preventDefault();
  const userText = $("#customTaskInput").value.trim();
  if (userText === "") return;

  const ecoPoints = parseFloat($("#customTaskImpact").value) || 0.0;
  const type = $("#customTaskCategory").value;
  
  state.customTasks.push({ 
    id: "c" + Date.now(), 
    text: userText, 
    type, 
    reduction: ecoPoints 
  });
  
  $("#customTaskInput").value = "";
  saveState();
  renderTasks();
  updateScreen();
});

$("#btnClearCustom").addEventListener("click", () => {
  state.customTasks = [];
  saveState();
  renderTasks();
  updateScreen();
});

$("#btnResetToday").addEventListener("click", () => {
  state.completed = [];
  state.points = 0;
  saveState();
  renderTasks();
  updateScreen();
});

$("#btnNewTip").addEventListener("click", () => {
  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  $("#lblTipText").textContent = randomTip;
});