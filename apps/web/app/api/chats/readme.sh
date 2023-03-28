#!/bin/bash

# loop through the directory
for folder in *; do
  # check if folder exists and is a directory
  if [[ -d "$folder" ]]; then
    # create a README.md file in the folder
    touch "$folder"/README.md
    # loop through each file in the folder
    for file in "$folder"/*; do
      # check if file exists and is a file
      if [[ -f "$file" ]]; then
        # hit the API endpoint passing in the contents of the file in the request
        response=$(curl -s -X POST -H "Content-Type: application/json" -d "{\"file_contents\":\"$(cat $file)\",\"readme_contents\":\"$(cat $folder/README.md)\"}" http://localhost:3000/api/ai/readme)
        # write the response to the README.md file
        echo "$response" > "$folder"/README.md
      fi
    done
  fi
done

# loop through the directory a second time
for folder in *; do
  # check if folder exists and is a directory
  if [[ -d "$folder" ]]; then
    # loop through each file in the folder
    for file in "$folder"/*; do
      # check if file exists and is a file
      if [[ -f "$file" ]]; then
        # hit the API endpoint passing in the contents of the README.md file in the request
        response=$(curl -s -X POST -H "Content-Type: application/json" -d "{\"file_contents\":\"$(cat $file)\",\"readme_contents\":\"$(cat $folder/README.md)\"}" http://localhost:3000/api/ai/readme)
        # write the response to the README.md file
        echo "$response" > "$folder"/README.md
      fi
    done
  fi
done
