const checker = {
  isRequesterJoinChannel: (msg) => {
    if (msg.member.voice.channel == null) {
      msg.reply({
        content: `Please join the channel then make a request for the song <@!${msg.author.id}>`
      })
      return false
    } else {
      return true
    }
  },
  isMatchCmd: (msg,cmd) => {
    if (msg.slice(0,cmd.length) === cmd) {
      return true
      // if (msg[cmd.length] === ' ') {
      //   return true
      // } else {
      //   return false
      // }
    } else {
      return false
    }
  },
  getPrefix: (message,config) => {
    const args = message.content
      .slice(config.prefix.length)
      .trim()
      .split(/ +/g)
    const command = args.shift()
    return {command: command, args: args}
  },
  isBot: (message) => {
    if (message.author.bot) {
      return true
    } else {
      return false
    }
  },
  isInside: (message) => {
    if (message.inGuild()) {
      return true
    } else {
      return false
    }
  },
  checkPrefix: (message,config) => {
    if (message.content.startsWith(config.prefix)) {
      return true
    } else {
      return false
    }
  }
}

module.exports = checker