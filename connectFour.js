
 var WIDTH = 7;
 var HEIGHT = 6;
 
 var currPlayer = 1; // active player: 1 or 2
 var board = []; // array of rows, each row is array of cells  (board[y][x])
 
 /** makeBoard: create in-JS board structure:
  *    board = array of rows, each row is array of cells  (board[y][x])
  */
 
 function makeBoard() {
    // set "board" to empty HEIGHT x WIDTH matrix array
     for (var y = 0; y < HEIGHT; y++) {
       var insideboard = [];
     
       for (var x = 0; x < WIDTH; x++) {
         insideboard.push(null);
        }
      board.push(insideboard);


     }
 
 //console.log(insideBoard)
   //console.log(board);
 }
  


 /** makeHtmlBoard: make HTML table and row of column tops. */
 
 function makeHtmlBoard() {
     let htmlBoard=document.querySelector('#board');
  
   // add column top
   var top = document.createElement("tr");
   top.setAttribute("id", "column-top");
   top.addEventListener("click", handleClick);
 
   for (var x = 0; x < WIDTH; x++) {
     var headCell = document.createElement("td");
     headCell.setAttribute("id", x);
     top.append(headCell);
   }
   htmlBoard.append(top);

   
   
 
   //  add table
   
   for (var y = 0; y < HEIGHT; y++) {
     const row = document.createElement("tr");
     for (var x = 0; x < WIDTH; x++) {
       const cell = document.createElement("td");
       cell.setAttribute("id", `${y}-${x}`);
       row.append(cell);
       
     }
     htmlBoard.append(row);
   } 
 }
 
 /** findSpotForCol: given column x, return top empty y (null if filled) */
 
 function findSpotForCol(x) {
   // TODO: write the real version of this, rather than always returning 0
  // for (var y = 0; y < HEIGHT; y++) {
  //for (var x = 0; x < WIDTH; x++) {
    for(let y = HEIGHT-1 ; y>=0; y--){
      if(!board[y][x]){
        return y;
      }
    }
  return null;
 }
 
 /** placeInTable: update DOM to place piece into HTML table of board */
 
 function placeInTable(y, x) {
   // TODO: make a div and insert into correct table cell
   //-make a div by selecting the cell by the id getdocument 
   const newDiv = document.createElement("div");
   const cell = document.getElementById(`${y}-${x}`);

   if (currPlayer == 1) {
    newDiv.classList.add('player-one')
   } else {
       newDiv.classList.add('player-two')
   }
   cell.append(newDiv);


 }
 
 /** endGame: announce game end */
 
 function endGame(msg) {
   // pop up alert message
   alert (msg);
 }
 
 /** handleClick: handle click of column top to play piece */
 
 function handleClick(evt) {
   // get x from ID of clicked cell
   var x = +evt.target.id;
 
   // get next spot in column (if none, ignore click)
   var y = findSpotForCol(x);
   if (y === null) {
     return;

   }
 
   // place piece in board and add to HTML table
   board[y][x] = currPlayer;
   // TODO: add line to update in-memory board
   placeInTable(y, x);

   //makeHtmlBoard(y,x);
 
   // check for win
   if (checkForWin()) {
     return endGame(`Player ${currPlayer} won!`);
   }
 
   // check for tie
   // TODO: check if all cells in board are filled; if so call, call endGame
  

   //for (var y = 0; y < HEIGHT; y++) {
    //    for (var x = 0; x < WIDTH; x++) {
     //     if(board.every.row)




 
   // switch players
   // switch currPlayer 1 <-> 2
   if(currPlayer == 1){
     currPlayer = 2;
   } else {
     currPlayer = 1;
   }
 }
 
 /** checkForWin: check board cell-by-cell for "does a win start here?" */
 
 function checkForWin() {
   function _win(cells) {
     // Check four cells to see if they're all color of current player
     //  - cells: list of four (y, x) cells
     //  - returns true if all are legal coordinates & all match currPlayer
 
     return cells.every(
       ([y, x]) =>
         y >= 0 &&
         y < HEIGHT &&
         x >= 0 &&
         x < WIDTH &&
         board[y][x] === currPlayer
     );
   }
 
   
 
   for (var y = 0; y < HEIGHT; y++) {
     for (var x = 0; x < WIDTH; x++) {
       var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
       var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
       var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
       var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
 
       if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
         return true;
       }
     }
   }
 }
 
 makeBoard();
 makeHtmlBoard();
 

