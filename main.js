const {
    Client: Client
} = require("discord.js-infer"), fs = require("fs"), path = require("path"), crypto = require("crypto");

function getConfig() {
    try {
        const e = path.join(__dirname, "config.json"),
            n = fs.readFileSync(e, "utf8");
        let o = JSON.parse(n);
        if ("string" != typeof o.channelId || 19 !== o.channelId.length) throw new Error("Invalid channelId.");
        if ("string" != typeof o.token || 72 !== o.token.length) throw new Error("Invalid token.");
        if ("number" != typeof o.cooldown || o.cooldown < 2 || o.cooldown > 3.5) throw new Error("Invalid cooldown. It must be between 2.0 and 3.5 seconds.");
        return o
    } catch (e) {
        console.error("Error loading or validating config:", e), process.exit(1)
    }
}
const config = getConfig(),
    client = new Client;
let retryInterval = null;
client.on("ready", (async () => {
    console.log(`${client.user.username} is ready`);
    const e = parseFloat(config.cooldown),
        n = e + .076,
        o = e + .231,
        t = crypto.randomBytes(1)[0] / 255,
        r = setInterval((async function() {
            try {
                const e = config.channelId,
                    n = await client.channels.fetch(e).catch(console.error);
                if (!n.isText()) return void console.error("Target channel is not a text channel.");
                let o = await n.messages.fetch({
                    limit: 1
                }).then((e => e.last())).catch(console.error);
                if (!o.components.length) return void console.error("The fetched message does not contain a button.");
                await o.clickButton({
                    X: 0,
                    Y: 0
                }).catch(console.error)
            } catch (e) {
                console.error("Error while handling button click:", e)
            }
        }), 1e3 * (n + t * (o - n)));
    client.once("shutdown", (() => {
        clearInterval(r), clearInterval(retryInterval)
    }))
})), client.login(config.token);