const Discord = require("discord.js");
const config = require("./config.json");
const https = require('https');
const http = require('http');

const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});
//console.log(client.channels.cache.valueOf());
//console.log(client.user);
    var name = "";
    var waxUSD = 0;
    var oldPrice = 0;

update();

function run(){
    setTimeout(d=>{
        update();
        //console.log(client.guilds.cache.at(0).me.setNickname("WORK!!!"))//.guild.me.setNickname("hjdjsh"))//members.cache.at(0).user.setNickname("work!!!"));
    },5000)
}

 async function update(){
    //console.log(client.user);
    let urlVoid = "https://wax.alcor.exchange/api/markets/35";
    let urlWax = "https://wax.alcor.exchange/api/markets/39";
    let url = "http://ste.artixun.com/void-to-usd/1";
    //console.log(voiceChannel);

    await http.get(url,(res) => {
        let body = "";
    
        res.on("data", (chunk) => {
            body += chunk;
        });
    
        res.on("end", () => {
            try {
                let index = body.split(">");
                index = index[152].split(" ");
                index = index[3].split("<");
                index = index[0];
                price = parseFloat(index)
                console.log(price)
                
                if(client.guilds.cache.size>0 && oldPrice != price){
                    for(var x = 0; x<client.guilds.cache.size;x++){
                        client.guilds.cache.at(x).me.setNickname("VOID: $"+price.toString())
                    }
                    oldPrice = price;
                }
                
            } catch (error) {
                console.log("error:");
                console.error(error.message);
            };
        });
    
    }).on("error", (error) => {
        console.error(error.message);
    });

    // await https.get(urlWax,(res) => {
    //     let body = "";
    
    //     res.on("data", (chunk) => {
    //         body += chunk;
    //     });
    
    //     res.on("end", () => {
    //         try {
    //             let json = JSON.parse(body);
    //             waxUSD = json.last_price;
                
    //         } catch (error) {
    //             console.log("error:");
    //             console.error(error.message);
    //         };
    //     });
    
    // }).on("error", (error) => {
    //     console.error(error.message);
    // });

    // await https.get(urlVoid,(res) => {
    //     let body = "";
    
    //     res.on("data", (chunk) => {
    //         body += chunk;
    //     });
    
    //     res.on("end", () => {
    //         try {
    //             let json = JSON.parse(body);
    //             name = json.last_price;
    //             name = name*waxUSD;
    //             if(client.guilds.cache.size>0){
    //                 for(var x = 0; x<client.guilds.cache.size;x++){
    //                     client.guilds.cache.at(x).me.setNickname("VOID: $"+name.toString())
    //                 }
    //             }
                
    //         } catch (error) {
    //             console.log("error:");
    //             console.error(error.message);
    //         };
    //     });
    
    // }).on("error", (error) => {
    //     console.error(error.message);
    // });
    run();
}

client.on('message', message => {
    if (message.content.includes('changeNick')) {
        message.guild.me.setNickname(message.content.replace('changeNick ', ''));
    }
});

client.login(config.BOT_TOKEN);