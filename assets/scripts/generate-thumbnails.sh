#! /bin/bash

# wow this is ugly. is there no better way to get the current directory?
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

cd $parent_path # go to the scripts folder
cd ../img

thumbs_path="./thumbs"
originals_path="./originals"

# create the same directory structure in the thumbs folder
function create_thumbnail_folder_structure() {
  for subdirectory in $(find . -not -path "$thumbs_path/*" -type d)
  do
    if [ $subdirectory != "." ]; then
      mkdir -p $thumbs_path/$subdirectory
    fi
  done
}

# make the same directory structure for original pics
function make_originals_folder_structure() {
  for subdirectory in $(find . -not -path "$originals_path/*" -not \( -path "$thumbs_path" -prune \) -type d)
  do
    if [ $subdirectory != "." ]; then
      mkdir -p originals/$subdirectory
    fi
  done
}

function make_thumbnails() {
  for file in $(find . -not -path "$thumbs_path/*" -type f -iname "*[.jpg, .png]")
  do
    # jpg thumbnails
    filename_jpg=$(echo "$file" | cut -c 3-) # cut off the "./"
    if [ ! -f "$thumbs_path/$filename_jpg" ]; then
      echo "Creating jpg thumbnail for: $file"
      convert $file -thumbnail 200x200 -quality 85 "$thumbs_path/$filename_jpg"
    fi

    # webp thumbnails
    filename_webp=${filename_jpg%.*}.webp
    if [ ! -f "$thumbs_path/$filename_webp" ]; then
      echo "Creating webp thumbnail for: $file"
      convert $file -thumbnail 200x200 "$thumbs_path/$filename_webp"
    fi
  done
}

function optimize_images() {
  for file in $(find . -not -path "$originals_path/*" -not -path "$thumbs_path/*" -type f -iname "*[.jpg, .png]")
  do
    # jpg thumbnails
    filename_jpg=$(echo "$file" | cut -c 3-) # cut off the "./"
    if [ ! -f "$originals_path/$filename_jpg" ]; then
      echo "Optimizing: $file"
      # echo $file $originals_path
      # mv $file $originals_path
      # convert "$originals_path/$filename_jpg" -resize "1920>" -quality 85 "$filename_jpg"
    fi

    # webp thumbnails
    # filename_webp=${filename_jpg%.*}.webp
    # if [ ! -f "./thumbs/$filename_webp" ]; then
      # echo "Creating webp thumbnail for: $file"
      # convert $file -thumbnail 200x200 "./thumbs/$filename_webp"
    # fi
  done
}

create_thumbnail_folder_structure
make_thumbnails
make_originals_folder_structure
optimize_images
