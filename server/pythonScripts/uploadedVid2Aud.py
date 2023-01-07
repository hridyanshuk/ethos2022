import moviepy.editor
import sys

def extract_audio(input_video, output_audio):

    video = moviepy.editor.VideoFileClip(input_video)
    audio = video.audio
    audio.write_audiofile(output_audio)

if __name__ == "__main__":
    
    inputFilename = sys.argv[1]
    outputFilename = sys.argv[2]

    input_video = f"C:/Users/Hridyanshu/Desktop/Github/ethos2022/server/uploadedFiles/{inputFilename}"
    output_audio = f"C:/Users/Hridyanshu/Desktop/Github/ethos2022/server/convertedAudio/{outputFilename}.mp3"

    extract_audio(input_video, output_audio)

    print("Converted the audio")
