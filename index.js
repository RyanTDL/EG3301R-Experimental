const { Board, Led } = require('johnny-five');  
// Initialize Johnny-Five board 
const board = new Board();  

// When the board is ready 
board.on('ready', () => {

// Create an LED instance   
const led = new Led(13);    

// Blink the LED every 500ms   
led.blink(500);
});