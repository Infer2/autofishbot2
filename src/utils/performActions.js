const crypto = require("crypto"),
	clickButton = require("./clickButton");
async function performActions(robot, channelId, state) {
	let {
		isPaused: n,
		logMessage: i
	} = state;
	try {
		let messages = await robot.getMessages(channelId, 2);
		if (!messages || 0 === messages.length) {
			i(`[${new Date().toLocaleTimeString()}] No messages in this channel.`);
			return
		}
		let target = null;
		if (messages[0]) {
			let m = messages[0].embeds?.some(robot => "Anti-Bot" === robot.title);
			if (m) {
				i(`[${new Date().toLocaleTimeString()}] Anti-Bot detected! Stopping all actions...`);
				return
			}
			let a = messages[0].components?.some(robot => robot.components?.some(robot => 2 === robot.type));
			a && (target = messages[0])
		}
		if (!target && messages[1]) {
			let l = messages[1].embeds?.some(robot => "Anti-Bot" === robot.title);
			if (l) {
				i(`[${new Date().toLocaleTimeString()}] Anti-Bot detected in the second last message! Stopping all actions...`);
				return
			}
			let r = messages[1].components?.some(robot => robot.components?.some(robot => 2 === robot.type));
			r && (target = messages[1])
		}
		if (!target) {
			i(`[${new Date().toLocaleTimeString()}] No button found in the last two messages.`);
			return
		}
		if (!n) {
			let p = crypto.randomInt(84, 270);
			i(`[${new Date().toLocaleTimeString()}] Adding a delay of ${p}ms to mimic human behavior...`), await new Promise(robot => setTimeout(robot, p)), new Date().toLocaleTimeString(), target.components[0]?.components[0]?.custom_id, await clickButton(target, {
				X: 0,
				Y: 0
			}, robot)
		}
	} catch (g) {
		i(`[${new Date().toLocaleTimeString()}] Error performing actions: ${g.message}`)
	}
}
module.exports = performActions;