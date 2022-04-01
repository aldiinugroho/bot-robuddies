const {
  getPrefix
} = require('../common/checker')

const command = require('../command/commandMessage')

const eventMusicPlayer = {
  musicPlayer: (message,distube,config,voiceChannel,queue) => {
    console.log("eventDistube - distube");

    if (getPrefix(message,config).command === command.play.main || getPrefix(message,config).command === command.play.alias) {
      if (voiceChannel) {
        distube.play(voiceChannel, getPrefix(message,config).args.join(' '), {
          message,
          textChannel: message.channel,
          member: message.member,
        })
        if (!queue) {
          message.channel.send(
            'Playing the music!',
          )
        } else {
          message.channel.send(
            'Adding the music!',
          )
        }
      } else {
        message.channel.send(
          'You must join a voice channel first.',
        )
      }
    }

    if (getPrefix(message,config).command === command.stop.main || getPrefix(message,config).command === command.stop.alias) {
      if (voiceChannel) {
        if (!queue) {
          message.channel.send('Nothing playing right now!')
        } else {
          distube.stop(message)
          message.channel.send('Stopped the music!')
        }
      } else {
        message.channel.send(
          'You must join a voice channel first.',
        )
      }
    }

    if (getPrefix(message,config).command === command.leave.main || getPrefix(message,config).command === command.leave.alias) {
      if (voiceChannel) {
        distube.voices.get(message)?.leave()
        message.channel.send('Leaved the voice channel!')
      } else {
        message.channel.send(
          'You must join a voice channel first.',
        )
      }
    }

    if (getPrefix(message,config).command === command.skip.main || getPrefix(message,config).command === command.skip.alias) {
      if (voiceChannel) {
        if (!queue) {
          message.channel.send('No music in the queue!')
        } else {
          distube.skip(message)
          message.channel.send('Skipped the music!')
        }
      } else {
        message.channel.send(
          'You must join a voice channel first.',
        )
      }
    }

    if (getPrefix(message,config).command === command.queue.main || getPrefix(message,config).command === command.queue.alias) {
      if (voiceChannel) {
        if (!queue) {
          message.channel.send('No music in the queue!')
        } else {
          message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
            `**${id+1}**. [${song.name}] - \`${song.formattedDuration}\``
          ).join("\n"));
        }
      } else {
        message.channel.send(
          'You must join a voice channel first.',
        )
      }
    }
  }
}

module.exports = eventMusicPlayer