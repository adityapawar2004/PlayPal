import React, { useState } from 'react';

const { webkitSpeechRecognition } = window;
const recognition = new webkitSpeechRecognition();

const SpeechtoText = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const result = event.results[0][0].transcript;
    setTranscript(result);
    console.log(result); 
  };

  const startListening = () => {
    setIsListening(true);
    if (!permissionGranted) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(() => {
          setPermissionGranted(true);
          recognition.start();
        })
        .catch(error => {
          console.error('Error accessing microphone:', error);
          alert('Microphone access is required for speech recognition.');
        });
    } else {
      recognition.start();
    }
  };

  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
  };

  return (
    <div>
      <button onClick={isListening ? stopListening : startListening}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
      <p>{transcript}</p>
    </div>
  );
};

export default SpeechtoText;
