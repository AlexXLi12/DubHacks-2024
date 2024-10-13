from openai import OpenAI
import json

with open("config.json") as f:
    config = json.load(f)

api_key = config["apiKey"]

client = OpenAI(
  api_key=api_key,
  base_url="https://api.lemonfox.ai/v1",
)

def speech_to_text(file_path):
    audio_file = open(file_path, "rb")
    transcript = client.audio.transcriptions.create(
    model="whisper-1",
    file=audio_file,
    language="en",
    prompt="Nurse narrates important information about the patient's condition, or nurse is performing handover report to the next shift. Medical terms are used.",    
    )
    return transcript.text

print(speech_to_text("harvard.wav"))