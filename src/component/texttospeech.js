import React, { useEffect } from 'react'

const TextToSpeech = ({text}) => {
    const [audioUrl, setAudioUrl] = useState('');

    useEffect(  () => {
        convertTextToSpeech();
    }, [text])

    const convertTextToSpeech = async () => {
      try {
        const response = await axios.post('http://localhost:5000/speech', { text });
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
