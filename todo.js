const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = [];


function deleteToDO(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){return toDo.id !== parseInt(li.id)});
    toDos = cleanToDos;
    console.log(toDos);
    saveToDos();
    

}

function saveToDos(){
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const newID = toDos.length+1
    delBtn.innerText = "❌";
    delBtn.addEventListener("click",deleteToDO);
    const span = document.createElement("span");
    span.innerText = text;
    li.id = newID;
    li.appendChild(delBtn);
    li.appendChild(span);
    toDoList.appendChild(li);
    const toDoObj = {
        text : text,
        id : newID
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue); 
    toDoInput.value = "";

}

function something(toDo){
    console.log(toDo.text);
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !==null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo)
            {paintToDo(toDo.text)
        });
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit);

}

init();