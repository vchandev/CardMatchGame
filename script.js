var correctCards = 0;


var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
setInterval(setTime, 1000);

//Reset timer to 0 seconds
function resetTime() {
  totalSeconds = 0;
}

//Increment timer
function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds%60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
}

//Padding single digit seconds with 0
function pad(val) {
  var valString = val + "";
  if(valString.length < 2)
  {
    return "0" + valString;
  }
  else
  {
    return valString;
  }
}
$(init);

//When player presses Reset Game or Play Again, init resets all of the cards and randomizes them. This also resets the timer.
function init() {

  //Hide the success message
  $('#successMessage').hide();
  $('#successMessage').css( {
    left: '580px',
    top: '250px',
    width: 0,
    height: 0
  } );

  //Reset the game
  resetTime();
  correctCards = 0;
  $('#cardPile').html( '' );
  $('#cardSlots').html( '' );

  //Create the pile of shuffled cards
  var numbers = [ 1, 2, 3, 4, 5 ];
  var images = ['<img src="https://i.ibb.co/6gvJm4c/Z.jpg" height=100% width=80%>',
               '<img src="https://i.ibb.co/Wp8Zm4N/O2.jpg" height=100% width=70%>',
               '<img src="https://i.ibb.co/Wp8Zm4N/O2.jpg" height=100% width=70%>', 
               '<img src="https://i.ibb.co/s35dxbx/V.jpg" height=100% width=80%>', 
               '<img src="https://i.ibb.co/yVCrxz9/U.jpg" height=100% width=60%>'];
  var cardCover =['<img src="https://i.ibb.co/556BxJw/questionmark.png" height=100% width=100%>'];
  numbers.sort( function() { return Math.random() - 0.5 } );

  for ( var i=0; i<5; i++ ) {
    $('<div id>' + cardCover[0] + numbers[i]+ '</div>' ).data( 'number', numbers[i] ).attr( 'id', 'card'+numbers[i] ).appendTo( '#cardPile' ).draggable( {
      
      stack: '#cardPile div',
      cursor: 'move',
      revert: true
    } );
  }

  //Create the card slots
  for ( var i=1; i<=5; i++ ) {
    $('<div>' + images[i-1] + [i] + '</div>').data( 'number', i ).appendTo( '#cardSlots' ).droppable( {
      accept: '#cardPile div',
      hoverClass: 'hovered',
      drop: handleCardDrop
    } );
  }

}

 // This function handles the card drop. If the cardPile number matches the cardSlot number, then the cardSlot image is revealed. This also disables the card from being draggable and the slot from being droppable until the game is reset.

function handleCardDrop( event, ui ) {
  var slotNumber = $(this).data( 'number' );
  var cardNumber = ui.draggable.data( 'number' );

  if ( slotNumber == cardNumber ) {
    ui.draggable.addClass( 'correct' );
    ui.draggable.draggable( 'disable' );
    $(this).droppable( 'disable' );
    ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
    ui.draggable.draggable( 'option', 'revert', false );
    ui.draggable.hide();
    correctCards++; 
  } 
  
  //If all the cards matched, then display the success message and gives the player a chance to play again.

  if ( correctCards == 5 ) {
    $('#successMessage').show();
    $('#successMessage').animate( {
      left: '380px',
      top: '200px',
      width: '400px',
      height: '100px',
      opacity: 1
    } );
  }

}


