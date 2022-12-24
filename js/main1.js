const editMode = document.getElementById('edit-mode-box')
const input = document.querySelector('.add-form input')
const [addBtn, saveBtn] = document.querySelectorAll('.add-form button')
const list = document.querySelector('.list')
const [doneCounter, taskCounter] = document.querySelectorAll('.counter span')

addBtn.onclick = handleAdd
saveBtn.onclick = handleSave
function handleAdd(){
    let task = input.value
    let item = buildItem(task)
    list.append(item)
    input.value = ''
    updateCount()
}



function buildItem(task){
    let li = document.createElement('li')
    li.className = "item"
    li.innerHTML = `<input type="checkbox">
    <span>${task}</span>
    <button class="edit-btn">🖊</button>
    <button class="del-btn">❌</button>`
    return li
}


list.onclick = (e) => {
    if(e.target.className == "del-btn"){
        e.target.parentElement.remove()
        updateCount()
    }
    if(e.target.className == "edit-btn"){
        const li = e.target.closest('li')
        handleEdit(li)
    }
    if (e.target.tagName == 'INPUT'){
        updateCount()
    }
}

function handleEdit(li){
    editMode.checked = true
    input.value = li.querySelector('span').innerText
    editMode.li = li
}

function handleSave(){
    editMode.checked = false
    editMode.li.querySelector('span').innerText = input.value
}

function updateCount(){
    taskCounter.innerText = list.children.length
    doneCounter.innerText = list.querySelectorAll(':checked').length
}