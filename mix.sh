ffmpeg -i 80YearsOfHappy.mp4 -i Yonkers-TylerTheCreator.mp4 -strict -2 -filter_complex "[1:a][1:a]amerge=inputs=2[aud]; [0:v]concat=n=1:v=1:a=0[vid:v]" -map [aud] -map [vid:v] -shortest ./out.mp4
