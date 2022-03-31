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

// // 1.
// client.player
// .on('trackStart', (message, track) => {
//   message.channel.send(`\**Playing** __**[${track.title}]**__ **- request from** __**[${message.author}]**__`)
// })
// .on('trackAdd', (message, queue, track) => {
//   message.channel.send(`**${track.title} added!**`)
// })
// .on('queueEnd', (message, queue) => {
//   message.channel.send('no song..')
// })

// client.on("ready", () => {
//   console.log(`logged`);
//   client.user.setActivity(cmd.info, { type: "PLAYING" });
// });

// // 2.
// client.on("message", async msg => {
//   if(msg.author.bot) { return; }

//   if (msg.content === cmd.ava) {
//     msg.reply(msg.author.displayAvatarURL());
//   }

//   ////////// EMBED COMMAND //////////
//   if (msg.content === cmd.info) {
//     const { MessageEmbed } = require("discord.js");
//     const embed = new MessageEmbed()
//       // .setTitle("About Me!")
//       .setColor(0x4b0082)
//       // .setDescription("__***Music Command!***__ \n `k!play, k!pause, k!resume, k!skip, k!stop, k!volume, k!queue.` \n \n __***Action Command!***__ \n `k!kiss, k!hug, k!slap, k!dance, [Coming Soon..]` \n \n __***Fun Command!***__ \n `k!love, [Coming Soon..]`")
//       // .setThumbnail("https://pbs.twimg.com/media/Ek9A7ZJXgAEFduC.jpg")
//       // .setImage("https://media.giphy.com/media/WcTbVcePsxgfepA59k/giphy.gif")
//       .setFooter("Developed by mr.max say hello.");
//     msg.channel.send(embed);
//   }

//   ////////// MUSIC COMMAND //////////
//   const prefix = "";

//   const args = msg.content
//     .slice(prefix.length)
//     .trim()
//     .split(/ +/g);
//   const command = args.shift().toLowerCase();
//   // console.log(args)
//   if (command === cmd.play || command === cmd.p) {
//     const mymusic = msg.content.substring(command.length, msg.content.lenght);
//     msg.channel.send(
//       `**Adding [ ${mymusic} ] **`
//     );
    
//     if (mymusic.includes("open.spotify.com/playlist")) {
//       try{
//         const testPlaylist = (url_pass) => {
//           const getData = async (url_pass_2) => {
//               const PLAYLIST_URL = url_pass_2
//               const dataPlaylist = await getTracks(PLAYLIST_URL)
//               // var fixedPlaylist = await dataPlaylist[0].
//               // console.log(dataPlaylist.name)
//               // console.log("===============")
//               // console.log(dataPlaylist[0].external_urls.spotify)
//               for(var i = 0; i < dataPlaylist.length; i++){
//                 // console.log(dataPlaylist[i].external_urls.spotify)
//                 // await msg.channel.send(`playing ${dataPlaylist[i].name}`);
//                 await client.player.play(msg, dataPlaylist[i].external_urls.spotify, msg.member.user.tag)
//               }
//             }
//             getData(url_pass)
//         }
//         testPlaylist(msg.content)
//       }catch(err){
//         msg.channel.send("maybe try another link.")
//       }
//     } else {
//       try {
//         await client.player.play(msg, mymusic, msg.member.user.tag);
//       } catch (err) {
//         console.log("error");
//       }
//     }
//   }
  
//   const { skip } = require("discord.js")
//   if (msg.content === cmd.skip) {
//     const embed1 = new MessageEmbed()
//       .setTitle("Next song!")
//       // .setColor(0x4b0082)
//       // .setDescription(
//       //   `Yang skip si ${msg.author}`)
//       // .setThumbnail("https://media.giphy.com/media/Vc5SIQPI8ZEwRqTTN7/giphy.gif")
//       // .setFooter("Ketik k!info untuk command yang lain.");
//     msg.channel.send(embed1);
//     await client.player.skip(msg)
//   }
  
//   const { pause } = require("discord.js")
//   if (msg.content === cmd.pause) {
//     const embed2 = new MessageEmbed()
//       .setTitle("Song paused!")
//       // .setColor(0x4b0082)
//       // .setDescription(
//       //   `Yang pause si ${msg.author}`
//       //                 )
//       // .setThumbnail("https://media.giphy.com/media/U2GN6Az5BVoj4T6m0a/giphy.gif")
//       // .setFooter("Ketik k!info untuk command yang lain.");
//     msg.channel.send(embed2);
//     await client.player.pause(msg)
//   }
  
//   const { resume } = require("discord.js")
//   if (command === cmd.resume) {
//     const embed3 = new MessageEmbed()
//     .setTitle("Song resume!")
//     // .setColor(0x4b0082)
//     // .setDescription(
//     //   `Yang lanjutin si ${msg.author}`
//     //                 )
//     // .setThumbnail("https://media.giphy.com/media/MB31fRtwqzyE7zfdwJ/giphy.gif")
//     // .setFooter("Ketik k!info untuk command yang lain.");
//     msg.channel.send(embed3);
//     await client.player.resume(msg);
//   }
  
//   const { volume } = require("discord.js")
//   if (command === cmd.volume|| command === cmd.vol) {
//     const vol = msg.content.substring(command.length, msg.content.lenght);
//     const embed4 = new MessageEmbed()
//     .setTitle("Volume changed!")
//     // .setColor(0x4b0082)
//     // .setDescription(
//     //   `Yang ubah si ${msg.author}`
//     //                 )
//     // .setThumbnail("https://media.giphy.com/media/pe2vPpvTcUF0UrLp9R/giphy.gif")
//     // .setFooter("Ketik k!info untuk command yang lain.");
//     msg.channel.send(embed4);
//     await client.player.setVolume(msg, parseInt(vol));
//   }

//   const { stop } = require("discord.js")
//   if (command === cmd.stop || command === cmd.s) {
//     const embed5 = new MessageEmbed()
//     .setTitle("Song stoped!")
//     // .setColor(0x4b0082)
//     // .setDescription("udahan dulu ya, abang-abangnya mau pulang..")
//     // .setThumbnail("https://media.giphy.com/media/MBTl5FKAmwwoBwTQjk/giphy.gif")
//     // .setFooter("Ketik k!info untuk command yang lain.");
//     msg.channel.send(embed5);
//     await client.player.stop(msg);
//   }

//   if (command === cmd.queue || command === cmd.q){
//     const myQueue = async () => {
//       try{
//         const dataQueue = await client.player.getQueue(msg).tracks
      
//         if (dataQueue === "") msg.channel.send("wait.")
//         for(var i = 0; i < dataQueue.length; i++){
//           console.log(dataQueue[i].title)
//           if (i === 0) {
//             msg.channel.send(`\`\`\`Playing [${dataQueue[i].title}]\`\`\``)
//           } else {
//             msg.channel.send(`\`\`\`${i+1}. ${dataQueue[i].title}\`\`\``)
//           }

//         }
//         } catch(err){
//         msg.channel.send('No songs to play.')
//       }
//     }
//     myQueue()
//   }
// });

// client.player
//   // Error handling
//   .on("error", (error, message) => {
//     switch (error) {
//       // case 'NotPlaying':
//       // message.channel.send('Ga ada lagu yang ke play ngapain di stop?')
//       // break;
//       case "NotConnected":
//         message.channel.send("*`Not connected`*");
//         break;
//       case "UnableToJoin":
//         message.channel.send("*`Unable to join`*");
//         break;
//       case "LiveVideo":
//         message.channel.send("*`Cannot play youtube live`*");
//         break;
//       default:
//         message.channel.send(`*\`Something when wrong ${error}*\``)
//     }
//   });

// client.login(process.env.SECRET);