require('custom-env').env()

const { 
  Client, 
  Intents
} = require('discord.js')

const {
  ready,
  error,
  messageCreate
} = require('./src/event')

const client = new Client({ intents: [
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_VOICE_STATES
] })

const config = require('./config')

const DisTube = require('distube')
const { SpotifyPlugin } = require("@distube/spotify")
const distube = new DisTube.default(client, {
  plugins: [new SpotifyPlugin({
    parallel: true,
    emitEventsAfterFetching: false,
    api: {
      clientId: config.spotifyclientid,
      clientSecret: config.spotifyclientsecret,
    },
  })],
  searchSongs: 5,
  searchCooldown: 30,
  leaveOnEmpty: false,
  leaveOnFinish: false,
  leaveOnStop: false,
});

ready.ready(client)
messageCreate.messageCreate(client,distube,config)
error.error(client)

client.login(config.token)