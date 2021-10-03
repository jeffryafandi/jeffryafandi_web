const { readdirSync } = require('fs')

module.exports = client => {
  const event = readdirSync('./src/events')
  for (const evt of event) {
    const file = require(`../events/${evt}`)
    client.on(evt.split(".")[0], (...args) => file(client, ...args));
  }
}