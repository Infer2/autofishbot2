async function clickButton(msg, btn, robot) {
	let target;
	if (!(target = void 0 === btn ? msg.components.flatMap(msg => msg.components).find(msg => 2 === msg.type && msg.custom_id && !msg.disabled) : "string" == typeof btn ? msg.components.flatMap(msg => msg.components).find(msg => 2 === msg.type && msg.custom_id === btn) : msg.components?.[btn.Y]?.components?.[btn.X])) throw Error("BUTTON_NOT_FOUND");
	if (!target.custom_id || target.disabled) throw Error("BUTTON_CANNOT_CLICK");
	let session = robot.shards.get(0).sessionID;
	if (!session) throw Error("SESSION_ID_NOT_AVAILABLE");
	let interaction = {
		type: 3,
		guild_id: msg.guildID || void 0,
		channel_id: msg.channel.id,
		message_id: msg.id,
		application_id: msg.author.id,
		session_id: session,
		data: {
			custom_id: target.custom_id,
			component_type: 2
		}
	};
	await robot.requestHandler.request("POST", "/interactions", !0, interaction), console.log(`Successfully clicked button: ${target.custom_id}`)
}
module.exports = clickButton;