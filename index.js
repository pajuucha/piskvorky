'use strict';

let hrac = 'circle';

const fields = document.querySelectorAll('button');
/*console.log(hraciPole);*/

// přidání funkce isWinningMove- 5. úkol
const hra = (event) => {
  if (hrac === 'circle') {
    event.target.classList.add('board__field--circle');
    event.target.disabled = 'true';
    const hraje = document.querySelector('.radek__vlevo--kolecko');
    hraje.src = 'obrazky/cross.svg';
    hrac = 'cross';
  } else if (hrac === 'cross') {
    event.target.classList.add('board__field--cross');
    event.target.disabled = 'true';
    const hraje = document.querySelector('.radek__vlevo--kolecko');
    hraje.src = 'obrazky/circle.svg';
    hrac = 'circle';
  }

  const winning = isWinningMove(event.target);
  if (winning === true && getSymbol(event.target) === 'circle') {
    let msg = `Vyhrálo kolečko. Chceš hrát znovu?`;
    setTimeout(() => {
      alert(msg);
      location.reload();
    }, 300);
  } else if (winning === true && getSymbol(event.target) === 'cross') {
    let msg = `Vyhrál křížek. Chceš hrát znovu?`;
    setTimeout(() => {
      alert(msg);
      location.reload();
    }, 300);
  }
};

for (let index = 0; index < fields.length; index++) {
  fields[index].addEventListener('click', hra);
}

// 5. úkol
const boardSize = 10; // 10x10

const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < fields.length) {
    if (field === fields[fieldIndex]) {
      break;
    }
    fieldIndex++;
  }

  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};

const getField = (row, column) => fields[row * boardSize + column];

const getSymbol = (field) => {
  if (field.classList.contains('board__field--cross')) {
    return 'cross';
  } else if (field.classList.contains('board__field--circle')) {
    return 'circle';
  }
};

const symbolsToWin = 5;
const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;

  let inRow = 1; // Jednička pro právě vybrané políčko
  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  let inColumn = 1;
  // Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni dolu
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }

  return false;
};
