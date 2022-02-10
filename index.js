const Discord = require("discord.js");
//const config = require("./config.json");
const https = require('https');

const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});
console.log(client.channels.cache.valueOf());
console.log(client.user);

update();

function run(){
    setTimeout(d=>{
        update();
        //console.log(client.guilds.cache.at(0).me.setNickname("WORK!!!"))//.guild.me.setNickname("hjdjsh"))//members.cache.at(0).user.setNickname("work!!!"));
    },10000)
}

 async function update(){
    //console.log(client.user);
    let url = "https://wax.alcor.exchange/api/markets/35";
    //console.log(voiceChannel);
    var name = "";

    await https.get(url,(res) => {
        let body = "";
    
        res.on("data", (chunk) => {
            body += chunk;
        });
    
        res.on("end", () => {
            try {
                let json = JSON.parse(body);
                name = json.last_price;
                if(client.guilds.cache.size>0){
                    client.guilds.cache.at(0).me.setNickname("VOID: $"+name.toString())
                }
                
            } catch (error) {
                console.log("error:");
                console.error(error.message);
            };
        });
    
    }).on("error", (error) => {
        console.error(error.message);
    });
    run();
}

client.on('message', message => {
    if (message.content.includes('changeNick')) {
        message.guild.me.setNickname(message.content.replace('changeNick ', ''));
    }
});

client.login(process.env.token);