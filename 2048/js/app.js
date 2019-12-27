/** GLOBAL CONSTANT & VARIABLES */
const CONTAINER = document.querySelector(".game-container");
let grid = initGrid(4, 4);
let ani = [];

// grid = [
//   [0, 0, 0, 0],
//   [2, 0, 0, 2],
//   [0, 0, 0, 0],
//   [0, 0, 0, 0]
// ];

/** Init */

/* Add Basic */
ani.push( addOne(grid) );
ani.push( addOne(grid) );

/** ADD ANI */
ani = doAni( ani, grid );

/* Draw the Grid */
drawGrid(grid, CONTAINER);

/* Monitoring keyboard */
window.addEventListener('keydown', e => {

  if( ["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"].includes(e.key) ) {
    ani.push( addOne( grid ) );
    ani = doAni( ani, grid );
    move(grid, e.key);

    drawGrid(grid, CONTAINER);
    
  } else if( e.key === " " ) {
    ani.push( addOne( grid ) );

    ani = doAni( ani, grid );
    drawGrid(grid, CONTAINER);
  }


});