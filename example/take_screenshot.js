const bin = require('ffmpeg-static').path;
const execFile = require('child_process').execFile;
const ytdl = require('..');

const takeScreenshot = (url, outFile, position) => new Promise((resolve, reject) => {
  ytdl.getInfo(url).then(info => {
    const format = ytdl.chooseFormat(info.formats, { quality: 'highestvideo' });
    const args = ['-i', format.url, '-frames:v', '1', '-an', '-y', outFile];
    if (!format.live && position) args.splice(0, 0, '-ss', position);
    execFile(bin, args, (error, stdout, stderr) => {
      if (error) {
        error.stdout = stdout;
        error.stderr = stderr;
        return reject(error);
      }
      return resolve(outFile);
    });
  }).catch(reject);
});

// Usage:
// takeScreenshot('https://www.youtube.com/watch?v=livestream', 'stream.png')
//   .then(() => console.log('finished screenshot stream'))
//   .catch(console.error);
takeScreenshot('https://www.youtube.com/watch?v=aQCRzMx7T3M', 'video.png', '4:20')
  .then(() => console.log('finished screenshot video'))
  .catch(console.error);
