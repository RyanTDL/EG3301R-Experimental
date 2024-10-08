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
        activateDiffuser(res);
      });

      board.on('error', (error) => {
        console.error('Board error:', error);
        isBoardInitializing = false;
        res.status(500).json({ message: 'Board error occurred', error: error.message });
      });

    } else if (board && board.isReady && led) {
      activateDiffuser(res);
    }
  } else {
    res.status(405).json({ message: 'Error encountered' });
  }
}

function activateDiffuser(res) {
  switch (ledNumber) {
    case 1:
      console.log('Board is ready 1');
      led = new Led(9);
      break;
    case 2:
      console.log('Board is ready 2');
      led = new Led(9);
      break;
    case 3:
      console.log('Board is ready 3');
      led = new Led(9);
      break;
    default:
      console.log('Board is ready 4');
      led = new Led(9);
      break;
  }

  const delayTime = 1000; // 1 second

  // Wait for the delay time, then turn the LED off
  setTimeout(() => {
    led.on();
    console.log('Diffuser activated');

    // Wait for another delay time, then turn it back on
    setTimeout(() => {
      led.off();

      // Wait for the delay time, then turn it off
      setTimeout(() => {
        led.on();

        setTimeout(() => {
          led.off();

          setTimeout(() => {
            led.on();
          }, delayTime);

        }, delayTime);

      }, delayTime);
    }, delayTime);

  }, delayTime);

  res.status(200).json({ message: 'Diffuser Activated' });
}