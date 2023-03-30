let mediaRecorder = null;
let recordedChunks = [];

// Start recording audio
export function startRecording() {
    recordedChunks = []
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.addEventListener('dataavailable', e => {
            if (e.data.size > 0) {
            recordedChunks.push(e.data);
            }
        });
        mediaRecorder.start();
        })
        .catch(err => {
        console.error('Error starting audio recording:', err);
        });
}

// Stop recording audio
export function stopRecording() {
  if (mediaRecorder !== null) {
    mediaRecorder.stop();
    mediaRecorder = null;
  }
}

export function turnToWav(){
    const audioBlob = new Blob(recordedChunks, { type: 'audio/webm' });
    return audioBlob;
}

// Play back the recorded audio
export function playBack() {
  if (recordedChunks.length > 0) {
    const audioBlob = new Blob(recordedChunks, { type: 'audio/webm' });
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
  }
}
