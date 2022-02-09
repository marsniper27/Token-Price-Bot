const Discord = require("discord.js");
const config = require("./config.json");
const https = require('https');

const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});
console.log(client.channels.cache.valueOf());

update();

function run(){
    setTimeout(d=>{
        update();
    },60000)
}

 async function update(){
    let url = "https://wax.alcor.exchange/api/markets/35";
    let voiceChannel = await client.channels.fetch("940793567180370020");
    console.log(voiceChannel);
    var name = "";

    await https.get(url,(res) => {
        let body = "";
    
        res.on("data", (chunk) => {
            body += chunk;
        });
    
        res.on("end", () => {
            try {
                let json = JSON.parse(body);
                console.log(json)
                name = json.last_price;
                console.log(name)
                if(voiceChannel != null){
                    voiceChannel.setName("VOID: $"+name.toString())
                }
            } catch (error) {
                console.error(error.message);
            };
        });
    
    }).on("error", (error) => {
        console.error(error.message);
    });
    run();
}

client.login(config.BOT_TOKEN);