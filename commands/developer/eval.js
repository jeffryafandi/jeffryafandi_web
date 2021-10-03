const { MessageEmbed } = require("discord.js");
const axios = require("axios");
module.exports.run = async (client, msg, args) => {
// const Ractyl = require("ractyl-beta").default;
// const ptero = new Ractyl(client.config.panel, process.env.APIKEY);
  /* eslint-disable no-eval, no-unused-vars */
  if (!client.config.env.owner_id.includes(msg.author.id)) {
    return msg.reply("you do not have permission to use this command!");
  }
  const bot = client;
  const message = msg;
  let bin_web = client.config.hastebin,
    code = args.join(" ")
  if (msg.content.endsWith("--async")) code = `x(); async function x(){${args.join(" ").replace(/--async/gi, "")}}`;
  try {
    if (!args.length) {
      throw new TypeError(
        "Eval command cannot execute without input!. You bbbaka..."
      );
    }
    let depth = 0;
    let { evaled, type } = await parseEval(
      eval(code)
    ); /* eslint-disable-line */
    if (typeof evaled !== "string")
      evaled = require("util").inspect(evaled, { depth });
    evaled = evaled.replace(/`/g, `\`${String.fromCharCode(8203)}`).replace(/@/g, `@${String.fromCharCode(8203)}`);
    let eva = evaled;
    if (evaled.length > 2020) {
      const x = await axios.post(`https://haste.zann.my.id/documents`, evaled);
      eva = `${bin_web}/${x.data.key}.js`;
    } else eva = `\`\`\`js\n${eva} \`\`\``;
    msg.reply(`\`\`\`js\n${type}\`\`\`\n${eva}`)
  } catch (e) {
    let ee = e;
    if (e.length > 2020) {
      const x = await axios.post(`https://haste.zann.my.id/documents`, ee);
      evaled = `${bin_web}/${x.data.key}.js`;
    } else ee = `\`\`\`js\n${ee}\`\`\``;
    msg.reply(ee)
  }

  async function ex(isi) {
    const { exec } = require("child_process");
    exec(isi, (error, stdoute, stderr) => {

      if (error) {
        return error
      } else if (stderr) {
        return stderr
      } else if (stdoute) {
        return stdoute
      }
    });
  }

  async function parseEval(input) {
    const isPromise =
      input instanceof Promise &&
      typeof input.then === "function" &&
      typeof input.catch === "function";
    if (isPromise) {
      input = await input;
      return {
        evaled: input,
        type: `Promise<${parseType(input)}>`
      };
    }
    return {
      evaled: input,
      type: parseType(input)
    };
  }

  function parseType(input) {
    if (input instanceof Buffer) {
      let length = Math.round(input.length / 1024 / 1024);
      let ic = "MB";
      if (!length) {
        length = Math.round(input.length / 1024);
        ic = "KB";
      }
      if (!length) {
        length = Math.round(input.length);
        ic = "Bytes";
      }
      return `Buffer (${length} ${ic})`;
    }
    return input === null || input === undefined ?
      "Void" :
      input.constructor.name;
  }

  function parseQuery(queries) {
    const args = [];
    const flags = [];
    for (const query of queries) {
      if (query.startsWith("--")) flags.push(query.slice(2).toLowerCase());
      else args.push(query);
    }
    return { args, flags };
  }
}
module.exports.help = {
  name: "eval",
  aliases: ["ev"]
};