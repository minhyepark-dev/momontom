const formEl = document.querySelector('.form'),
  inputEl = document.querySelector('.form input'),
  addName = document.querySelector('.add_name');

function saveName(text) {
  localStorage.setItem('userName', text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = inputEl.value;
  addHello(currentValue);
  saveName(currentValue);
}

function askName() {
  formEl.classList.add('on');
  formEl.addEventListener('submit', handleSubmit);
}

function addHello(text) {
  formEl.classList.remove('on');
  addName.classList.add('on');
  addName.innerText = `Hello, ${text} ❤`;
}

function loadName() {
  const currentUser = localStorage.getItem('userName');
  if (currentUser === null) {
    askName();
  } else {
    addHello(currentUser);
  }
}

function init() {
  loadName();
}

init();
