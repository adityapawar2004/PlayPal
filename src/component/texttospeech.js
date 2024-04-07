import React, { useEffect, useState } from 'react'

const TextToSpeech = ({message}) => {
    const [audioUrl, setAudioUrl] = useState('');

    useEffect(  () => {
        convertTextToSpeech();
    }, [message])

    const convertTextToSpeech = async () => {
      try {
        const response = await axios.post('http://localhost:5000/speech', { message });
        console.log(response)
        setAudioUrl(response.data.audioUrl);
      } catch (error) {
        console.error('Error converting text to speech:', error);
      }
    };

    return (
      <div>
        {audioUrl && <audio controls src={audioUrl} autoPlay/>}
      </div>
    );
  };

export default TextToSpeech
