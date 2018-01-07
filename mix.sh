if (( $# < 3 )); then
    echo "mix.sh videoin audioin output"
    exit 1
fi

set -o history -o histexpand

ffmpeg \
    -an -i ${1} \
    -vn -i ${2} \
    -strict -2 -filter_complex "[1:a][1:a]amerge=inputs=2[a] ; [0:v]concat=n=1:v=1:a=0[vid:v]" -map [a] -map [vid:v] -shortest ${3}

echo !!

# ffmpeg -i input.mov -filter_complex "[0:v]scale=-2:720,format=yuv420p[v];[0:a]amerge=inputs=$(
#     ffprobe -loglevel error -select_streams a -show_entries stream=codec_type -of csv=p=0 input.mov | wc -l
#     )[a]" -map "[v]" -map "[a]" -c:v libx264 -crf 23 -preset medium -c:a libmp3lame -ar 44100 -ac 2 output.mov