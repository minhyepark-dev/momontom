const body = document.querySelector('body'),
  clock = document.querySelector('.clock h3');

const IMG_NUMBER = 3;

function imgRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  body.style.backgroundImage = `url(img/${number + 1}.jpg)`;
}

function dandelion() {
  const dandelion = document.querySelector('#dandelion');
  for (let n = 1; n <= 100; n++) {
    const index = Math.floor(Math.random() * 4) + 1;
    let size = 10 + Math.floor(Math.random() * 50);
    let left = Math.floor(Math.random() * window.innerWidth);
    let top = Math.floor(Math.random() * 800);
    const img = document.createElement('img');
    img.setAttribute('src', `img/dandelion_show${index}.png`);
    img.style.width = size;
    const spread = document.createElement('div');
    spread.append(img);
    spread.style.left = left;
    spread.style.top = top;
    dandelion.append(spread);
  }
}

function getTime() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();
  const hoursStr = `${hours < 10 ? `0${hours}` : hours}`;
  const minutesStr = `${minutes < 10 ? `0${minutes}` : minutes}`;
  const secondsStr = `${seconds < 10 ? `0${seconds}` : seconds}`;
  clock.innerHTML = `${hoursStr}:${minutesStr}:${secondsStr}`;
}

function init() {
  imgRandom();
  dandelion();
  getTime();
  setInterval(getTime, 1000);
}

init();
