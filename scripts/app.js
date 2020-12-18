const inputText = document.querySelector("#input-text");
const tasksContainer = document.querySelector('.tasks-container');
const addButton = document.getElementById('add-task');
const completedCount = document.getElementById('quantity');
let elem = null;
let tasks = [];

const isBefore = (el1, el2) => {
    for (
        var cur = el1.previousSibling;
        cur && cur.nodeType !== 9 ;
        cur = cur.previousSibling
    )
    if (cur === el2) return true;
    return false
}

inputText.onfocus = function () {
    'use strict'; 
    this.setAttribute('data-place', this.getAttribute('placeholder'));
    this.setAttribute('placeholder', '');

}

inputText.onblur = function () {
    'use strict'; 
    this.setAttribute('placeholder', this.getAttribute('data-place'));
    this.setAttribute('data-place', '');
}

const addNewTask = (value) => {
    let     task = document.createElement("div"),
            text = document.createElement("p"),
            close = document.createElement("span"),
            closeImage = document.createElement("img"),
            flat = document.createElement("input"),
            obj = tasks.find((t) => t.value === value);
        flat.classList.add("flat-icon")
        task.classList.add("task")
        close.classList.add("close-task")
        closeImage.setAttribute("src", "./images/icon-cross.svg");
        close.appendChild(closeImage);
        text.textContent = inputText.value;
        task.appendChild(flat);
        task.appendChild(close);
        task.appendChild(text);
        tasksContainer.appendChild(task);
        flat.type = "checkbox";
        flat.name = "checkbox";
        flat.htmlFor = "checkbox";
        countCompleted();
        flat.addEventListener('click', (e) => {
            if(flat.checked === false) {
                flat.classList.remove("check");
                text.classList.remove("checked");
                obj.checked = false;
                countCompleted();
                console.log("not checked");
            }else{
                console.log("checked");
                obj.checked = true;
                countCompleted();
                flat.checked = true;
                flat.classList.add("check");
                text.classList.add("checked");
            }
        })
        
        close.onclick = (e) => {
            task.remove();
            tasks = tasks.filter((t) => t !== obj);
            countCompleted();
        }
        inputText.value="";
        task.draggable = true;
        task.addEventListener("dragstart" , (e) => {
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/plain", null);
            elem = e.target;
            console.log(elem);

        })

        task.addEventListener("dragover", (e) => {
            let el1;
            e.preventDefault();
            if(e.target.classList.contains("task")) {
                el1 = e.target;
            }else {
                el1 = e.target.parentElement;
            }
            if (isBefore(elem, el1)) {
                el1.parentNode.insertBefore(elem, el1);
            }else {
                el1.parentNode.insertBefore(elem, el1.nextSibling)
            }

        })
        
        task.addEventListener("dragend", () => {
            elem = null;
            let index = tasks.findIndex((t) => t.value = value);
            tasks.splice(index, 1);
            if(task.nextSibling) {
                let index1 = tasks.findIndex(
                    (t) => t.value = task.nextSibling.querySelector("p").textContent
                );
                tasks.splice(index1, 0, {
                    value: value,
                    checked: task.querySelector("input").checked,
                })
            }else {
                tasks.push({
                    value: value,
                    checked: task.querySelector("input").checked,
                })
            }
        })
}

const updateTasks = (value, bool) => {
    tasks.forEach((t) =>{
        if(t.value === value) {
            t.checked = bool;
        }
    })
}

inputText.addEventListener("keyup", (e) => {
    if(e.key === "Enter" || e.keyCode === 13) {
        console.log(tasks);
        tasks.push({value: e.target.value, checked: false});
        addNewTask(e.target.value);
        countCompleted();
    }
})

addButton.addEventListener('click', (e) => {
    if(inputText.value === '') {
        swal({
            title:"Error!",
            text: "You Have To Enter A Task!",
            buttons: {
                   confirm: "Ok"
            }
       });
       countCompleted();
    }else {
        console.log(tasks);
        tasks.push({value: inputText.value, checked: false});
        addNewTask(e.target.value);
        countCompleted();
    }
})

const countCompleted = () => {
    completedCount.textContent = `${
        tasks.filter((t) => t.checked === false).length
    } items left`;
    
}


const clearCompleted = () => {
    countCompleted();
    document.querySelectorAll(".task").forEach((task) => {
        if(task.querySelector("input").checked) {
            task.remove();
        }
    })
}


const showAll = () => {
    countCompleted();
    document.querySelectorAll(".task-action li").forEach((d, i) => {
        if(i === 0){
            d.classList.add("filterActive")
        }else {
            d.classList.remove("filterActive")
        }
    })
    document.querySelectorAll(".task").forEach((task) => {
        task.style.display = "flex";
    })
}

const filterCompleted = () => {
    countCompleted();
    document.querySelectorAll(".task-action li").forEach((d, i) => {
        if(i === 2){
            d.classList.add("filterActive")
        }else {
            d.classList.remove("filterActive")
        }
    })
    document.querySelectorAll(".task").forEach((task) => {
        task.style.display = "flex";
        if(!task.querySelector("input").checked) {
            task.style.display = "none";
        }
    })
}

const filterActive = (e) => {
    countCompleted();
    document.querySelectorAll(".task-action li").forEach((d, i) => {
        if(i === 1){
            d.classList.add("filterActive")
        }else {
            d.classList.remove("filterActive")
        }
    })
    document.querySelectorAll(".task").forEach((task) => {
        task.style.display = "flex";
        if(task.querySelector("input").checked) {
            task.style.display = "none";
        }
    })
}
