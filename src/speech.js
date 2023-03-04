/* speech system */
const spchsys = speechSynthesis
/* available voices */
let voices = []

let _utterance = undefined

function getCandidates (langs, preferredNames) {
  const candidates = spchsys.getVoices().filter(v=>langs.includes(v.lang))
  candidates.sort((v1, v2) => {
    const v1index = preferredNames.indexOf(v1.voiceURI)
    const v2index = preferredNames.indexOf(v2.voiceURI)
    return (v1index >= 0 ?  v1index : 99) - (v2index >= 0 ? v2index : 99)
  })
  return candidates
}

export function speak (voice, text, volume = .5, rate = .7) {
  return new Promise((resolve, reject) => {
    const utterance = new SpeechSynthesisUtterance();
    Object.assign(utterance, { voice, text, volume, rate })
    utterance.lang = voice.lang.replace(/_/, '-')
    utterance.onend = () => {
      resolve()
    }
    // utterance.voice = voice
    // utterance.text = text
    spchsys.speak(utterance)
    _utterance = utterance
  })
}
export function speakJapanese (text, volume = 1, rate = .9) {
  const candidates = getCandidates(['ja-JP', 'ja_JP'], [
    // pc
    'Microsoft Ichiro - Japanese (Japan)',
    'Microsoft Haruka - Japanese (Japan)',
    'Microsoft Ayumi - Japanese (Japan)',
    'Google 日本語',
    'Microsoft Sayaka - Japanese (Japan)',
    // mobile
    'Japanese Japan'
  ])
  // console.log(candidates)
  return speak(candidates[0], text, volume, rate)
}

speechSynthesis.getVoices()

export function cancelSpeech () {
  spchsys.cancel()
}
