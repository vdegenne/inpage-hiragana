import relations from './data.json'

document.addEventListener('selectionchange', function (e) {
  const selection = window.getSelection().toString().trim()
  if (selection) {
    console.log(selection)
    const result = relations.find(function (pair) {
      return pair[0] === selection
    })
    if (result) {
      container.textContent = result[1]
      container.style.display = 'initial'
    }
  }
})


const container = document.createElement('div')
container.setAttribute('style', 'position:fixed;bottom:0;right:0;background-color:#000000aa;z-index:999999999999999')
document.body.appendChild(container)

container.addEventListener('contextmenu', function (e) {
  e.preventDefault()
  container.style.display = 'none'
})