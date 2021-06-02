const addTaskButton = document.getElementById('criar-tarefa');
const clearListButton = document.getElementById('apaga-tudo');
const clearEndedListButton = document.getElementById('remover-finalizados');
const saveTasksButton = document.getElementById('salvar-tarefas');

function storeList() {
  window.localStorage.clear();
  let itensClass = [];
  let itensValues = [];
  let list = document.querySelectorAll('#lista-tarefas li');
  for (let index = 0; index < list.length; index += 1){
      itensClass.push(list[index].className);
      itensValues.push(list[index].innerText);
    }
    window.localStorage.setItem('ItensValueStore', JSON.stringify(itensValues));
    window.localStorage.setItem('ItensClassStore', JSON.stringify(itensClass));
}
saveTasksButton.addEventListener('click', storeList);

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

function deleteAllListItens() {
  let list = document.querySelectorAll('#lista-tarefas li');
  for (let index = 0; index < list.length; index += 1) {
    list[index].remove();
  }
}
clearListButton.addEventListener('click', deleteAllListItens);

function deleteEndedListItens() {
  let list = document.querySelectorAll('#lista-tarefas .completed');
  for (let index = 0; index < list.length; index += 1) {
    list[index].remove();
  }
}
clearEndedListButton.addEventListener('click', deleteEndedListItens);

function restoreList() {
  let localStorageKeysQuantity = JSON.parse(window.localStorage.ItensValueStore).length;
  for (let index = 0; index < localStorageKeysQuantity; index += 1){
    const lista = document.getElementById('lista-tarefas');
    let listItem = document.createElement('li');
    listItem.innerText = JSON.parse(window.localStorage.ItensValueStore)[index];
    listItem.className = JSON.parse(window.localStorage.ItensClassStore)[index];
    listItem.addEventListener('click', setToSelectedItem);
    listItem.addEventListener('dblclick', ItemDblClick);
    lista.appendChild(listItem);
  }
}

if (localStorage.getItem("ItensValueStore") !== null) {
  restoreList();
}

