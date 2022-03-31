const eventError = {
  error: (client) => {
    console.log("eventError - error");
    client.on("error", (error, message) => {
      switch (error) {
        // case 'NotPlaying':
        // message.channel.send('Ga ada lagu yang ke play ngapain di stop?')
        // break;
        case "NotConnected":
          message.channel.send("*`Not connected`*");
          break;
        case "UnableToJoin":
          message.channel.send("*`Unable to join`*");
          break;
        case "LiveVideo":
          message.channel.send("*`Cannot play youtube live`*");
          break;
        default:
          message.channel.send(`*\`Something when wrong ${error}*\``)
      }
    });
  }
}

module.exports = eventError