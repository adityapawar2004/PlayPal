import React, { useState } from 'react';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const SpeechtoText = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.continuous = true; // Ensure continuous recognition

  recognition.onresult = (event) => {
    const result = event.results[0][0].transcript;
    setTranscript(result);
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event);
    alert('Speech recognition encountered an error. Please try again.',event);
    stopListening();
  };

  const startListening = () => {
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
    setIsListening(true);
  };

  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
  };

  return (
    <div>
      <button onClick={isListening ? stopListening : startListening} disabled={isListening}>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
      <p>{transcript}</p>
    </div>
  );
};

export default SpeechtoText;
