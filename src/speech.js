/* speech system */
const spchsys = speechSynthesis;
/* available voices */
let voices = [];

let _utterance = undefined;

function getCandidates(langs, preferredNames) {
  const candidates = spchsys.getVoices().filter((v) => langs.includes(v.lang));
  candidates.sort((v1, v2) => {
    const v1index = preferredNames.indexOf(v1.voiceURI);
    const v2index = preferredNames.indexOf(v2.voiceURI);
    return (v1index >= 0 ? v1index : 99) - (v2index >= 0 ? v2index : 99);
  });
  return candidates;
}

export function speak(voice, text, volume = 0.5, rate = 0.7, pitch = 1) {
  return new Promise((resolve, reject) => {
    const utterance = new SpeechSynthesisUtterance();
    Object.assign(utterance, { voice, text, volume, rate, pitch });
    utterance.lang = voice.lang.replace(/_/, "-");
    utterance.onend = () => {
      resolve();
    };
    // utterance.voice = voice
    // utterance.text = text
    spchsys.speak(utterance);
    _utterance = utterance;
  });
}

// export function speakJapanese(text, volume = 1, rate = 1) {
//   const src = `https://translate.googleapis.com/translate_tts?client=gtx&ie=UTF-8&tl=ja&q=${encodeURIComponent(
//     text
//   )}`;
//   const audio = new Audio(src);
//   audio.volume = volume;
//   audio.playbackRate = rate;
//   audio.play();
// }

export function speakJapanese(text, volume = 1, rate = 0.9, pitch = 1) {
  const candidates = getCandidates(
    ["ja-JP", "ja_JP"],
    [
      // pc
      "Google 日本語",
      "Microsoft Ichiro - Japanese (Japan)",
      "Microsoft Haruka - Japanese (Japan)",
      "Microsoft Ayumi - Japanese (Japan)",
      "Microsoft Sayaka - Japanese (Japan)",
      // mobile
      "Japanese Japan",
    ]
  );
  // console.log(candidates)
  return speak(candidates[0], text, volume, rate, pitch);
}

speechSynthesis.getVoices();

export function cancelSpeech() {
  spchsys.cancel();
}
