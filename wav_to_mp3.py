import pydub
import os


os.chdir("data/audio_wav/list_4");


for filename in os.listdir(os.getcwd()):
    sound = pydub.AudioSegment.from_wav(filename);
    f_name = filename.replace(".wav","");
    sound.export("../../audio/list_4/" + f_name + ".mp3", format="mp3")