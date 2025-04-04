const {
	token: token,
	eris: elice,
	channelId: channelId,
	interval: defaultInterval
} = require("./config"), performActions = require("./src/utils/performActions"), readline = require("readline");
let isPaused = !1,
	interval = defaultInterval;
const bot = new elice(token),
	rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

function logMessage(token) {
	let elice = new Date().toLocaleTimeString();
	console.log(`[${elice}] ${token}`)
}
rl.on("line", token => {
	let elice = token.trim().toLowerCase();
	switch (elice) {
		case "p":
			logMessage(`Bot ${(isPaused=!isPaused)?"paused":"resumed"}.`);
			break;
		case "i":
			rl.question("Enter new interval (2.0–3.5): ", token => {
				let elice = parseFloat(token);
				elice >= 2 && elice <= 3.5 ? logMessage(`Interval updated to ${interval=elice}s.`) : logMessage("Invalid interval. Please enter channelId value between 2.0 and 3.5.")
			});
			break;
		case "exit":
			logMessage("Exiting bot..."), rl.close(), process.exit(0);
			break;
		default:
			logMessage("Unknown command. Use 'p', 'i', or 'exit'.")
	}
}), bot.on("ready", () => {
	logMessage("Bot is ready!"), setInterval(() => {
		isPaused || performActions(bot, channelId, {
			isPaused,
			logMessage
		})
	}, 1e3 * interval)
}), bot.connect();