var chestCount = refill = localStorage.getItem('count') ?? 0;
var container = $("#container");
var chest = "<div class='chest-wrapper' id='[timestamp]'><div class='chest'></div><div class='sparkle-cw'></div><div class='sparkle-ccw'></div></div>";

// Recall count
$("#count").val(chestCount);

// Fill recalled chests
while (refill > 0) {
  container.append(chest);
  refill--;
}

// Add a new chest
$("#add").click(function(){
  let number = $('#number').val() ?? 1;
  let timer = $('#timer').val() ?? 0;
  addChests(number, timer);
});

// Remove last chest
$("#remove").click(function(){
  let number = $('#number').val() ?? 1;
  removeChests(number);
});

// Clear all chests
$("#clear").click(function(){
  clearAllChests();
});

// Remove the chest you click on
$("#container").on("click", "div.chest-wrapper", function(e){
  $(this).hide("fast", done(e));
});

function addChests(count, timer) {
  let currentTime = Date.now();
  let timeOut = timer * 60 * 1000 // Convert input in minutes to ms.
  for(let i = 1; i<=count; i++){
    let chestID = 'ch-'+currentTime+'-'+i;
    let currentChest = chest.replace('[timestamp]', chestID);
    container.append(currentChest);
    chestCount++;

    if (timer && timer != 0){
      window['timer-'+chestID] = setTimeout(function() {deleteSpecificChest(chestID);}, timeOut);
    }
  }
  updateCount();
};

function deleteSpecificChest(id) {
  let specificChest = container.find('#'+id);
  if (specificChest.length > 0){
    // Remove specified chest from list.
    specificChest.remove();
    chestCount--;
    updateCount();
  }
}

function removeChests(count) {
  let loopEnd = Math.min(chestCount, count);
  for(let i = 1; i<=loopEnd; i++){
    // Remove current oldest chest from list.
    let chestDelete = container.children().first();
    chestDelete.remove();
    // We dont need the timeout anymore, better to clear it out.
    clearTimeout(window['timer-'+chestDelete.id]);
    chestCount--;
  }
  updateCount();
};

function clearAllChests() {
  container.empty();
  chestCount = 0;
  updateCount();
}

function done(event) {
  // Event is actually propagated on the .chest element
  $(event.target).parents('div.chest-wrapper').remove();
  chestCount--;
  updateCount();
}

function updateCount() {
  // Update count storage and display
  localStorage.setItem('count', chestCount);
  $("#count").val(chestCount);
}