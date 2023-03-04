import relations from './data.json'
import { playJapaneseAudio, audioMap } from './audio.js'
import { hasJapanese } from 'asian-regexps'
// import { Snackbar } from '@material/mwc-snackbar'

// let snackbar = new Snackbar()
// snackbar.timeoutMs = -1
// snackbar.leading = true
// // snackbar.setAttribute('style', 'position:fixed;z-index:9999')
// snackbar.innerHTML = `
// <button slot="action">close</button>
// `

let playTimeout = undefined
document.addEventListener('selectionchange', function (e) {
  if (playTimeout) { clearTimeout(playTimeout) }
  const selection = window.getSelection().toString().trim()
  if (selection) {
    const result = relations.find(function (pair) {
      return pair[0] === selection
    })
    if (result && result[1]) {
      container.textContent = result[1]
      container.style.display = 'initial'
    }
    else {
      container.style.display = 'none'
      container.textContent = ''
    }

    if (result || selection.length < 6) {
      const hiragana = result ? result[1] : selection;
      // snackbar.labelText = hiragana
      // snackbar.show()
      if (hasJapanese(hiragana) === false) { return }
      const timeToWait = hiragana in audioMap ? 0 : 1000
      playTimeout = setTimeout(function () {
        playJapaneseAudio(hiragana)
      }, timeToWait)
    }
  }
})


const container = document.createElement('div')
container.setAttribute('style', 'display:none;position:fixed;top:0;left: calc(100vw / 2 - 60px);background-color:#000000aa;color:white;z-index:999999999999999;padding: 2px 5px')
document.body.appendChild(container)

container.addEventListener('contextmenu', function (e) {
  e.preventDefault()
  container.style.display = 'none'
})

document.body.appendChild(snackbar)
