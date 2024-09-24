import { Board, Led } from 'johnny-five';

let board;
let ledNumber;
let led;
let isBoardInitializing = false;

export default function handler(req, res) {
  if (req.method === 'POST') {
    ledNumber = req.body.led;
    console.log('LED number:', ledNumber);

    if (!board && !isBoardInitializing) {
      isBoardInitializing = true;
      board = new Board();
      
      board.on('ready', () => {
        isBoardInitializing = false;
        turnOnLEDWithTimer(res);
      });

      board.on('error', (error) => {
        console.error('Board error:', error);
        isBoardInitializing = false;
        res.status(500).json({ message: 'Board error occurred', error: error.message });
      });

    } else if (board && board.isReady && led) {
      turnOnLEDWithTimer(res);
    }
  } else {
    res.status(405).json({ message: 'Error encountered' });
  }
}

function turnOnLEDWithTimer(res) {
  switch (ledNumber) {
    case 1:
      console.log('Board is ready 1');
      led = new Led(13);
      console.log('Board is ready 11');
      break;
    case 2:
      console.log('Board is ready 2');
      led = new Led(12);
      console.log('Board is ready 22');
      break;
    case 3:
      console.log('Board is ready 3');
      led = new Led(11);
      console.log('Board is ready 33');
      break;
    default:
      console.log('Board is ready 4');
      led = new Led(13);
      console.log('Board is ready 44');
      break;
  }

  led.on();
  console.log('LED turned on');
  
  setTimeout(() => {
    led.off();
    console.log('LED turned off after 2 seconds');
  }, 2000);

  res.status(200).json({ message: 'LED turned on for 2 seconds' });
}