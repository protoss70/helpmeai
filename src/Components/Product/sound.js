let mediaRecorder = null;
let recordedChunks = [];

// Start recording audio
export function startRecording() {
    recordedChunks = []
    console.log("start called");
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
export async function stopRecording() {
    console.log("stop called");
  if (mediaRecorder !== null) {
    await mediaRecorder.stop();
  }
}

export function turnToWav(){
    stopRecording();
    console.log("turn to wav");
    const audioBlob = new Blob(recordedChunks, {
        'type': 'audio/mpeg'
    });
    return audioBlob;
}

// Play back the recorded audio
export function playBack() {
    console.log("play back");
  if (recordedChunks.length > 0) {
    const audioBlob = new Blob(recordedChunks, { type: 'audio/wav' });
    console.log(audioBlob);
    const audioUrl = URL.createObjectURL(audioBlob);
    return audioBlob;
  }
}
