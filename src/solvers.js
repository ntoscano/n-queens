
/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
  for(var i = 0; i < n; i++){
    for(var j = 0; j < n; j++) {
      board.togglePiece(i, j);
      if(board.hasAnyRowConflicts() || board.hasAnyColConflicts()){
        board.togglePiece(i,j);
      }
    }
  }
  var solution = board.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  //make board
  var board = new Board({n: n});
  //declare solution counter
  var solutionCount = 0; 

  //checkNode: itereate through first row
  var checkNode = function(x, y) {
    //place piece
    if(y < n && x < n){
      board.togglePiece(y, x); 
      //check conflict
      if (board.hasAnyRooksConflicts()) {
        //true: untoggle
        board.togglePiece(y, x);
        return;
      } else if (y === n - 1) {
        //true: increment solution counter
        solutionCount++;
        //untoggle piece
        board.togglePiece(y, x);
      } else {  //false: 
        // itereate through next row
        for (var i = 0; i < n; i++){ 
          //CheckNode
          checkNode(i, y + 1);
        }
        board.togglePiece(y, x)
      }
    }
  };
  
  for (var i = 0; i < n; i++ ){
    checkNode(i, 0);          
  }

  return solutionCount;          
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  var solution = board.rows();

  if(n === 0 ){
    console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
    return solution;
  }

  function placeNextPiece( x, y) {
    //place piece
    board.togglePiece(y, x);
    //check if it creates conflicts
    if(board.hasAnyQueensConflicts()) {
      //true remove the piece
      board.togglePiece(y, x);
      return;
    } else {
      //check if it is the last piece
      var newY = y + 1;
      if ( newY === n ) {
        // true - solution = board.rows
        var solution = board.rows();
        console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
        return solution;
      } else {
        // column in next row
        for (var i = 0; i < n; i++) {
          var sol = placeNextPiece(i, newY);
          if(sol !== undefined){
            return sol;
          }
        }
      }
    }
    board.togglePiece(y,x);
  }

  for(var i = 0; i < n; i++){
    var solu = placeNextPiece(i, 0);
    if(solu !== undefined){
      return solu;
    }
  }

  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  //make board
  var board = new Board({n: n});
  //declare solution counter
  var solutionCount = 0; 

  var checkNextRow = function( x , y ) {

    if (x < n && y < n) {     
      //place a piece
      board.togglePiece(y, x);
      //if the piece creates conflicts
      if (board.hasAnyQueensConflicts()){
      //remove the piece
        board.togglePiece(y, x);
        return;  
      } else { 
        // if it's the last piece
        if (y === n - 1) {  
          // counter++
          solutionCount++;
          // remove piece
          board.togglePiece(y, x);
          return;
        } else {
          for (var i = 0; i < n; i++) {  
            checkNextRow(i, y + 1 );
          }  
         //remove piece
         board.togglePiece(y, x);
        }
      }
    }
  };
  console.log(n);
  for (var i = 0; i < n; i++ ){
    console.log('hi');
    checkNextRow(i, 0);          
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
