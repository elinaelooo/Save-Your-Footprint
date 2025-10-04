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
  home: $("#lstTasksHome"), 
  travel: $("#lstTasksTravel"), 
  habits: $("#lstTasksHabits") 
};

//wht an i doigngigngiggnigngig gignaisndwiasjdsn
function renderTasks() {

  Object.values(lblTasksColumns).forEach(c => c.innerHTML = ""); //set all types to empty
  const completedTasksIds = new Set(userInfo.completed); // set of completed task ids

  // loop through all tasks (default + custom)
  [...lblDailyEcoTasksTitle, ...userInfo.customTasks].forEach(task => {
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
    (columns[task.type] || columns.habits).appendChild(newItem);
  });

  //updates front end, showing new total Eco points of user
  totalEcoPoints.textContent = userInfo.points;
  //updateUI(); // to be implemented, will refresh score display on front end
  placeholder();

}

// when the user checks or unchecks a task
function toggleTask(task) {
  const i = userInfo.completed.indexOf(task.id); 
  if (i >= 0) {
    userInfo.completed.splice(i, 1);
    userInfo.points = Math.max(0, userInfo.points - 1);
  } else {
    // if not completed, add it and increase points
    userInfo.completed.push(task.id);
    userInfo.points++;
  }
  //saveState(); to be made
  renderTasks(); // redraw task list so changes show immediately
}


// finds custom form button
$("#lblcustomTaskForm").addEventListener("submit", e => {
  e.preventDefault(); // prevent form resubmission

  const userText = $("#tfCustomTaskText").value.trim(); // grab user input
  if (userText == "") return; // if empty, do nothing

    const ecoPoints = parseFloat($("#nfCustomTaskImpact").value) || 0.0; // get impact value
    const type = $("#tfCustomTaskText").value; // get category chosen
    state.customTasks.push({ id: "c" + Date.now(), text, type, ecoPoints }); // make new task
    $("#tfCustomTaskText").value = ""; // clear input box
    //saveState(); not made yet 
    renderTasks();
});


// button: clear all custom tasks
$("#btnClearCustom").addEventListener("click", () => {
  userInfo.customTasks = []; // reset to empty list
  //saveState();  //not made yet 
  renderTasks();
});

//reset the daily tasks thingiess
$("#btnResetToday").addEventListener("click", () => {
  userInfo.completed = []; // remove all tasks previously completed
  //saveState(); //not made yet
  renderTasks();
});


$("#btnNewTip").addEventListener("click", () => {
  $("#lblTipText").textContent = tips[0];//shows teh first tip for now
});