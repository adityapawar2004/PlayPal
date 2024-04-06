import speech_recognition as sr
from gtts import gTTS
import os
from flask import Flask, request, jsonify, send_file
app = Flask(__name__)

@app.route('/recognize', methods=['POST'])
def recognize_from_microphone():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("Calibrating microphone...")
        recognizer.adjust_for_ambient_noise(source, duration=1)
        print("Microphone calibrated. Start speaking.")
    
        try:
            audio = recognizer.listen(source, timeout=5)  # Adjust timeout as needed
            print("Processing audio...")

            text = recognizer.recognize_google(audio)
            print("You said: " + text)
        except sr.WaitTimeoutError:
            print("Listening timed out while waiting for phrase to start")
        except sr.UnknownValueError:
            print("Google Speech Recognition could not understand audio")
        except sr.RequestError as e:
            print(f"Could not request results from Google Speech Recognition service; {e}")


def text_to_speech(text, lang='en'):
    tts = gTTS(text=text, lang=lang)
    filename = "output.mp3" 
    tts.save(filename)
    return filename

@app.route('/speech', methods=['POST'])
def main():
    if 'text' in request.form:
        text = request.form['text']
        filename = text_to_speech(text)
        print(f"Text converted to speech. Saved as '{filename}'")
        return send_file(filename, as_attachment=True)
    else:
        return "Text not provided in the request."
    
if (__name__ == "__main__"):
    app.run(port=5000)