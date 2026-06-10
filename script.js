function getTask(){
     return JSON.parse(localStorage.getItem("tasks"))|| []
}
function saveTask(tasks){
    localStorage.setItem("tasks",JSON.stringify(tasks))
}


function addTask(){
    let name=document.getElementById("task")
    let date=document.getElementById("date")
    let priority=document.getElementById("priority")

    if(!name.value||!date.value||!priority.value){
        alert("Please fill in all fields")
        return 

    }
    let tasks=getTask()
    tasks.push({
        name:name.value,
        date:date.value,
        priority:priority.value,
        completed:false
    })
    saveTask(tasks)

    document.getElementById("task").value=""
    document.getElementById("date").value=""
    displayTasks()
}

function displayTasks(){
    let tasks=getTask()

    let todayDiv=document.getElementById("todayTask")
    let futureDiv=document.getElementById("futureTask")
    let completedDiv=document.getElementById("completedTask")

    todayDiv.innerHTML=""
    futureDiv.innerHTML=""
    completedDiv.innerHTML=""

    let today=new Date().toISOString().split("T")[0]

    tasks.forEach((task,index)=>{
        let div=document.createElement("div")
        div.className=`task ${task.priority} ${task.completed? "Completed": ""}`

        div.innerHTML=`
           <div>${task.name} </div>
           <div>(${task.date})</div>
           <div>
           <button onclick="toggleComplete(${index})">✔</button>
           <button onclick="deleteTask(${index})">🗑</button>
           </div>
           `
        if(task.completed){
            completedDiv.appendChild(div)
        }
        else if(task.date===today){
            todayDiv.appendChild(div)
        }
        else{
            futureDiv.appendChild(div)
        }

    })
}
    function toggleComplete(index){
        let tasks=getTask()
        tasks[index].completed=!tasks[index].completed
        saveTask(tasks)
        displayTasks()
    }
    function deleteTask(index){
        let tasks=getTask()
        tasks.splice(index,1)
        saveTask(tasks)
        displayTasks()
    }


window.onload=function(){
    displayTasks()
}

