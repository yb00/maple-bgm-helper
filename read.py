import json
import csv
import ydl

with open('bgm.json', 'r', encoding='UTF8') as f:
    data = json.load(f)
# print(data[0]['metadata']['title'])

links = []

with open('songs.csv', newline='') as csvfile:
    file = csv.reader(csvfile, delimiter=',')
    for row in file:
        title = ', '.join(row)
        # print(title)
        if title == 'Final Fight':
                links.append('rEtDrkAYs68')
        else:
            for entry in data:
            # print(entry)
                if entry['metadata']['title'] == title:
                    links.append(entry['youtube'])

index = 1
print(links)
for link in links:
    if(index == 28):
        index += 1
        print(index, link)
        ydl.youtube_to_mp3(link, index)
    else:
        print(index, link)
        ydl.youtube_to_mp3(link, index)
    index += 1
