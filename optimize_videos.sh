#!/bin/bash

# Input and output directories
INPUT_DIR="./public/project-videos"
OUTPUT_DIR="./public/optimized-project-videos"

# Create the output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Loop through each MP4 file in the input directory
for i in "$INPUT_DIR"/*.mp4; do
    # Get the base filename (e.g., doritos-mortis.mp4)
    filename=$(basename "$i")
    echo "Processing $filename..."

    # FFmpeg command for optimization
    # -i: input file
    # -vf "scale=1920:-2": scales video to 1920px width, preserving aspect ratio. Adjust if you want smaller (e.g., 1280:-2 or 960:-2)
    # -c:v libx264: use H.264 video codec
    # -crf 23: Constant Rate Factor for quality. 23 is a good balance. Lower (e.g., 20) is higher quality/larger file, higher (e.g., 28) is lower quality/smaller file.
    # -preset medium: encoding speed vs. compression. 'medium' is a good balance. Can try 'slow' for slightly better compression, 'fast' for quicker encoding.
    # -an: remove audio track (since your video tag is muted)
    # -movflags +faststart: moves metadata to start for faster playback
    # "$OUTPUT_DIR/$filename": output file path

    ffmpeg -i "$i" \
      -vf "scale=1920:-2" \
      -c:v libx264 -crf 23 -preset medium \
      -an \
      -movflags +faststart \
      "$OUTPUT_DIR/$filename"

    echo "Finished $filename"
done

echo "All videos processed!"