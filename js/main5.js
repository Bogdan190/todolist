const [addBtn, saveBtn] = document.querySelectorAll('.add-form button')
const input = document.querySelector('.add-form input')
const list = document.querySelector('.list')
const editMode = document.getElementById('edit-mode-box')
const [doneCounter, taskCounter] = document.querySelectorAll('.counter span')
const removeBtn = document.querySelector('.remove-btn')
let lastId = 0
let editId
const tasks = [
    { id: generateId(), text: "first good", done: true },
    { id: generateId(), text: "buy dog food", done: false }
]

renderTasks()

addBtn.onclick = handleAdd
saveBtn.onclick = handleSave
removeBtn.onclick = handleRemove

function renderTasks() {
    list.replaceChildren(...tasks.map(renderTask))
}

function renderTask(task) {
    let li = document.createElement('li')

    li.className = 'item'
    li.dataset.id = task.id
    li.innerHTML = `<input type="checkbox" ${task.done ? "checked" : ""}>
    <span>${task.text}</span>
    <button class="edit-btn">🖊</button>
    <button class="del-btn">❌</button>`

    return li
}

function generateId() {
    return ++lastId
}
function createTask(text) {
    return { id: generateId(), text, done: false }
}

function handleAdd() {
    const text = input.value
    const task = createTask(text)

    tasks.push(task)
    input.value = ''
    renderTasks()
    updateCount()
}


function handleEdit(li) {
    editMode.checked = true
    input.value = li.querySelector('span').innerText
    editId = li.dataset.id

}



function handleSave() {
    editMode.checked = false
    const task = tasks.find(task => task.id == editId)
    task.text = input.value
    input.value = ''
    renderTasks()
}

list.onclick = (e) => {
    if (e.target.className == "del-btn") {
        e.target.parentElement.remove()
        updateCount()
    }
    if (e.target.className == "edit-btn") {
        const li = e.target.closest('li')
        handleEdit(li)
    }
    if (e.target.tagName == "INPUT") {
        updateCount()
    }
}





function updateCount() {
    taskCounter.innerText = list.children.length
    doneCounter.innerText = list.querySelectorAll(":checked").length
}

function handleRemove() {
    const boxes = list.querySelectorAll(":checked")
    boxes.forEach(box => box.parentElement.remove())
    updateCount()
}