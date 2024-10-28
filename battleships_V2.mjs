import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
const rl = readline.createInterface({ input, output });

const speelveld = Array.from({ length: 10 }, () => Array(10).fill(' '));

function schiet(x, y) {
  if (x >= 0 && x < 10 && y >= 0 && y < 10) {
    speelveld[y][x] = '*';
    console.log(`Schot geland op (${x}, ${y})`);
  } else {
    console.log('Coordinaten buiten het speelveld, probeer opnieuw.');
  }
}

function plaatsBoot(x, y, lengte, richting) {
  if (lengte < 2 || lengte > 5) {
    console.log('Ongeldige bootlengte. Kies een lengte tussen 2 en 5.');
    return;
  }

  const deltas = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
  const [dx, dy] = deltas[richting] || [];
  if (!dx && !dy) {
    console.log('Ongeldige richting. Kies uit: up, down, left, right.');
    return;
  }

  for (let i = 0; i < lengte; i++) {
    const nieuweX = x + i * dx;
    const nieuweY = y + i * dy;
    if (nieuweX < 0 || nieuweX >= 10 || nieuweY < 0 || nieuweY >= 10 || speelveld[nieuweY][nieuweX] !== ' ') {
      console.log('Onvoldoende ruimte om de boot te plaatsen, probeer andere coordinaten of richting.');
      return;
    }
  }

  for (let i = 0; i < lengte; i++) {
    const nieuweX = x + i * dx;
    const nieuweY = y + i * dy;
    speelveld[nieuweY][nieuweX] = 'B';
  }
  console.log(`Boot geplaatst vanaf (${x}, ${y}) richting ${richting} met lengte ${lengte}`);
}

schiet(3, 5);

plaatsBoot(2, 2, 4, 'right');
plaatsBoot(0, 9, 3, 'up');

console.log(speelveld.map(rij => rij.join(' ')).join('\n'));


process.exit()
