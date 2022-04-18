# Notes

```
// Can do with AJAX or HTTP server or Websockets...
Basic Requests:
- localhost:3000/index.html?addChest
- localhost:3000/index.html?removeChest
- localhost:3000/index.html?removeAll

-- Can add something like ?chestType=type1 to change it up.

// Use jQuery to manipulate DOM
- NOTE: I DON"T REMEMBER HOW JQUERY WORKS AAAAHHH

// Need to store this in a state machine of some kind. Cookies?
var chestCount = 0;
var normalChest = new $("div.chest.normal");
var container = $("#container");

// Adds a new chest to the stack
function addChest() {
    chestCount = chestCount++;
    container.append(normalChest);
}

// Removes the last placed chest
function removeChest() {
    if (chestCount > 0) {
        chestCount = chestCount--;
        container.remove(container.children.last());
    }
}

// Empties the container
function removeAll() {
    container.innerHTML("");
}

// Bonus: clicking on this layer in OBS can "open" or clear the chests clicked on

$(#container > .chest").each().addEventListener("click", clickCallback());

function clickCallback($element) {
    container.find($element).remove();
    chestCount = chestCount--;
}

--------

Horizontal Stacking
- chests are added to right side, pushing existing chests to left (right aligned)

Intial:               [1] ||EDGE
Add chest:         [1][2] ||EDGE
Add another:    [1][2][3] ||EDGE

---------

Vertical Stacking
- when a row reaches maximum capacity, slide it up, and add next row below
- should keep things above the map, chat and skill bars
- cap at 3 or 4 rows tall? might want to avoid interface along top of screen
- numbered chests below added in order:

Second row:         [1][2][3][4][5][6] ||EDGE
First row:                   [7][8][9] ||EDGE

---------

Layout summary: align bottom-right, essentially

 -----------------
|                 |
|                 |
|             ↓ → |
 -----------------

---------

CSS
- use flexbox
- not sure what body/html elements need to be, but we want 100% page fill

#container {
    display: flex;

    flex-wrap: wrap;
    align-items: flex-end;
    align-content: flex-end;
    justify-content: flex-end;

    width: 100%;
    min-height: 100%;
    margin: 0px auto;
    background-color: #BDBDBD;
}

.chest {
    min-width: 10em;
    min-height: 10em;
    margin: 0.4em;
}
```