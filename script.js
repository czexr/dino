// script.js
const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');

let isJumping = false;

document.addEventListener('keydown', function (event) {
  if (event.code === 'Space' && !isJumping) {
    jump();
  }
});

function jump() {
  isJumping = true;
  let upInterval = setInterval(() => {
    let dinoBottom = parseInt(window.getComputedStyle(dino).bottom);
    if (dinoBottom >= 150) {
      clearInterval(upInterval);
      let downInterval = setInterval(() => {
        if (dinoBottom <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          dino.style.bottom = dinoBottom - 5 + 'px';
        }
        dinoBottom = parseInt(window.getComputedStyle(dino).bottom);
      }, 20);
    } else {
      dino.style.bottom = dinoBottom + 5 + 'px';
    }
  }, 20);
}

function moveCactus() {
  let cactusPosition = cactus.offsetLeft;
  cactus.style.left = cactusPosition - 2 + 'px';

  if (cactus.offsetLeft < -20) {
    cactus.style.left = '600px';
  }

  const dinoRect = dino.getBoundingClientRect();
  const cactusRect = cactus.getBoundingClientRect();

  if (
    dinoRect.right > cactusRect.left &&
    dinoRect.left < cactusRect.right &&
    dinoRect.bottom > cactusRect.top
  ) {
    alert('Game Over!');
    cactus.style.left = '600px';
  }

  requestAnimationFrame(moveCactus);
}

moveCactus();
