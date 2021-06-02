const addTaskButton = document.getElementById('criar-tarefa');

function setToSelectedItem(clickedItem) {
  if (document.getElementsByClassName('selected-list-item').length > 0) {
    let lastSelectedItem = document.getElementsByClassName('selected-list-item')[0];
    lastSelectedItem.classList.remove('selected-list-item');
  }
  clickedItem.target.classList.add('selected-list-item');
}

function ItemDblClick(clickedItem) {
  let item = clickedItem.target;
  if (item.classList.contains('completed')) {
    item.classList.remove('completed');
  } else {
    item.classList.add('completed');
  }
}

function addTask() {
  const listTaskInput = document.getElementById('texto-tarefa').value;
  const lista = document.getElementById('lista-tarefas');
  let listItem = document.createElement('li');
  listItem.innerText = listTaskInput;
  listItem.addEventListener('click', setToSelectedItem);
  listItem.addEventListener('dblclick', ItemDblClick);
  lista.appendChild(listItem);
  document.getElementById('texto-tarefa').value = '';
}
addTaskButton.addEventListener('click', addTask);
