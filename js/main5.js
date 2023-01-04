const editMode = document.getElementById('edit-mode-box')
const input = document.querySelector('.add-form input')
const [addBtn, saveBtn] = document.querySelectorAll('.add-form button')
const list = document.querySelector('.list')
const [doneCount, taskCount] = document.querySelectorAll('.counter span')
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
removeBtn.onclick = handleRemoveDone

list.onclick = (e) => {
    if (e.target.className == "del-btn") {
        const li = e.target.closest('li')
        handleRemoveOne(li)
        updateCount()
    }
    if (e.target.className == "edit-btn") {
        const li = e.target.closest('li')
        handleEdit(li)
    }
    if (e.target.tagName == "INPUT") {
        const li = e.target.closest('li')
        handleCheck(li)
        updateCount()
    }
}
/*
* узнать id li
* найти индекс удаляемого объекта
* удалить task из tasks
*/
function handleRemoveOne(li) {
    const id = li.dataset.id
    const index = tasks.findIndex(task => task.id == id)
    tasks.splice(index,1)
    renderTasks()
}

/*
* Узнать id li
* Найти task по id
* Узнать состояние chexbox
* Приравнять done в объекте task к состоянию chexbox
*/

function handleCheck(li) {
    const checkId = li.dataset.id
    const task = tasks.find(task => task.id == checkId)
    //const checked = li.querySelector(":checked") ? true : false
    const checked = Boolean(li.querySelector(":checked"))
    task.done = checked

}

function renderTasks() {
    list.replaceChildren(...tasks.map(renderTask))

}

function renderTask(task) {
    let li = document.createElement('li')
    li.className = "item"
    li.dataset.id = task.id
    li.innerHTML = `<input type="checkbox" ${task.done ? "checked" : ""}>
    <span>${task.text}</span>
    <button class="edit-btn">🖊</button>
    <button class="del-btn">❌</button>`
    return li
}

function createTask(text) {
    return { text, done: false }
}

function generateId() {
    return ++lastId
}

function createTask(text) {
    return { id: generateId(), text, done: false }
}

function handleAdd() {
    let text = input.value
    let task = createTask(text)
    tasks.push(task)
    //list.append(item)
    input.value = ''
    renderTasks()
    updateCount()
}

function updateCount() {
    taskCount.innerText = list.children.length
    doneCount.innerText = list.querySelectorAll(":checked").length
}

function handleEdit(li) {
    editMode.checked = true
    input.value = li.querySelector('span').innerText
    editId = li.dataset.id
}

function handleSave() {
    editMode.checked = false
    let task = tasks.find(task => task.id == editId)
    task.text = input.value
    renderTasks()



}

/*
* найти объекты где состояние done равно true
* удалить найденные объекты:
    * перебрать, для каждого делая следущее:
        * найти индекс удаляемого объекта
        * удалить task из tasks
*/

function handleRemoveDone() {
    const doneTasks = tasks.filter((task => task.done))
    doneTasks.forEach(task => {
        const index = tasks.indexOf(task)
        tasks.splice(index, 1)
    })
    renderTasks()
}







