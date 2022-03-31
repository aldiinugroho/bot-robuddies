const validation = {
  ping: (msg) => {
    if (msg.content.toLowerCase() === 'ping') {
      msg.reply({
        content: `pong <@!${msg.author.id}>`
      })
    }
  },
  isBot: (msg) => {
    if (msg.author.bot) { 
      return true
    } else {
      return false
    }
  }
}

module.exports = validation