const {
  getPrefix
} = require('../common/checker')

const command = require('../command/commandMessage')

const eventDistube = {
  distube: (message,distube,config,voiceChannel,queue) => {
    console.log("eventDistube - distube");

    if (getPrefix(message,config).command === command.play.main || getPrefix(message,config).command === command.play.alias) {
      if (voiceChannel) {
        distube.play(voiceChannel, getPrefix(message,config).args.join(' '), {
          message,
          textChannel: message.channel,
          member: message.member,
        })
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
            `**${id+1}**. [${song.name}](${song.url}) - \`${song.formattedDuration}\``
          ).join("\n"));
        }
      } else {
        message.channel.send(
          'You must join a voice channel first.',
        )
      }
    }

    distube
      .on("playSong", (queue, song) => queue.textChannel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`
      ))
      .on("addSong", (queue, song) => queue.textChannel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}.`
      ))
      .on("addList", (queue, playlist) => queue.textChannel.send(
        `Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to the queue!`
      ))
      .on("error", (channel, error) => channel.send(
        "An error encountered: " + error
      ))
      .on('finish', (queue) => queue.textChannel?.send('Finish queue!'))
      .on('finishSong', queue =>
        queue.textChannel?.send('Finish song!'),
      )
      .on('disconnect', (queue) =>
        queue.textChannel?.send('Disconnected!'),
      )
      .on("empty", (queue) => queue.textChannel.send("Channel is empty. Leaving the channel"))
      .on("noRelated", (queue) => queue.textChannel.send("Can't find related video to play."))
      // DisTubeOptions.searchSongs > 1
      .on("searchResult", (message, results) => {
        message.channel.send(`**Choose an option from below**\n${
          results.map((song, i) => `**${i + 1}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")
        }\n*Enter anything else or wait 60 seconds to cancel*`);
      })
      .on("searchCancel", (message) => message.channel.send(`Searching canceled`))
      .on("searchInvalidAnswer", (message) => message.channel.send(`You answered an invalid number!`))
      .on("searchNoResult", (message, query) => message.channel.send(`No result found for ${query}!`))
      .on('searchDone', () => {})
  }
}

module.exports = eventDistube