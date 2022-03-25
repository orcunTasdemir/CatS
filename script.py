import os

all_n = []


for i in range(1,5):
    
    os.chdir("/Users/orcuntasdemir/Desktop/CatS/data/audio/list_{}".format(i));

    for filename in os.listdir(os.getcwd()):
        if filename not in all_n:
            all_n.append("data/audio/list_{}/".format(i) + filename);


print(all_n);


