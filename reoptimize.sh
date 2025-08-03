#!/bin/bash

# Step 1: Rename your current optimized folder to be the input
echo "Renaming optimized-project-videos to project-videos-backup..."
mv ./public/optimized-project-videos ./public/project-videos-backup

# Step 2: Create new output directory
echo "Creating new optimized-project-videos directory..."
mkdir -p ./public/optimized-project-videos

# Step 3: Process all videos from the backup folder
INPUT_DIR="./public/project-videos-backup"
OUTPUT_DIR="./public/optimized-project-videos"

for i in "$INPUT_DIR"/*.mp4; do
    filename=$(basename "$i")
    base_name="${filename%.*}"
    echo "Re-processing $filename..."
    
    # Original size but better compression
    ffmpeg -i "$i" \
        -c:v libx264 -crf 25 -preset slow \
        -profile:v high -level 4.0 \
        -an -movflags +faststart \
        -pix_fmt yuv420p \
        "$OUTPUT_DIR/$filename"
    
    # Create WebM version (much smaller files)
    ffmpeg -i "$i" \
        -c:v libvpx-vp9 -crf 32 -b:v 0 \
        -an -movflags +faststart \
        "$OUTPUT_DIR/${base_name}.webm"
    
    echo "Finished $filename"
done

echo "All videos re-processed!"
echo "Original files backed up in: project-videos-backup"
echo "New optimized files in: optimized-project-videos"

# Optional: Remove backup after you confirm everything works
# rm -rf ./public/project-videos-backup