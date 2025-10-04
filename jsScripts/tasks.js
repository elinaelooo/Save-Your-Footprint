const totalEcoPoints = $("#points"); // span that shows total points

const tips = [
  "take quicker shower lil bro",
  "stop eating food",
  "drink less water",
];

const lblDailyEcoTasksTitle = [
  // home tasks
  { id: "lights", text: "Turn off unused lights", type: "home", reduction: -9999 },
];

const lblTasksColumns = { 
  home: $("#taskList-home"), 
  travel: $("#taskList-travel"), 
  habits: $("#taskList-habits") 
};

//wht an i doigngigngiggnigngig gignaisndwiasjdsn
function renderTasks() {

  Object.values(lblTasksColumns).forEach(c => c.innerHTML = ""); //set all types to empty
  const completedTasksIds = new Set(state.completed); // set of completed task ids

  // loop through all tasks (default + custom)
  [...lblDailyEcoTasksTitle, ...state.customTasks].forEach(task => {
    const newItem = document.createElement("li"); // make a new list item

    //will be stylized according to what KING DAVID THE CONQUEREUR decides
    newItem.className = "task"; // give it class for styling


    newItem.innerHTML = `
      <input type="checkbox" id="${task.id}" ${completedTasksIds.has(task.id) ? "checked" : ""}>
      <label for="${task.id}">
        <span>${task.text}</span>
        <span class="meta">Impact ${task.reduction.toFixed(2)}</span>
      </label>`;
    // toggle tasktask box when clicked
    newItem.querySelector("input").addEventListener("change", () => toggleTask(task));
    // put this task into the right column
    (lblTasksColumns[task.type] || lblTasksColumns.habits).appendChild(newItem);
    
  });

  //updates front end, showing new total Eco points of user
  totalEcoPoints.textContent = state.points;
  //updateUI(); // to be implemented, will refresh score display on front end
  //placeholder();

}

// when the user checks or unchecks a task
function toggleTask(task) {
  const i = state.completed.indexOf(task.id); 
  if (i >= 0) {
    state.completed.splice(i, 1);
    state.points = Math.max(0, state.points - 1);
  } 
  else {
    state.completed.push(task.id);//add to theuir complete task lists
    state.points++;
  }
  //saveState(); to be made
  renderTasks(); // redraw task list so changes show immediately
  updateScreen();
}


// finds custom form button
$("#customTaskForm").addEventListener("submit", e => {
  e.preventDefault(); // prevent form resubmission

  const userText = $("#customTaskInput").value.trim(); // grab user input
  if (userText == "") return; // if empty, do nothing

    const ecoPoints = parseFloat($("#customTaskImpact").value) || 0.0; // get impact value
    const type = $("#customTaskCategory").value; // get category chosen
    state.customTasks.push({ id: "c" + Date.now(), 
                              text: userText, 
                              type, 
                              reduction: ecoPoints 
    }); // make new task
    $("#customTaskInput").value = ""; // clear input box
    //saveState(); not made yet 
    renderTasks();
    updateScreen();
});


// button: clear all custom tasks
$("#btnClearCustom").addEventListener("click", () => {
  state.customTasks = []; // reset to empty list
  //saveState();  //not made yet 
  renderTasks();
  updateScreen();
});

//reset the daily tasks thingiess
$("#btnResetToday").addEventListener("click", () => {
  state.completed = []; // remove all tasks previously completed
  //saveState(); //not made yet
  renderTasks();
  updateScreen();
});


$("#btnNewTip").addEventListener("click", () => {
  $("#lblTipText").textContent = tips[Math.floor(Math.random()*tips.length)];
});

document.addEventListener("DOMContentLoaded", () => {
  renderTasks();
  updateScreen();
});