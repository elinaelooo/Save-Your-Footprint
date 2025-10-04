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