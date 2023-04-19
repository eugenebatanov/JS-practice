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
}

function createLi(text) {
  const liEl = document.createElement('li');
  liEl.textContent = text;
  myUL.appendChild(liEl);
  addCloseButton(liEl);
}

function handleTaskBehaviour({ target }) {
  if (target.nodeName === 'LI') {
    target.classList.toggle('checked');
  } else if (target.classList.contains('close')) {
    target.parentNode.remove();
  }
}

export { addNewTask, handleTaskBehaviour };
