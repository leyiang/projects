/**
 * 
 * @param {row number} row 
 * @param {col number} col 
 */
function initGrid(row, col) {
  let res = [];

  while(row--) {
    res.push( new Array(col).fill(0) );
  }

  return res;
}

/**
 * 
 * @param {grid array} grid 
 * @param {real container} container 
 */
function drawGrid(grid, container) {
  container.innerHTML = null;

  for(let i = 0; i < grid.length; i++) {
    let row = document.createElement("div");

    for(let j = 0; j < grid.length; j++) {
      let col = document.createElement("div");
      
      if( isNaN(grid[i][j]) ) {
        col.innerHTML = grid[i][j].val;
        col.className = grid[i][j].class;
      } else {
        col.innerHTML = (grid[i][j] === 0) ? null : grid[i][j];
        col.className = getClass( grid[i][j] );
      }
      
      row.appendChild( col );
    }

    row.className = "row";
    container.appendChild( row );
  }
  
}

function getClass(val) {
  let res = "";

  if( val === 0 ) {
    res = "col";
  } else if( val <= 2048 ) {
    res = "col tile-" + val;
  } else {
    res = "col tile-super";
  }

  return res;
}

function getEmptyPos(gird) {
  let res = [];
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      if( grid[i][j] === 0) {
        res.push( {i:i, j:j} );
      }
    }
  }

  return res;
}

function randomGet(arr) {
  let randomIndex = Math.floor( Math.random() * arr.length );
  return arr[ randomIndex ];
}

function addOne(grid) {
  let empty = getEmptyPos( grid );
  
  if( empty.length === 0 ) {
    return false;
  }

  let pos = randomGet(empty);
  grid[pos.i][pos.j] = Math.random() > 0.9 ? 4 : 2;

  return pos;
}

function slide(row, dir) {
  let res = row.filter( x => x != 0);
  let zeros = new Array(row.length - res.length).fill(0);

  if( ["ArrowLeft", "ArrowDown"].includes(dir) ) {
    res = res.concat( zeros );
  } else if ( ["ArrowRight", "ArrowUp"].includes(dir) ) {
    res = zeros.concat( res );
  }

  return res;
}


function rotate( grid, dir ) {
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < i; j++) {
      let tmp = grid[i][j];
      grid[i][j] = grid[j][i];
      grid[j][i] = tmp;
    }
  }

  if( dir === "CounterClockwise" ) {
    grid.reverse();
  } else {
    grid.forEach( row => row.reverse() );
  }
}

function move(grid, dir) {
  if ( ["ArrowUp", "ArrowDown"].includes(dir) ) {
    rotate(grid, 'Clockwise');
  }

  for(let i = 0; i < grid.length; i++) {
    grid[i] = slide( grid[i], dir );
    grid[i] = merge( grid[i], dir );
  }
  
  if ( ["ArrowUp", "ArrowDown"].includes(dir) ) {
    rotate(grid, 'CounterClockwise');
  }
}

function merge(row, dir) {
  if( ["ArrowLeft", "ArrowDown"].includes(dir) ) {
    for(let i = 0; i < row.length; i++) {
      if( row[i] === 0 ) continue;

      if( row[i] === row[i+1] ) {
        row[i] = row[i] * 2;
        row[i+1] = 0;

        row = slide(row, dir);
      }
    }


  } else if ( ["ArrowRight", "ArrowUp"].includes(dir) ) {
    for(let i = row.length-1; i > 0; i--) {
      if( row[i] === 0 ) continue;

      if( row[i] === row[i-1] ) {
        row[i] = row[i] * 2;
        row[i-1] = 0;

        row = slide(row, dir);
      }
    }
  }

  return row;
}

function doAni(ani, grid) {
  clearAni(grid);
  
  ani.forEach( ele => {
    let tmp = getClass( grid[ele.i][ele.j] ) + " new";
    grid[ele.i][ele.j] = {val: grid[ele.i][ele.j], class:tmp };
  });
  
  return [];
}

function clearAni(grid) {
  for(let i = 0; i < grid.length; i++) {
    for(let j = 0; j < grid[i].length; j++) {
      if( isNaN( grid[i][j]) ) {
        grid[i][j] = grid[i][j].val;
      }
    }
  }

  return grid;
}