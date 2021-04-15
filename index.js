'use strict';

let hrac = 'circle';

const hraciPole = document.querySelectorAll('button');
/*console.log(hraciPole);*/

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
};

for (let index = 0; index < hraciPole.length; index++) {
  hraciPole[index].addEventListener('click', hra);
}
