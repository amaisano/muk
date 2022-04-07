$(document).ready(function(){

  var chestCount = 0;
  var container = $("#container");
  var chest = "<div class='chest'></div>";

  // Add a new chest
  $("#add").click(function(){
    container.append(chest);
    chestCount++;
  });

  // Remove last chest
  $("#remove").click(function(){
    if (chestCount > 0) {
      container.children().last().remove();
      chestCount--;
    }
  });

  // Clear all chests
  $("#clear").click(function(){
    container.empty();
    chestCount = 0;
  });

  // Update count when adding, removing, clearing
  $("#controls button").click(function() {
    $("#count").val(chestCount);
  });

  // Remove the chest you click on
  $("#container").on("click", "div", function(){
    $(this).hide("fast", function(){
      $(this).remove();
      chestCount--;
      $("#count").val(chestCount);
    });
  });
});