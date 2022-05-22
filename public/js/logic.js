var chestCount = localStorage.getItem('count') ?? 0;
var container = $("#container");
var chestSource = $("<div class='chest-wrapper' id='[timestamp]'><div class='chest'></div><div class='sparkle-cw'></div><div class='sparkle-ccw'></div></div>");

// Fill recalled chests
addChests(chestCount, 0, false, false);

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

function addChests(count, timer, random = false, increment = true) {
  let timeOut = timer * 60 * 1000 // Convert input in minutes to ms.
  for(let i = 1; i<=count; i++){
    let chestID = `batch-${batch}_${i}-${timer}`;
    let currentChest = chest.replace('[timestamp]', chestID);
    clone = generateChest(random);
    container.append(clone);
    if (increment) {
      chestCount++;
    }
    if (timer && timer != 0){
      window['timer-'+chestID] = setTimeout(function() {deleteSpecificChest(chestID);}, timeOut);
    }
  }
  batch++;
  updateCount();
};

function generateChest(random) {
  clone = chestSource.clone();

  if (random) {
    clone.addClass('random');

    // Chest container is 7x the font size
    scaleFactor = 7;
    // For font size (in px)
    randomBase = Math.ceil((Math.random() * 100) + 10);

    clone.css("font-size", function () {
      return randomBase + "px";
      }).css("top", function () {
        return Math.ceil((Math.random() * (1080 - (1080/scaleFactor))) - randomBase) + "px";
      }).css("left", function () {
        return Math.ceil((Math.random() * (1920 - (1920/scaleFactor))) - randomBase) + "px";
      });
  }

  return clone;
}

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
    let chestDelete = container.children().last();
    chestDelete.remove();
    // We dont need the timeout anymore, better to clear it out.
    clearTimeout(window['timer-'+chestDelete.id]);
    chestCount--;
  }
  updateCount();
};

function clearAllChests() {
  container.empty();
  chestCount = batch = 0;
  updateCount();
}

function updateCount() {
  // Update count storage and display
  localStorage.setItem('count', chestCount);
  $("#count").val(chestCount);
  $("#batch").val(batch-1);
}