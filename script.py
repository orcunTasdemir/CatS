import os


os.chdir("data/audio/list_1");

print("\nHERE:" + os.getcwd());

all_filenames = []

for filename in os.listdir(os.getcwd()):
    all_filenames.append("data/audio/list_1/" + filename);
   

print(all_filenames);

