const setBtn = document.getElementById("btn")
const openBtn = document.getElementById("openFile")
const titleInput = document.getElementById("title")
const filePathElement = document.getElementById('filePath')

setBtn.addEventListener('click', () => {
    window.electronAPI.setTitle(titleInput.value)
})

openBtn.addEventListener('click', async () => {
    const filePath = await window.electronAPI.openFile()
    filePathElement.innerText = filePath
})