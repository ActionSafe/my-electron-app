const setBtn = document.getElementById("btn")
const openBtn = document.getElementById("openFile")
const counter = document.getElementById("counter")
const titleInput = document.getElementById("title")
const filePathElement = document.getElementById('filePath')

setBtn.addEventListener('click', () => {
    window.electronAPI.setTitle(titleInput.value)
})

openBtn.addEventListener('click', async () => {
    const filePath = await window.electronAPI.openFile()
    filePathElement.innerText = filePath
})

window.electronAPI.onUpdateCounter((value) => {
    const oldValue = Number(counter.innerText)
    const newValue = oldValue + value
    counter.innerText = newValue.toString()
})