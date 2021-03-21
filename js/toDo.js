const formToDo = document.querySelector('.form_do'),
  inputToDo = document.querySelector('.form_do input'),
  pendingUl = document.querySelector('.pending ul'),
  finishedUl = document.querySelector('.finished ul');

const PENDING = 'PENDING';
const FINISHED = 'FINISHED';

let toDos = [];
let doneDos = [];

let pendingTasks, finishedTasks;

function getTask(text) {
  return {
    id: String(Date.now()),
    text,
  };
}

function handleToDoSubmit(e) {
  e.preventDefault();
  const taskObj = getTask(inputToDo.value);
  inputToDo.value = '';
  pendingTask(taskObj);
  savePendingTask(taskObj);
  saveLocal();
}

function savePendingTask(task) {
  pendingTasks.push(task);
}

function findInFinished(taskId) {
  return finishedTasks.find(function (task) {
    return task.id === taskId;
  });
}

function findInPending(taskId) {
  return pendingTasks.find(function (task) {
    return task.id === taskId;
  });
}

function removePending(taskId) {
  pendingTasks = pendingTasks.filter(function (task) {
    return task.id !== taskId;
  });
}

function removeFinished(taskId) {
  finishedTasks = finishedTasks.filter(function (task) {
    return task.id !== taskId;
  });
}

function addToFinished(task) {
  finishedTasks.push(task);
}

function addToPending(task) {
  pendingTasks.push(task);
}

function deleteTask(e) {
  const li = e.target.parentNode;
  li.parentNode.removeChild(li);
  removeFinished(li.id);
  removePending(li.id);
  saveLocal();
}

function handleFinishClick(e) {
  const li = e.target.parentNode;
  li.parentNode.removeChild(li);
  const task = findInPending(li.id);
  removePending(li.id);
  addToFinished(task);
  finishedTask(task);
  saveLocal();
}

function handleBackClick(e) {
  const li = e.target.parentNode;
  li.parentNode.removeChild(li);
  const task = findInFinished(li.id);
  removeFinished(li.id);
  addToPending(task);
  pendingTask(task);
  saveLocal();
}

function generalLi(task) {
  const li = document.createElement('li');
  const span = document.createElement('span');
  const deleteBtn = document.createElement('button');
  span.innerText = task.text;
  deleteBtn.innerText = '❌';
  deleteBtn.addEventListener('click', deleteTask);
  li.append(span, deleteBtn);
  li.id = task.id;
  return li;
}

function pendingTask(task) {
  const genericLi = generalLi(task);
  const completeBtn = document.createElement('button');
  completeBtn.innerText = '✅';
  completeBtn.addEventListener('click', handleFinishClick);
  genericLi.append(completeBtn);
  pendingUl.append(genericLi);
}

function finishedTask(task) {
  const genericLi = generalLi(task);
  const backBtn = document.createElement('button');
  backBtn.innerText = '⏪';
  backBtn.addEventListener('click', handleBackClick);
  genericLi.append(backBtn);
  finishedUl.append(genericLi);
}

function saveLocal() {
  localStorage.setItem(PENDING, JSON.stringify(pendingTasks));
  localStorage.setItem(FINISHED, JSON.stringify(finishedTasks));
}

function loadLocal() {
  pendingTasks = JSON.parse(localStorage.getItem(PENDING)) || [];
  finishedTasks = JSON.parse(localStorage.getItem(FINISHED)) || [];
}

function restoreState() {
  pendingTasks.forEach(function (task) {
    pendingTask(task);
  });
  finishedTasks.forEach(function (task) {
    finishedTask(task);
  });
}

function init() {
  formToDo.addEventListener('submit', handleToDoSubmit);
  loadLocal();
  restoreState();
}
init();
