const addTaskButton = document.getElementById('criar-tarefa');
const clearListButton = document.getElementById('apaga-tudo');
const clearEndedListButton = document.getElementById('remover-finalizados');
const saveTasksButton = document.getElementById('salvar-tarefas');
const moveUpButton = document.getElementById('mover-cima');
const moveDownButton = document.getElementById('mover-baixo');
const removeSelectedButton = document.getElementById('remover-selecionado');
const listaConst = document.getElementById('lista-tarefas');
const selectedItemList = 'selected-list-item';
const selectedItemListConst = document.getElementsByClassName(selectedItemList);

function storeList() {
  window.localStorage.clear();
  const itensClass = [];
  const itensValues = [];
  const list = document.querySelectorAll('#lista-tarefas li');
  for (let index = 0; index < list.length; index += 1) {
    itensClass.push(list[index].className);
    itensValues.push(list[index].innerText);
  }
  window.localStorage.setItem('ItensValueStore', JSON.stringify(itensValues));
  window.localStorage.setItem('ItensClassStore', JSON.stringify(itensClass));
}
saveTasksButton.addEventListener('click', storeList);

function setToSelectedItem(clickedItem) {
  const lista = selectedItemListConst;
  if (lista.length > 0) {
    const lastSelectedItem = selectedItemListConst[0];
    lastSelectedItem.classList.remove(selectedItemList);
  }
  clickedItem.target.classList.add(selectedItemList);
}

function ItemDblClick(clickedItem) {
  const item = clickedItem.target;
  if (item.classList.contains('completed')) {
    item.classList.remove('completed');
  } else {
    item.classList.add('completed');
  }
}

function addTask() {
  const listTaskInput = document.getElementById('texto-tarefa').value;
  const lista = listaConst;
  const listItem = document.createElement('li');
  listItem.innerText = listTaskInput;
  listItem.addEventListener('click', setToSelectedItem);
  listItem.addEventListener('dblclick', ItemDblClick);
  lista.appendChild(listItem);
  document.getElementById('texto-tarefa').value = '';
}
addTaskButton.addEventListener('click', addTask);

function deleteAllListItens() {
  const list = document.querySelectorAll('#lista-tarefas li');
  for (let index = 0; index < list.length; index += 1) {
    list[index].remove();
  }
}
clearListButton.addEventListener('click', deleteAllListItens);

function deleteEndedListItens() {
  const list = document.querySelectorAll('#lista-tarefas .completed');
  for (let index = 0; index < list.length; index += 1) {
    list[index].remove();
  }
}
clearEndedListButton.addEventListener('click', deleteEndedListItens);

function restoreList() {
  const localStorageKeysQuantity = JSON.parse(window.localStorage.ItensValueStore).length;
  for (let index = 0; index < localStorageKeysQuantity; index += 1) {
    const lista = listaConst;
    const listItem = document.createElement('li');
    listItem.innerText = JSON.parse(window.localStorage.ItensValueStore)[index];
    listItem.className = JSON.parse(window.localStorage.ItensClassStore)[index];
    listItem.addEventListener('click', setToSelectedItem);
    listItem.addEventListener('dblclick', ItemDblClick);
    lista.appendChild(listItem);
  }
}

if (localStorage.getItem('ItensValueStore') !== null) {
  restoreList();
}

function moveUp(selectedItemIndex, lista) {
  const itemBeforeSelectedItemIndex = selectedItemIndex - 1;
  const item = lista[selectedItemIndex];
  const itemBefore = lista[itemBeforeSelectedItemIndex];
  const itemBeforeClass = itemBefore.className;
  const itemBeforeText = itemBefore.innerText;
  itemBefore.className = item.className;
  itemBefore.innerText = item.innerText;
  item.className = itemBeforeClass;
  item.innerText = itemBeforeText;
}

function chooseActionMoveUp(selectedItemIndex, lista) {
  if (selectedItemIndex === undefined) {
    return;
  }
  if (selectedItemIndex === 0) {
    alert('Já é o primeiro item');
  } else {
    moveUp(selectedItemIndex, lista);
  }
}
function moveUpCondition() {
  let selectedItemIndex;
  const lista = listaConst.children;
  for (let index = 0; index < lista.length; index += 1) {
    if (lista[index].classList.contains(selectedItemList)) {
      selectedItemIndex = index;
    }
  }
  chooseActionMoveUp(selectedItemIndex, lista);
}

function moveDown(selectedItemIndex, lista) {
  const itemAfterSelectedItemIndex = selectedItemIndex + 1;
  const item = lista[selectedItemIndex];
  const itemAfter = lista[itemAfterSelectedItemIndex];
  const itemAfterClass = itemAfter.className;
  const itemAfterText = itemAfter.innerText;
  itemAfter.className = item.className;
  itemAfter.innerText = item.innerText;
  item.className = itemAfterClass;
  item.innerText = itemAfterText;
}

function chooseActionMoveDown(selectedItemIndex, lista) {
  if (selectedItemIndex === undefined) {
    return;
  }
  if (selectedItemIndex === lista.length - 1) {
    alert('Já é o último item');
  } else {
    moveDown(selectedItemIndex, lista);
  }
}
function moveDownCondition() {
  let selectedItemIndex;
  const lista = listaConst.children;
  for (let index = 0; index < lista.length; index += 1) {
    if (lista[index].classList.contains(selectedItemList)) {
      selectedItemIndex = index;
    }
  }
  chooseActionMoveDown(selectedItemIndex, lista);
}

moveUpButton.addEventListener('click', moveUpCondition);
moveDownButton.addEventListener('click', moveDownCondition);

function removeSelected() {
  const itemToRemove = selectedItemListConst[0];
  itemToRemove.remove();
}

removeSelectedButton.addEventListener('click', removeSelected);
