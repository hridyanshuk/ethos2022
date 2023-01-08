from moviepy.editor import VideoFileClip
import sys
import math


if __name__ == "__main__":
    inputFilename = sys.argv[1]

    input_video = f"C:/Users/Hridyanshu/Desktop/Github/ethos2022/server/uploadedFiles/{inputFilename}"

    clip = VideoFileClip(input_video)
    duration = clip.duration
    print(math.floor(duration))