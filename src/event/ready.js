const eventReady = {
  ready: (client) => {
    console.log("eventReady - ready");
    client.on('ready', () => {
      console.log(`Logged in as ${client.user.tag}!`);
    });
  }
}

module.exports = eventReady