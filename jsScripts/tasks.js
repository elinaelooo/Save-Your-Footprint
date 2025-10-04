// this is just a list of random eco tips we can show the user
const tips = [
  "take quicker shower lil bro",
  "stop eating food",
  "drink less water",
];



// 
$("#btnNewTip").addEventListener("click", () => {
  $("#lblTipText").textContent = tips[0];//shows teh first tip for now
});