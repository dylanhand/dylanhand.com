#! /bin/bash

# wow this is ugly. is there no better way to get the current directory?
parent_path=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )

cd $parent_path # go to the scripts folder
cd ../img

thumbs_path="./thumbs"
optimized_path="./_optimized"

# creates the same directory structure in the given folder
function create_folder_structure() {
  for subdirectory in $(find . -not \( -path "$thumbs_path" -prune \) -not \( -path "$optimized_path" -prune \) -type d)
  do
    if [ $subdirectory != "." ]; then
      mkdir -p $1/$subdirectory
    fi
  done
}

function make_thumbnails() {
  for file in $(find . -not \( -path "$optimized_path" -prune \) -not \( -path "$thumbs_path" -prune \) -type f -iname "*[.jpg, .png]")
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
      convert $file -thumbnail 200x200 -quality 85 "$thumbs_path/$filename_webp"
    fi
  done
}

function optimize_images() {
  for file in $(find . -not \( -path "$optimized_path" -prune \) -not \( -path "$thumbs_path" -prune \) -type f -iname "*[.jpg, .png]")
  do
    # jpg
    filename_jpg=$(echo "$file" | cut -c 3-) # cut off the "./"
    if [ ! -f "$optimized_path/$filename_jpg" ]; then
      echo "Optimizing as jpg: $file"
      convert "$filename_jpg" -resize "1920>" -quality 85 "$optimized_path/$filename_jpg"
    fi

    # webp
    filename_webp=${filename_jpg%.*}.webp
    if [ ! -f "$optimized_path/$filename_webp" ]; then
      echo "Optimizing as webp: $file"
      convert "$filename_jpg" -resize "1920>" -quality 85 "$optimized_path/$filename_webp"
    fi
  done
}

create_folder_structure $thumbs_path
create_folder_structure $optimized_path
make_thumbnails
optimize_images
