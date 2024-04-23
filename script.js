function updateUi(){
    const input=document.querySelector("input.todo-content")
    input.value=""

    const list=document.querySelector(".todo-list")
    const items=list.querySelectorAll("li.todo-item")
    let pendingTasks=0
    items.forEach(function(item){
        if(!item.classList.contains("completed")){
            pendingTasks++
        }
    })
    if(pendingTasks>0){
        document.querySelector(".todo-sumary").style.display="block"
        document.querySelector(".todo-count").textContent=pendingTasks
    }else{
        document.querySelector(".todo-sumary").style.display="none"
    }
}

function createTodo(value){
    const li=document.createElement("li")
    li.classList.add("todo-item")

    const span=document.createElement("span")
    span.classList.add("todo-content")
    span.textContent=value

    const deleteButton=document.createElement("button")
    deleteButton.classList.add("todo-delete")
    deleteButton.textContent="Delete"
    deleteButton.addEventListener("click",deleteTodo)

    const editButton=document.createElement("button")
    editButton.classList.add("todo-edit")
    editButton.textContent="Edit"
    editButton.addEventListener("click",editTodo)


    const checkbox=document.createElement("input")
    checkbox.type="checkbox"
    checkbox.addEventListener("change",updateStatus)

    li.append(checkbox,span,editButton,deleteButton)

    document.querySelector(".todo-list").prepend(li)
    updateUi()
}

function updateStatus(e){
    const checkbox=e.target
    const status=e.target.checked
    const li=checkbox.parentElement

    if(status){
        li.classList.add("completed")
    }else{
        li.classList.remove("completed")
    }

    updateUi()
}

function editTodo(e){
    const button=e.target
    const li=button.parentElement
    const span=button.previousElementSibling
    const newContent= window.prompt("Nhập nội dung công việc bạn muốn thay đổi",span.textContent)
    span.textContent=newContent
}

function deleteTodo(e){
    const button=e.target
    const li=button.parentElement

    if(window.confirm("Bạn chắc chắn muốn xóa công việc chứ?")){
        li.remove()
        updateUi()
    }
}
const form=document.querySelector("form.todo-form")
form.addEventListener("submit",function(e){
    e.preventDefault()
    const input=document.querySelector("input.todo-content")
    const value=input.value

    if(value.trim()===""){
        return alert("Tên công việc không được để trống")
    }

    createTodo(value)
})