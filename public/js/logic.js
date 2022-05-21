var chestCount = refill = localStorage.getItem('count') ?? 0;
var container = $("#container");
var chest = "<div class='chest-wrapper'><div class='chest'></div><div class='sparkle-cw'></div><div class='sparkle-ccw'></div></div>";

// Recall count
$("#count").val(chestCount);

// Fill recalled chests
while (refill > 0) {
  container.append(chest);
  refill--;
}

// Add a new chest
$("#add").click(function(){
  addChests(1);
});

// Remove last chest
$("#remove").click(function(){
  removeChests(1);
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
  let timeOut = timer * 60 * 1000 // Convert input in minutes to ms.
  for(let i = 1; i<=count; i++){
    current = container.append(chest);
    chestCount++;

    if (timer && timer !== 0){
      let lastChest = container.children().last();
      setTimeout(function() {deleteSpecificChest(lastChest);}, timeOut);
    }
  }
  updateCount();
};

function deleteSpecificChest(chest) {
  // Remove specified chest from list.
  chest.remove();
  chestCount--;
  updateCount();
}

function removeChests(count) {
  let loopEnd = Math.min(chestCount, count);
  for(let i = 1; i<=loopEnd; i++){
    // Remove current oldest chest from list.
    container.children().first().remove();
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