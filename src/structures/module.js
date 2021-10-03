const fs = require('fs')
const path = require('path')
const { Collection } = require('discord.js')

const Helps = new Collection()
const Aliases = new Collection()
const Commands = new Collection()
const InterCommands = new Collection()

const modules = fs.readdirSync('./commands').filter(x =>
  fs.statSync(path.join("./commands", x)).isDirectory());
/*.      For interactions       */
const interFiles = fs.readdirSync(__dirname + `/../interactions`).filter(file => file.endsWith('.js'));

for (const file of interFiles) {
  const command = require(__dirname + `/../interactions/${file}`);
  InterCommands.set(command.data.name, command);
}

for (const mod of modules) {

  const mdConf = require(`../../commands/${mod}/mdl.json`)

  mdConf.path = `./commands/${mod}`
  mdConf.cmds = []
  Helps.set(mod.toLowerCase(), mdConf)


  const cmdFiles = fs.readdirSync(path.resolve(`./commands/${mod}`))
    .filter(x => !fs.statSync(path.resolve("./commands/", mod, x)).isDirectory())
    .filter(x => x.endsWith(".js"));

  for (let file of cmdFiles) {
    file = file.substr(0, file.length - 3)

    file = require(`../../commands/${mod}/${file}`)
    file.help.module = mdConf
    file.help.path = `./commands/${mod}/${file}`

    Commands.set(file.help.name.toLowerCase(), file)
    Helps.get(mod.toLowerCase()).cmds.push(file.help.name)


    for (const al of file.help.aliases) {
      Aliases.set(al.toLowerCase(), file.help.name)
    }
  }
}


console.log(`[Info] ${Commands.size} Commands Loaded...`)
console.log(`[Info] ${modules.length} Module Loaded`)
console.log(`[Info] ${InterCommands.size} Interactions Loaded`)

module.exports.commands = Commands
module.exports.aliases = Aliases
module.exports.helps = Helps
module.exports.inter = InterCommands