import fetch from "node-fetch";
import FormData from "form-data";

let handler = async (m, { conn, usedPrefix, command }) => {
	switch (command) {
		case "play":
			{
				if (!text) throw ("What song do you want to download ");
				let kyuu = await fetch(`https://api.agatz.xyz/api/ytsearch?message=${text}`);
				let tylor = await fetch(`https://api.agatz.xyz/api/ytmp3?url=${kyuu.data[0].url}`);
				await conn.sendMessage(
					 m.chat,
					 {
					   audio: { url: tylor.data[0].downloadUrl },
					   fileName: `${tylor.data[0].title}.mp3`,
					   mimetype: "audio/mpeg",
					   contextInfo: {
				  externalAdReply: {
					title: `FIRE MD`,
					body: `${tylor.data[0].title}.mp3`,
					thumbnailUrl: `https://i.imgur.com/tStJm2M.jpeg`,
					sourceUrl: `${tylor.data[0].downloadUrl}`,
					mediaType: 2,
					showAdAttribution: true,
					}
				}
			}, { quoted: m });
		}
			break;
	}
};
handler.help = ["play"];
handler.tags = ["downloader"];
handler.command = ["play"];
export default handler

            
