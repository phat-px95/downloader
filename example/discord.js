// Install discord.js, ffmpeg, node-opus and ytdl-core before running this!
const { Client } = require('discord.js');
const ytdl = require('ytdl-core');

const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
const clientToken = ' Y o u r   B o t   T o k e n ';

const client = new Client();

client.on('ready', () => {
  console.log('discord.js client ready');
});

client.on('message', message => {
  if (!message.content.startsWith('++play')) return;

  console.log('Got a song request!');
  const voiceChannel = message.member.voiceChannel;
  if (!voiceChannel) {
    message.reply('Please be in a voice channel first!');
    return;
  }
  voiceChannel.join()
    .then(connection => {
      const stream = ytdl(url, { filter: 'audioonly' });
      const dispatcher = connection.playStream(stream);
      dispatcher.on('end', () => {
        voiceChannel.leave();
      });
    });
});

client.login(clientToken);
