const todoInput = document.getElementsByClassName("todo-input")[0];
const todoBtn = document.getElementsByClassName("todo-button")[0];
const todoList = document.querySelector(".todo-list");
const filter = document.querySelector(".filter-todo");


let btnDelete = "";
let userToDo = [];
let completeStatus = [];

if (JSON.parse(localStorage.getItem("jobs")) != null) {
    userToDo = JSON.parse(localStorage.getItem("jobs"));
    completeStatus = JSON.parse(localStorage.getItem("statusCompelet"));
    btnDelete = document.querySelectorAll(".trash-btn");
    userToDo.forEach((item, key) => {
        todoList.appendChild(creatEle(item, key));
    });
}

todoBtn.addEventListener("click", addToDoList);
todoList.addEventListener("click", deleteElement);
todoList.addEventListener("click", completeTodo);
filter.addEventListener("click", todoListFilter);



function addToDoList(event) {
    event.preventDefault();

    if (userToDo != [] && todoInput.value !== "") {
        userToDo.push(todoInput.value);
        completeStatus.push(false);
        todoInput.value = "";
        todoList.innerHTML = "";
        userToDo.forEach((item, key) => {
            todoList.appendChild(creatEle(item, key));
        });
    }

    updateToDoList();
}
function creatEle(item, key) {
    const div = document.createElement("div");
    const li = document.createElement("li");
    const buttonCompelet = document.createElement("button");
    const buttonDel = document.createElement("button");

    if (completeStatus[key]) {
        div.classList.add("completed");
    }

    div.classList.add("todo");
    li.classList.add("todo-item");
    buttonCompelet.classList.add("complete-btn")
    buttonDel.classList.add(`trash-btn`)

    li.innerText = item;
    div.appendChild(li);
    div.appendChild(buttonCompelet);
    div.appendChild(buttonDel);
    return div;
}
function deleteElement(event) {
    const del = event.target;

    if (del.classList.value == "trash-btn") {
        const parentElements = del.parentElement;
        todoList.removeChild(parentElements);

        for (let i = 0; i < userToDo.length; i++) {
            if (userToDo[i] == parentElements.firstChild.innerText) {
                userToDo.splice(i, 1);
                completeStatus.splice(i, 1);

                updateToDoList();

                event.preventDefault();
                return;
            }
        }

    } else {
        event.preventDefault();
        return;
    }
}

function completeTodo(event) {
    const complete = event.target;
    const completeBtn = complete.parentElement;

    if (complete.classList.value == "complete-btn") {
        event.preventDefault();
        for (let i = 0; i < userToDo.length; i++) {
            if (userToDo[i] == completeBtn.firstChild.innerText) {

                completeBtn.classList.toggle("completed");
                console.log(completeBtn.classList.value)
                if (completeBtn.classList.contains("completed")) {
                    completeStatus[i] = true;
                } else {
                    completeStatus[i] = false;
                }
                updateToDoList();

                event.preventDefault();
                return completeStatus[i];
            }
        }

    }
}


function todoListFilter(event) {
    const userFilter = filter.value;
    if (JSON.parse(localStorage.getItem("jobs")) != null) {
        userToDo.forEach((item, key) => {
            const todoFilter = todoList.children[key];
            switch (userFilter) {
                case "all":
                    todoFilter.style.display = "flex"
                    break;
                case "completed":
                    if (todoFilter.classList.contains("completed")) {
                        todoFilter.style.display = "flex"
                    } else {
                        todoFilter.style.display = "none"
                    }
                    break;
                case "uncompleted":
                    if (!todoFilter.classList.contains("completed")) {
                        todoFilter.style.display = "flex"
                    }else{
                        todoFilter.style.display = "none"
                    }
                    break;
                default:
                    break;
            }
        });

    }
}

function updateToDoList() {
    localStorage.setItem("jobs", JSON.stringify(userToDo));
    localStorage.setItem("statusCompelet", JSON.stringify(completeStatus));
}
