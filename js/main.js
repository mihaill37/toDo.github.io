const form = document.querySelector("#form");
const taskInpyt = document.querySelector("#taskInput");
const taskList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");
let mass = [];
checkEmptList()

form.addEventListener("submit",addTask)
taskList.addEventListener("click",delTask)
taskList.addEventListener("click",doneTask)



if(localStorage.getItem("mass")){
mass = JSON.parse(localStorage.getItem("mass"))
}
mass.forEach(function(t){
    const cssClass = t.done ? "task-title task-title--done" :"task-title ";

    const taskHtml = `
    <li id="${t.id}" class="list-group-item d-flex justify-content-between task-item">
        <span class="${cssClass}">${t.text}</span>
        <div class="task-item__buttons">
            <button type="button" data-action="done" class="btn-action">
                <img src="./img/tick.svg" alt="Done" width="18" height="18">
                </button>
                <button type="button" data-action="delete" class="btn-action">
                <img src="./img/cross.svg" alt="Done" width="18" height="18">
            </button>
        </div>
    </li> `

 taskList.insertAdjacentHTML("beforeend",taskHtml)
 
})

function doneTask(e){

    if(e.target.dataset.action !=="done")return

      const parNode = e.target.closest(".list-group-item")
      const id = Number(parNode.id);

     const t =  mass.find(function(t){
        if(t.id === id){
            return true
        }
     })
    t.done = !t.done
    saveTolocalStorage ()
      const taskTitle = parNode.querySelector(".task-title");
      taskTitle.classList.toggle("task-title--done")

}

function delTask (e){

    if(e.target.dataset.action !== "delete")return;

    const perNode = e.target.closest(".list-group-item")

    const id = Number (perNode.id);

    // const index = mass.findIndex( (t) => t.id === id)
     
    mass =  mass.filter(function(t){
    return t.id !== id});

saveTolocalStorage ();
    perNode.remove()

        // if(taskList.children.length === 1 ){
        //     emptyList.classList.remove("none")
        //     }
    checkEmptList()

}

function addTask (e){

    e.preventDefault()

    const taskText = taskInpyt.value
 const newTask ={
    id:Date.now(),
    text : taskText,
    done:false
 };
 mass.push(newTask);
 saveTolocalStorage ();

 const cssClass = newTask.done ? "task-title task-title--done" :"task-title ";

    const taskHtml = `
    <li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
        <span class="${cssClass}">${newTask.text}</span>
        <div class="task-item__buttons">
            <button type="button" data-action="done" class="btn-action">
                <img src="./img/tick.svg" alt="Done" width="18" height="18">
                </button>
                <button type="button" data-action="delete" class="btn-action">
                <img src="./img/cross.svg" alt="Done" width="18" height="18">
            </button>
        </div>
    </li> `

 taskList.insertAdjacentHTML("beforeend",taskHtml)
 
 taskInpyt.value = ""
 taskInpyt.focus ()
 
//  if(taskList.children.length > 1 ){
//      emptyList.classList.add("none")

//  }
checkEmptList()
}
function checkEmptList (){
     if(mass.length == 0){
    const emptyListHTML = ` <li id="emptyList" class="list-group-item empty-list">
    <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
    <div class="empty-list__title">Список дел пуст</div>
</li>`
taskList.insertAdjacentHTML("afterbegin",emptyListHTML)
     }
if(mass.length > 0){
    const emptyEl = document.querySelector("#emptyList")
    emptyEl ? emptyEl.remove() : null;
}


}

function saveTolocalStorage (){
    localStorage.setItem("mass",JSON.stringify(mass))
}

