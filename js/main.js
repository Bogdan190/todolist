const editMode = document.getElementById('edit-mode-box')

const input = document.querySelector('.add-form input')
const [addBtn, saveBtn] = document.querySelectorAll('.add-form button')
const removeBtn = document.querySelector('.status-bar button')
const list = document.querySelector('.list')
const [doneCounter, taskCounter] = document.querySelectorAll('.counter span')


const tasks = [
    { text: "first good", done: false },
    { text: "buy dog food", done: true }
]

renderTasks()

removeBtn.onclick = handleRemove
addBtn.onclick = handleAdd
saveBtn.onclick = handleSave

list.onclick = (e) => {
    if (e.target.className == "del-btn") {
        e.target.parentElement.remove()
        updateCount()
    }
    if (e.target.className == "edit-btn") {
        const li = e.target.closest('li')
        handleEdit(li)
        let text = e.target.previousElementSibling.innerHTML
        editItem(text)
    }
    if (e.target.tagName == 'INPUT') {
        updateCount()
    }

}

function renderTasks() {
    list.replaceChildren(...tasks.map(renderTask))

}




function renderTask(task) {
    const li = document.createElement('li')
    //li.className = 'item'
    li.classList.add('item')
    li.innerHTML = `
    <input type="checkbox" ${task.done ? "checked" : ""}>
    <span>${task.text}</span>
    <button class="edit-btn">🖊</button>
    <button class="del-btn">❌</button>
    `

    return li
}


function editItem() {

}

function updateCount() {
    taskCounter.innerText = list.children.length
    doneCounter.innerText = list.querySelectorAll(':checked').length
}

function handleEdit(li) {
    editMode.checked = true
    input.value = li.querySelector('span').innerText
    editMode.li = li
}

function handleSave() {
    editMode.li.querySelector("span").innerText = input.value
    input.value = ''
    editMode.checked = false
}

function createTask(text) {
    return {text, done:false}
}


function handleAdd() {
    const text = input.value
    const task = createTask(text)

    tasks.push(task)
    input.value = ''
    renderTasks()
    updateCount()
}

function buildItem(task) {
    const li = document.createElement('li')
    //li.className = 'item'
    li.classList.add('item')
    li.innerHTML = `
    <input type="checkbox">
    <span>${task}</span>
    <button class="edit-btn">🖊</button>
    <button class="del-btn">❌</button>
    `

    return li
}

function handleRemove() {
    let boxes = document.querySelectorAll(":checked")
    boxes.forEach(box => box.parentElement.remove())
}




