import { Board, Led } from 'johnny-five';

let board;
let led;

export default function handler(req, res) {
  if (req.method === 'POST') {
    if (!board) {
      board = new Board();
      board.on('ready', () => {
        led = new Led(13);
        led.blink(500);
        res.status(200).json({ message: 'LED blinking started' });
      });
    } else if (led) {
      led.blink(500);
      res.status(200).json({ message: 'LED blinking toggled' });
    } else {
      res.status(500).json({ message: 'Board is not ready yet' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}