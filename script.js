const addTaskButton = document.getElementById('criar-tarefa');

function setToSelectedItem(clickedItem) {
  let item = clickedItem.target;
  let listSize = document.getElementById('lista-tarefas').childElementCount;
  for (let index = 0; index < listSize; index += 1) {
    let listItem = document.getElementById('lista-tarefas').children;
    listItem[index].className = 'list-item';
  }
  item.className = 'selected-list-item';
}

function addClickPropertieToItens() {
  let listSize = document.getElementById('lista-tarefas').childElementCount;
  for (let index = 0; index < listSize; index += 1) {
    let listItem = document.getElementsByClassName('list-item');
    listItem[index].addEventListener('click', setToSelectedItem);
  }
}

function addTask() {
  const listTaskInput = document.getElementById('texto-tarefa').value;
  const lista = document.getElementById('lista-tarefas');
  let listItem = document.createElement('li');
  listItem.className = 'list-item';
  listItem.innerText = listTaskInput;
  lista.appendChild(listItem);
  document.getElementById('texto-tarefa').value = '';
  addClickPropertieToItens();
}
addTaskButton.addEventListener('click', addTask);
