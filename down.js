const args = process.argv.slice(2).concat(null,null,null)

const getAudio = true ; //args[1] != '0'
const getVideo = true ; //args[2] != '0'

if(args[0]){
    var video = require('ytdl-core')(
        'http://www.youtube.com/watch?v='+process.argv[2],
        { filter: format => {
	    // console.dir({option:format}) // Note we can extract audio or video from here!
//            return format.container === 'mp4' && format.encoding;
	    if(format.container!=='mp4')return false;

	    // If the presence of an encoding is neq the presence of a request for that
	    // stream type then skip.
console.log(getVideo,'vid... ',getAudio,'aud... ',!!format.encoding, 'vid', !!format.audioEncoding,'aud')
console.dir({format})
            if(getVideo != !!format.encoding) {console.log('video no');return false;}
	    if(getAudio != !!format.audioEncoding) {console.log('audio no');return false;}
	    return true;
        } }
    );
    video.on('info', function(info) {    console.log('Download size: ' + info.size);    });
    video.pipe(require('fs').createWriteStream(args[1]||'./download.mp4'));
    console.log(`Now use the provided ffmpeg command to split the file. Be sure to overstate the framerate as duplicates are handled.`)
    return
}
console.log(`Run with:
	node down.js VideoCodeOnYoutube [name.mp4]

Then check ./download.mp4`);
