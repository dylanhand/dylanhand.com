#! /bin/bash

# wow this is ugly. is there no better way to get the current directory?
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

cd $parent_path # go to the scripts folder
cd ../img

# create the same directory structure in the thumbs folder
function create_thumbnail_folder_structure() {
  for subdirectory in $(find . -not -path "./thumbs*" -type d)
  do
    if [ $subdirectory != "." ]; then
      mkdir -p thumbs/$subdirectory
    fi
  done
}

function make_thumbnails() {
  for file in $(find . -not -path "./thumbs/*" -type f -iname "*[.jpg, .png]")
  do
    # jpg thumbnails
    filename_jpg=$(echo "$file" | cut -c 3-) # cut off the "./"
    if [ ! -f "./thumbs/$filename_jpg" ]; then
      echo "Creating jpg thumbnail for: $file"
      convert $file -thumbnail 200x200 "./thumbs/$filename_jpg"
    fi

    # webp thumbnails
    filename_webp=${filename_jpg%.*}.webp
    if [ ! -f "./thumbs/$filename_webp" ]; then
      echo "Creating webp thumbnail for: $file"
      convert $file -thumbnail 200x200 "./thumbs/$filename_webp"
    fi
  done
}

create_thumbnail_folder_structure
make_thumbnails
