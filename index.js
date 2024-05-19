import { Client, Intents, MessageEmbed } from "discord.js";
import axios from "axios";
import pkg from "string-similarity";
const { findBestMatch } = pkg;
const colors = {
    orange: 0xff5722,
};
import express from "express";
const app = express();
app.listen(3000, () => {
    console.log("Das Projekt läuft!");
})

app.get("/", (req, res) => {
    res.send("Hallo Welt!");
})

const arkApiUrl =
    "https://cdn2.arkdedicated.com/servers/asa/officialserverlist.json";

const definedServers = {
    "NA-PVP-TheIsland2322": "TPG",
    "NA-PVP-ScorchedEarth2223": "TPG",
    "NA-PVP-TheIsland2025": "TPG",
    "NA-PVP-TheIsland2125": "HCE",
    "NA-PVP-TheIsland2142": "B&G",
    "NA-PVP-TheIsland2143": "Boonk",
    "EU-PVP-TheIsland2148": "N3",
    "EU-PVP-TheIsland2156": "N1C",
    "EU-PVP-TheIsland2158": "DTF",
    "EU-PVP-TheIsland2162": "Cute",
    "EU-PVP-TheIsland2165": "Hydra",
    "NA-PVP-ScorchedEarth2195": "WLDD",
    "NA-PVP-TheIsland2209": "WLDD",
    "NA-PVP-ScorchedEarth2216": "B&G",
    "EU-PVP-ScorchedEarth2230": "N1C",
    "EU-PVP-ScorchedEarth2237": "N3",
    "EU-PVP-ScorchedEarth2243": "Boonk",
    "EU-PVP-ScorchedEarth2265": "Hydra",
    "OC-PVP-ScorchedEarth2276": "N1C",
    "OC-PVP-ScorchedEarth2298": "DTF",
    "EU-PVP-TheIsland2348": "WLDD",
    "NA-PVP-TheIsland2133": "The Fellas",
    "NA-PVP-TheIsland2010": "Blackout",
    "NA-PVP-ScorchedEarth2111": "Blackout",
    "NA-PVP-TheIsland2024": "DejaVu",
    "NA-PVP-ScorchedEarth2224": "DejaVu",
    "EU-PVP-TheIsland2149": "Gang Gang",
    "EU-PVP-ScorchedEarth2269": "Gang Gang",
    "EU-PVP-TheIsland2344": "CareBears (GG)",
    "EU-PVP-ScorchedEarth2242": "CareBears (GG)",
    "EU-PVP-TheIsland2345": "Boom Evil",
    "EU-PVP-TheIsland2150": "Good Comms",
    "NA-PVP-TheIsland2207": "Good Comms",
    "NA-PVP-TheIsland2316": "Good Comms",
    "EU-PVP-TheIsland2353": "Wiu Wiu",
    "EU-PVP-TheIsland2163": "NLDX",
    "EU-PVP-TheIsland2160": "NHF",
    "EU-PVP-TheIsland2159": "Panda",
    "EU-PVP-TheIsland2154": "ADAT",
    "NA-PVP-TheIsland2124": "Space Cowboys",
    "EU-PVP-TheIsland2152": "Space Cowboys",
    "EU-PVP-TheIsland2144": "NLDX",
    "NA-PVP-TheIsland2139": "Broken Bullet",
    "NA-PVP-TheIsland2121": "Chem B",
    "NA-PVP-TheIsland2120": "Pistole",
    "EU-PVP-TheIsland2056": "GoonPuff",
    "NA-PVP-TheIsland2129": "VOID",
    "NA-PVP-TheIsland2122": "FTG",
    "NA-PVP-ScorchedEarth2222": "AxK",
    "EU-PVP-TheIsland2345": "Boom Evil",
};

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

async function fetchServerData(serverNumber) {
    try {
        const response = await axios.get(arkApiUrl);
        const servers = response.data;

        let selectedServer = servers.find((server) =>
            server.SessionName.includes(serverNumber),
        );

        return selectedServer;
    } catch (error) {
        console.error("Error fetching server data:", error);
        throw error;
    }
}

function createServerEmbed(serverData, additionalInfo) {
    const embed = new MessageEmbed()
        .setColor(colors.orange)
        .setTitle(serverData.Name)
        .setDescription(
            `**Players**: ${serverData.NumPlayers} / ${serverData.MaxPlayers}\n**Day**: ${serverData.DayTime}\n**IP**: ${serverData.IP}:${serverData.Port}\n**Tribe**: ${additionalInfo ? additionalInfo : ""}`,
        )
        .setFooter({
            text: "<-- is the real Goat",
            iconURL:
                "https://cdn.discordapp.com/avatars/489117653810544653/82f3c6c3a7722bdee2720822a7be1b9a.png?size=1024'",
        })
        .setThumbnail(
            "https://cdn.discordapp.com/attachments/1233466355261505636/1233466462153347184/63bafc5728018450ae26af49_TPGNEWLOGO1.png?ex=66483969&is=6646e7e9&hm=806d3d70c7025e250679198c24339b3197fb31ab239890bd2d291136c09ca6db&",
        );

    return embed;
}

function createCombinedServerEmbed(serversData, definedServers, groupName) {
    const embed = new MessageEmbed()
        .setColor(colors.orange)
        .setTitle(`**__${groupName.toUpperCase()}__**`)
        .setFooter({
            text: "<-- is the real Goat",
            iconURL:
                "https://cdn.discordapp.com/avatars/489117653810544653/82f3c6c3a7722bdee2720822a7be1b9a.png?size=1024'",
        })
        .setThumbnail(
            "https://cdn.discordapp.com/attachments/1233466355261505636/1233466462153347184/63bafc5728018450ae26af49_TPGNEWLOGO1.png?ex=66483969&is=6646e7e9&hm=806d3d70c7025e250679198c24339b3197fb31ab239890bd2d291136c09ca6db&",
        );

    let totalOnlinePlayers = 0;

    serversData.forEach((serverData, index) => {
        const additionalInfo = definedServers[serverData.Name];
        const onlinePlayers = serverData.NumPlayers;
        totalOnlinePlayers += onlinePlayers;
        embed.addFields({
            name: serverData.Name,
            value: `**Players**: ${onlinePlayers} / ${serverData.MaxPlayers}\n**Day**: ${serverData.DayTime}\n**IP**: ${serverData.IP}:${serverData.Port}\n**Tribe**: ${additionalInfo ? additionalInfo : ""}`,
            inline: false,
        });

        if (index !== serversData.length - 1) {
            embed.addFields({ name: "\n", value: "\n" });
        }
    });

    embed.addFields(
        { name: "\n", value: "\n" },
        {
            name: "**Total Players**",
            value: totalOnlinePlayers.toString(),
            inline: false,
        },
    );

    return embed;
}



const serverGroups = {
    tpg: [
        "NA-PVP-TheIsland2322",
        "NA-PVP-TheIsland2025",
        "NA-PVP-ScorchedEarth2223",
    ],
    hydra: ["2165", "2265"],
    wldd: ["2195", "2209", "2348"],
    n1c: ["2156", "2230", "2276"],
    bng: ["2142", "2216"],
    boonk: ["2143", "2243"],
    n3: ["2148", "2237"],
    dtf: ["2158", "2298"],
    cute: ["2162"],
    hce: ["2125"],

    gangshit: [
        "NA-PVP-TheIsland2322",
        "NA-PVP-TheIsland2025",
        "NA-PVP-ScorchedEarth2223",
        "EU-PVP-TheIsland2165",
        "EU-PVP-ScorchedEarth2265",
        "NA-PVP-ScorchedEarth2195",
        "NA-PVP-TheIsland2209",
        "EU-PVP-TheIsland2348",
        "NA-PVP-TheIsland2142",
        "NA-PVP-ScorchedEarth2216",
        "NA-PVP-TheIsland2143",
        "EU-PVP-ScorchedEarth2243",
        "EU-PVP-TheIsland2148",
        "EU-PVP-ScorchedEarth2237",
        "EU-PVP-TheIsland2156",
        "EU-PVP-ScorchedEarth2230",
        "OC-PVP-ScorchedEarth2276",
        "EU-PVP-TheIsland2158",
        "OC-PVP-ScorchedEarth2298",
        "EU-PVP-TheIsland2162",
        "NA-PVP-TheIsland2125",
    ],

    blackout: ["2010", "2111"],
    thefellas: ["2133"],

    blackfellas: ["2133", "2010", "2111"],

    ganggang: ["2149", "2269"],
    carebears: ["2344", "2242"],
    boomevil: ["2345"],

    ggally: ["2149", "2344", "2269", "2242", "2345"],

    goodcomms: ["2150", "2207", "2316"],
    spacecowboys: ["2124", "2152"],
    chemb: ["2121"],
    void: ["2129"],
    ftg: ["2122"],

    bbc: ["2150", "2207", "2316", "2124", "2152", "2121", "2129", "2122"],
    panda: ["2159"],
    wiuwiu: ["2353"],
    nhf: ["2159", "2353"],
    pistole: ["2120"],
    dejavu: ["2024", "2224"],
    nldx: ["2163"],
    nhf: ["2160"],
    adat: ["2154"],
    nldx: ["2144"],
    brokenbullet: ["2139"],
    goonpuff: ["2056"],
    axk: ["2222"],
};

async function fetchServersDataForGroup(groupServers) {
    const serversData = [];
    for (const serverName of groupServers) {
        try {
            const selectedServer = await fetchServerData(serverName);
            if (selectedServer) {
                serversData.push(selectedServer);
            }
        } catch (error) {
            console.error(
                "Fehler beim Abrufen der Serverdaten für:",
                serverName,
                error,
            );
        }
    }
    return serversData;
}

client.on("messageCreate", async (message) => {
    if (message.author.bot || !message.content.startsWith("!")) return;

    const command = message.content.substring(1).toLowerCase();

    if (serverGroups[command]) {
        const groupServers = serverGroups[command];
        const serversData = await fetchServersDataForGroup(groupServers);
        const combinedEmbed = createCombinedServerEmbed(
            serversData,
            definedServers,
            command.toUpperCase(),
        );

        if (command === "gangshit") {
            const firstHalfFields = combinedEmbed.fields.slice(0, Math.ceil(combinedEmbed.fields.length / 2));
            const secondHalfFields = combinedEmbed.fields.slice(Math.ceil(combinedEmbed.fields.length / 2));

            const firstHalfEmbed = combinedEmbed.setFields(firstHalfFields);
            const secondHalfEmbed = new MessageEmbed()
                .setColor(colors.orange)
                .setTitle(`**__${command.toUpperCase()}__** *(2nd Part)*`)
                .addFields(secondHalfFields)
                .setFooter({
                    text: "<-- is the real Goat",
                    iconURL: "https://cdn.discordapp.com/avatars/489117653810544653/82f3c6c3a7722bdee2720822a7be1b9a.png?size=1024'",
                })
                .setThumbnail(
                    "https://cdn.discordapp.com/attachments/1233466355261505636/1233466462153347184/63bafc5728018450ae26af49_TPGNEWLOGO1.png?ex=66483969&is=6646e7e9&hm=806d3d70c7025e250679198c24339b3197fb31ab239890bd2d291136c09ca6db&",
                );

            await message.channel.send({ embeds: [firstHalfEmbed] });
            await message.channel.send({ embeds: [secondHalfEmbed] });
        } else {

            await message.channel.send({ embeds: [combinedEmbed] });
        }
    } else if (command === "list") {
        const groupNames = Object.keys(serverGroups);

        groupNames.splice(groupNames.indexOf("gangshit"), 0, "");
        groupNames.splice(groupNames.indexOf("blackout"), 0, "");
        groupNames.splice(groupNames.indexOf("thefellas") + 1, 0, "");
        groupNames.splice(groupNames.indexOf("blackfellas") + 1, 0, "");
        groupNames.splice(groupNames.indexOf("boomevil") + 1, 0, "");
        groupNames.splice(groupNames.indexOf("ggally") + 1, 0, "");
        groupNames.splice(groupNames.indexOf("bbc"), 0, "");
        groupNames.splice(groupNames.indexOf("bbc") + 1, 0, "");
        groupNames.splice(groupNames.indexOf("nhf"), 0, "");
        groupNames.splice(groupNames.indexOf("nhf") + 1, 0, "");

        const embed = new MessageEmbed()
            .setColor(colors.orange)
            .setTitle("**__Tribes & Alliances__**".toUpperCase())
            .setDescription(
                groupNames
                    .map((group) =>
                        group
                            ? `${getEmojiForGroup(group)} **${group.toUpperCase()}**`
                            : "",
                    )
                    .join("\n"),
            )
            .setFooter({
                text: "<-- is the real Goat",
                iconURL: "https://cdn.discordapp.com/avatars/489117653810544653/82f3c6c3a7722bdee2720822a7be1b9a.png?size=1024'",
            })
            .setThumbnail(
                "https://cdn.discordapp.com/attachments/1233466355261505636/1233466462153347184/63bafc5728018450ae26af49_TPGNEWLOGO1.png?ex=66483969&is=6646e7e9&hm=806d3d70c7025e250679198c24339b3197fb31ab239890bd2d291136c09ca6db&",
            );

        await message.channel.send({ embeds: [embed] });
    } else {
        const serverNumberMatch = command.match(/\d+/);
        const serverNumber = serverNumberMatch ? serverNumberMatch[0] : null;

        if (serverNumber) {
            try {
                const selectedServer = await fetchServerData(serverNumber);
                if (selectedServer) {
                    const tribeName = definedServers[selectedServer.Name];
                    const embed = createServerEmbed(selectedServer, tribeName);
                    await message.channel.send({ embeds: [embed] });
                } else {
                    message.channel.send("Server not found.");
                }
            } catch (error) {
                console.error("Fehler beim Abrufen der Serverdaten:", error);
                message.channel.send(
                    `${message.author} there was an error retrieving the server data.`,
                );
            }
        } else {
            message.channel.send(
                `<@${message.author.id}> is too retarded to use the bot :wheelchair:`,
            );
        }
    }
});

client.on("messageCreate", (message) => {
    if (message.mentions.has(client.user)) {
        message.channel.send(
            `<@${message.author.id}> stop pinging me you :monkey:`,
        );
    }
});

function getEmojiForGroup(group) {
    switch (group.toLowerCase()) {
        case "tpg":
            return ":trophy:";
        case "gangshit":
        case "blackfellas":
        case "ggally":
        case "bbc":
        case "nhf":
            return ":loudspeaker:";
        default:
            return ":shield:";
    }
}

client.login(process.env.token);
