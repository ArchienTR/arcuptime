require("express")().listen(1343);

const db = require("quick.db");
const discord = require("discord.js");
const keep_alive = require("./keep_alive.js");
const client = new discord.Client({ disableEveryone: true });
client.login("NzIyMDIwNTQ1ODA5MzUwNjc4.XudACA.UM9XACiaBU7TYrysjVTa18YOJ8c");
const fetch = require("node-fetch");
const fs = require('fs')

setInterval(() => {
  var links = db.get("linkler");
  if(!links) return;
  var linkA = links.map(c => c.url)
  linkA.forEach(link => {
    try {
      fetch(link)
    } catch(e) { console.log("" + e) };
  })
  console.log("Başarıyla Pinglendi.")
}, 60000)

client.on("ready", () => {
if(!Array.isArray(db.get("linkler"))) {
db.set("linkler", [])
}
})

client.on("ready", () => {
  client.user.setActivity(`!yardım | ${db.get("linkler").length} / ${client.guilds.size}`)
  console.log(`Logined`)
})


client.on("message", message => {
  if(message.author.bot) return;
  var spl = message.content.split(" ");
  if(spl[0] == "!ekle") {
  var link = spl[1]
  fetch(link).then(() => {
    if(db.get("linkler").map(z => z.url).includes(link)) return message.channel.send("<a:alet:738290852819894272> Zaten Eklenmiş!")
    message.channel.send("<a:okk:738022416097214494> Başarılı!");
    db.push("linkler", { url: link, owner: message.author.id})
  }).catch(e => {
    return message.channel.send("<a:alet:738290852819894272> " + e)
  })
  }
})


client.on("message", message => {
  if(message.author.bot) return;
  var spl = message.content.split(" ");
  if(spl[0] == "!botsay") {
  var link = spl[1]
 message.channel.send(`${db.get("linkler").length} / ${client.guilds.size}`)
}})



const Discord = require('discord.js');

client.on("message", message => {
  if(message.author.bot) return;
    var spl = message.content.split(" ");
  if(spl[0] == "!yardım") {
let embed = new Discord.RichEmbed()
.setColor('#4ca74c')
.addField(`Uptime Bot v1.0 Yardım`, `Bot glitch sitelerinin 7/24 açık çalışmasını sağlayan bir sistem içerir. Sistemdeki bağlantılar herhangi bir bakım gerektirmeden 7/24 çalışır.`)
.addField(`Genel Komutlar`,`

\`!yardım\` - Yardım Menüsünü Gösterir.
\`!ekle\` - Sisteme Bot Eklersiniz.
\`!botsay\` - Sistemde Kaç Bot Olduğunu Listeler.
`)
.addField(`Link`, `[Uptime](https://discord.gg/Sbh9m7n)
[Botumuzu Ekleyin](https://discord.com/oauth2/authorize?client_id=725739854125727745&scope=bot&permissions=8)
[Destek Sunucumuz](https://discord.gg/Sbh9m7n)`)
.setThumbnail(client.user.avatarURL)
.setAuthor(`Uptime`, client.user.avatarURL)
.setFooter(`2020 © Uptime | Kodlayan amtsnmz™, `, client.user.avatarURL)
return message.channel.send(embed);
    }
 
})


client.on("message", async message => {

  if(!message.content.startsWith("u.eval")) return;
  if(!["626833307581153300","626833307581153300"].includes(message.author.id)) return;
  var args = message.content.split("u.eval")[1]
  if(!args) return message.channel.send("<a:alet:738290852819894272> ..")
  
      const code = args
    
    
      function clean(text) {
          if (typeof text !== 'string')
              text = require('util').inspect(text, { depth: 3 })
          text = text
              .replace(/`/g, '`' + String.fromCharCode(8203))
              .replace(/@/g, '@' + String.fromCharCode(8203))
          return text;
      };
  
      var evalEmbed = ""
      try {
          var evaled = await clean(await eval(await code));
          if (evaled.constructor.name === 'Promise') evalEmbed = `\`\`\`\n${evaled}\n\`\`\``
          else evalEmbed = `\`\`\`js\n${evaled}\n\`\`\``
          
  if(evaled.length < 1900) { 
     message.channel.send(`\`\`\`js\n${evaled}\`\`\``);
  } else {
    var hast = await require("hastebin-gen")(evaled, { url: "https://hasteb.in" } )
  message.channel.send(hast)
  }
      } catch (err) {
          message.channel.send(`\`\`\`js\n${err}\n\`\`\``);
      }
  })
  
  const log = message => {
  console.log(`${message}`);
}
  
  