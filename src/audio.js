import { speakJapanese } from './speech.js'

export const audioMap = {}

export async function playJapanese(word, volume = 1) {
  let audio
  if (audioMap[word] === null) { throw new Error }
  if (word in audioMap) {
    if (audioMap[word] instanceof Promise) {
      // wait for the blob
      const response = await audioMap[word]
      await new Promise((resolve, reject) => { setTimeout(resolve, 100) })
    }

    audio = createAudioElementFromBlob(audioMap[word])
  }
  else {
    const responsePromise = fetch(`https://assiets.vdegenne.com/data/japanese/audio/${encodeURIComponent(word)}`)
    audioMap[word] = responsePromise
    const response = await responsePromise
    const blob = audioMap[word] = await response.blob()
    audio = createAudioElementFromBlob(blob)
  }

  return new Promise((resolve, reject) => {
    audio.volume = volume
    audio.onerror = () => reject()
    audio.onended = () => {
      resolve(audio)
    }
    audio.play()
  })
}

export function createAudioElementFromBlob(blob) {
  return new Audio(URL.createObjectURL(blob))
}

export async function playJapaneseAudio(word) {
  try {
    await playJapanese(word)
  } catch (e) {
    audioMap[word] = null
    await speakJapanese(word, 0.9, 1, 0.8)
  }
}
