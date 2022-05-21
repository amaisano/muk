$(document).ready(function(){

  var chestCount = 0;
  var container = $("#container");
  var chest = "<div class='chest-wrapper'><div class='chest'></div><div class='sparkle-cw'></div><div class='sparkle-ccw'></div></div>";

  // Add a new chest
  $("#add").click(function(){
    addChests(1);
  });

  // Remove last chest
  $("#remove").click(function(){
    deleteChests(1);
  });

  // Clear all chests
  $("#clear").click(function(){
    clearAllChests();
  });

  // Update count when adding, removing, clearing
  $("#controls button").click(function() {
    $("#count").val(chestCount);
  });

  // Remove the chest you click on
  $("#container").on("click", "div.chest-wrapper", function(){
    // "on" delegated element events need a static callback function
    $(this).hide("fast", done());
  });

  function addChests(count) {
    for(let i = 1; i<=count; i++){
      container.append(chest);
      chestCount++;
    }
  };

  function deleteChests(count) {
    let loopEnd = Math.min([chestCount, count]);
    for(let i = 1; i<=loopEnd; i++){
      // Remove current oldest chest from list.
      container.children().first().remove();
      chestCount--;
    }
  };

  function clearAllChests() {
    container.empty();
    chestCount = 0;
  }

  function done(event) {
    // Event is actually propagated on the .chest element
    $(event.target).parents('div.chest-wrapper').remove();
    chestCount--;
    localStorage.setItem('count', chestCount);
    $("#count").val(chestCount);
  }

});