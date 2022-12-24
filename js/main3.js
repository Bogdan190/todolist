const [addBtn, saveBtn] = document.querySelectorAll('.add-form button')
const list = document.querySelector('.list')
const input = document.querySelector('.add-form input')
const editMode = document.getElementById('edit-mode-box')
const [doneCounter, taskCounter] = document.querySelectorAll('.counter span')
const removeBtn = document.querySelector('.remove-btn')

addBtn.onclick = handleAdd
saveBtn.onclick = handleSave
removeBtn.onclick = handleRemove

function handleAdd(){
    let task = input.value
    let item = buildItem(task)
    input.value = ''
    list.append(item)
    updateCount()
}

function buildItem(task){
    let li = document.createElement('li')
    li.className = "item"
    li.innerHTML = ` <input type="checkbox" name="" id="">
    <span>${task}</span>
    <button class="edit-btn">🖊</button>
    <button class="del-btn">❌</button>`


    return li
}

list.onclick = (e) =>{
    if(e.target.className == "del-btn"){
        e.target.parentElement.remove()
        updateCount()
    }
    if(e.target.className == "edit-btn"){
        let li = e.target.closest('li')
        handleEdit(li)
    }
    if(e.target.tagName == "INPUT"){
        updateCount()
    }
    
}


function handleEdit(li){
    editMode.checked = true
    input.value = li.querySelector('span').innerText
    editMode.li=li
}

function handleSave(){
    editMode.checked = false
    editMode.li.querySelector('span').innerText = input.value
}

function updateCount(){
    taskCounter.innerText = list.children.length
    doneCounter.innerText = list.querySelectorAll(':checked').length
}

function handleRemove(){
    let boxes = document.querySelectorAll(":checked")
    boxes.forEach(box=>box.parentElement.remove())
}


const obj = {
    
}
obj.checked = true
obj.checked = false
obj.li = 1
console.log(obj)
