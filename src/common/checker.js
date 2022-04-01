const checker = {
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