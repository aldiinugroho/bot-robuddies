const validation = require('../validation/validationMessage')
const command = require('../command/commandMessage')
const disTubePlayer = require('./distube');
const {
  isBot,
  isInside,
  checkPrefix
} = require('../common/checker')
const {
  custom
} = require('./custom')

const eventMessageCreate = {
  messageCreate: (client,distube,config) => {
    console.log("eventMessageCreate - messageCreate");
    client.on('messageCreate', async message => {
      if (!isBot(message)) {
        custom(message,config)
      }

      if (isBot(message) || !isInside(message) || !checkPrefix(message,config)) {
        return
      } else {
        const voiceChannel = message.member?.voice?.channel
        const queue = distube.getQueue(message)
        disTubePlayer.distube(message,distube,config,voiceChannel,queue)
        // command.play(msg,distube)
        // command.stop(msg,distube)
        validation.ping(message)
      }
    });
  }
}

module.exports = eventMessageCreate