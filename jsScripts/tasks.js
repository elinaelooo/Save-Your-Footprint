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

function renderTasks() {

  //traverses through lblTasksColoumns array, sets them to empty
  //then will repopopulate with the new updated tasks
  Object.values(lblTasksColumns).forEach(c => c.innerHTML = "");



  

  
  //updates front end, showing new total Eco points of user
  totalEcoPoints.textContent = userInfo.points;
}


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