function addTask(){
    const newTask = document.createElement("li");
    const taskList = document.getElementById("taskList");
    taskList.appendChild(newTask);
    newTask.textContent = document.getElementById("input-Task").value;
    document.getElementById("input-Task").value = " "
}