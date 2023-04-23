
document.addEventListener("DOMContentLoaded", function () {
  var addButton = document.querySelector(".add-task__button");
  var taskInput = document.querySelector(".add-task__input");
  var incompleteTaskHolder = document.getElementById("incomplete-tasks");
  var completedTasksHolder = document.getElementById("completed-tasks");

  var createNewTaskElement = function (taskString) {
    var listItem = document.createElement("li");
    listItem.className = "todo__item";

    var checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.className = "todo__checkbox";

    var label = document.createElement("label");
    label.className = "todo__label";
    label.innerText = taskString;

    var editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "todo__input";

    var editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.className = "todo__edit";

    var deleteButton = document.createElement("button");
    deleteButton.className = "todo__delete";

    var deleteButtonImg = document.createElement("img");
    deleteButtonImg.src = "./remove.svg";
    deleteButtonImg.alt = "Delete";
    deleteButtonImg.className = "todo__delete-icon";
    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
  };

  var addTask = function () {
    if (!taskInput.value) return;
    var listItem = createNewTaskElement(taskInput.value);
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
  };

  var editTask = function () {
    var listItem = this.parentNode;
    var editInput = listItem.querySelector(".todo__input");
    var label = listItem.querySelector(".todo__label");
    var editBtn = listItem.querySelector(".todo__edit");
    var containsClass = listItem.classList.contains("todo__item_edit");

    if (containsClass) {
      label.innerText = editInput.value;
      editBtn.innerText = "Edit";
    } else {
      editInput.value = label.innerText;
      editBtn.innerText = "Save";
    }

    listItem.classList.toggle("todo__item_edit");
  };

  var deleteTask = function () {
    var listItem = this.parentNode;
    var ul = listItem.parentNode;
    ul.removeChild(listItem);
  };

  var taskCompleted = function () {
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
  };

  var taskIncomplete = function () {
    var listItem = this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
  };

  var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
    var checkBox = taskListItem.querySelector(".todo__checkbox");
    var editButton = taskListItem.querySelector(".todo__edit");
    var deleteButton = taskListItem.querySelector(".todo__delete");

    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
  };

  addButton.addEventListener("click", addTask);

  for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
    bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
  }

  for (var i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
  }
});