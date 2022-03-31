const command = require('../command/commandMessage')

const {
getPrefix
} = require('../common/checker')

const eventCustom = {
  custom: (message,config) => {
    console.log("eventCustom - custom");
    console.log(message);
    if (message.content === 'hi') {
      message.channel.send(
      '😛'
      )
    }

    if (message.content.toLowerCase().includes("good morning") || message.content.toLowerCase().includes("morning")) {
      if (message.author.id === command.custom.kaz) {
        message.channel.send(
          'good morning to kaz, and kaz only 😄'
        )
      } else {
        message.channel.send(
          'you\'re not kaz : P'
        )
      }
    }

    if (getPrefix(message,config).command === command.info.main || getPrefix(message,config).command === command.info.alias) {
      message.channel.send(
        '\`\`\`command:\nplay alias p\nstop alias s\nleave alias l\nskip alias sk\nqueue alias q\ninfo alias i\`\`\`'
      )
    }
  }
}

module.exports = eventCustom