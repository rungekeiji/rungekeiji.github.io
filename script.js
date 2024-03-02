const incomplete_list = document.querySelector(".incomplete-list");
const complete_list = document.querySelector(".complete-list");
const todo_submit = document.querySelector(".todo-submit");
const todo_input = document.querySelector("#todo-input");

todo_submit.addEventListener("click", () => {
  if (todo_input.value === "") return;

  const todo_item = document.createElement("div");
  todo_item.setAttribute("class", "todo-item");

  const main_task = document.createElement("div");
  main_task.setAttribute("class", "main-task");

  const todo_priority_marker = document.createElement("input");
  todo_priority_marker.type = "color";
  todo_priority_marker.setAttribute("class", "todo-priority-marker");
  const priority_circle = document.createElement("button");
  priority_circle.setAttribute("class", "priority-circle");

  const todo_due_date = document.createElement("input");
  todo_due_date.type = "date";
  todo_due_date.setAttribute("class", "todo-due-date");

  const todo_description = document.createElement("p");
  todo_description.setAttribute("class", "todo-description");
  todo_description.textContent = todo_input.value;

  const delete_button = document.createElement("button");
  delete_button.setAttribute("class", "delete-button");
  delete_button.innerHTML = "&#x1F5D1;";
  const check_button = document.createElement("button");
  check_button.setAttribute("class", "check-button");
  check_button.innerHTML = "&check;";
  const add_button = document.createElement("button");
  add_button.setAttribute("class", "add-button");
  add_button.innerHTML = "+";

  main_task.appendChild(todo_priority_marker);
  main_task.appendChild(priority_circle);
  main_task.appendChild(todo_due_date);
  main_task.appendChild(todo_description);
  main_task.appendChild(delete_button);
  main_task.appendChild(check_button);
  main_task.appendChild(add_button);

  todo_item.appendChild(main_task);
  todo_input.value = "";

  const side_task = document.createElement("div");
  side_task.setAttribute("class", "side-task");
  const ordered_list = document.createElement("ol");
  side_task.appendChild(ordered_list);

  todo_item.appendChild(side_task);
  incomplete_list.prepend(todo_item);
});

const middle_section = document.querySelector(".middle-section");
middle_section.addEventListener("click", (e) => {
  const item = e.target;
  if (item.classList[0] === "delete-button"){
    item.parentElement.parentElement.classList.add("fadeout-animation");
    item.parentElement.parentElement.addEventListener("animationend", () => {
      item.parentElement.parentElement.remove();
    });
  }

  if (item.classList[0] === "check-button" && item.parentElement.parentElement.parentElement.classList[0] === "incomplete-list"){
    item.parentElement.parentElement.classList.add("slideout-animation");
    setTimeout(() => {
      complete_list.appendChild(item.parentElement.parentElement);
      item.parentElement.parentElement.classList.remove("slideout-animation");
    }, 500);
  } else if (item.classList[0] === "check-button" && item.parentElement.parentElement.parentElement.classList[0] === "complete-list"){
    incomplete_list.appendChild(item.parentElement.parentElement);
  }

  if (item.classList[0] === "add-button" && todo_input.value !== ""){
    const side_task_item = document.createElement("li");
    side_task_item.setAttribute("class", "side-task-item");
    side_task_item.textContent = todo_input.value;
    item.parentElement.parentElement.lastElementChild.lastElementChild.appendChild(side_task_item);
    todo_input.value = "";
  }
});

middle_section.addEventListener("input", (e) => {
  const item = e.target;
  if (item.classList[0] === "todo-priority-marker"){
    if (item.value >= "#750000") item.parentElement.style.color = "black";
    else item.parentElement.style.color = "white";
    item.parentElement.style.backgroundColor = item.value;
  }
});
