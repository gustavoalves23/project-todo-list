const addTaskButton = document.getElementById('criar-tarefa');

function addTask() {
  const listTaskInput = document.getElementById('texto-tarefa').value;
  const lista = document.getElementById('lista-tarefas');
  const listItem = document.createElement('li');
  listItem.innerText = listTaskInput;
  lista.appendChild(listItem);
  document.getElementById('texto-tarefa').value = '';
}
addTaskButton.addEventListener('click', addTask);
