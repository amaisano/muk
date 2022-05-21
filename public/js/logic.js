$(document).ready(function(){

  var chestCount = localStorage.getItem('count') ?? 0;
  var container = $("#container");
  var chest = "<div class='chest-wrapper'><div class='chest'></div><div class='sparkle-cw'></div><div class='sparkle-ccw'></div></div>";

  // Recall count
  $("#count").val(chestCount);

  // Add a new chest
  $("#add").click(function(){
    container.append(chest);
    chestCount++;
    localStorage.setItem('count', chestCount);
  });

  // Remove last chest
  $("#remove").click(function(){
    if (chestCount > 0) {
      container.children().last().remove();
      chestCount--;
      localStorage.setItem('count', chestCount);
    }
  });

  // Clear all chests
  $("#clear").click(function(){
    container.empty();
    chestCount = 0;
    localStorage.setItem('count', chestCount);
  });

  // Update count when adding, removing, clearing
  $("#controls button").click(function() {
    $("#count").val(chestCount);
  });

  // Remove the chest you click on
  $("#container").on("click", "div.chest-wrapper", function(){
    $(this).hide("fast", done(event));
  });

  // "on" delegated element events need a static callback function
  function done(event) {
    // Event is actually propagated on the .chest element
    $(event.target).parents('div.chest-wrapper').remove();
    chestCount--;
    localStorage.setItem('count', chestCount);
    $("#count").val(chestCount);
  }

});