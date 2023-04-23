import { save, load } from './storage.js';

const STORAGE_KEY = 'tasks';

let currentId = 0;

const myInput = document.getElementById('myInput');
const myUL = document.getElementById('myUL');

function addCloseButton(target) {
  const span = document.createElement('span');
  const txt = document.createTextNode('\u00D7');
  span.className = 'close';
  span.appendChild(txt);
  target.appendChild(span);
}

function addNewTask() {
  const task = myInput.value.trim();
  myInput.value = '';
  if (task === '') {
    alert('Введіть текст');
    return;
  }
  createLi(task);
  addTaskToStorage(task);
}

function createLi(text, isDone = false, id = currentId) {
  const liEl = document.createElement('li');
  liEl.textContent = text;
  liEl.dataset.id = id;
  if (isDone) liEl.classList.add('checked');
  myUL.appendChild(liEl);
  addCloseButton(liEl);
}

function handleTaskBehaviour({ target }) {
  const currentState = load(STORAGE_KEY);
  if (target.nodeName === 'LI') {
    target.classList.toggle('checked');
    const taskIndex = currentState.findIndex(
      task => Number(task.id) === Number(target.dataset.id),
    );
    currentState[taskIndex].isDone = !currentState[taskIndex].isDone;
  } else if (target.classList.contains('close')) {
    target.parentNode.remove();
    const taskIndex = currentState.findIndex(
      task => Number(task.id) === Number(target.parentNode.dataset.id),
    );
    currentState.splice(taskIndex, 1);
  }
  save(STORAGE_KEY, currentState);
}

function createTaskObj(text, isDone) {
  return {
    text,
    isDone,
    id: currentId,
  };
}

function addTaskToStorage(text, isDone = false) {
  const currentState = load(STORAGE_KEY);
  if (currentState === undefined) {
    const arr = [createTaskObj(text, isDone)];
    console.log(arr);
    save(STORAGE_KEY, arr);
  } else {
    currentState.push(createTaskObj(text, isDone));
    save(STORAGE_KEY, currentState);
  }
  currentId += 1;
}

function fillTasksList() {
  const currentState = load(STORAGE_KEY);
  if (currentState !== undefined) {
    currentState.forEach(({ text, isDone, id }) => createLi(text, isDone, id));
    currentId = id + 1;
  }
}

export { addNewTask, handleTaskBehaviour, fillTasksList };
