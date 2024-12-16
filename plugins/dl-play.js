import fetch from 'node-fetch';
import yts from 'youtube-yts';
import ytdl from 'youtubedl-core';
import axios from 'axios';
import {youtubedl, youtubedlv2} from '@bochilteam/scraper';
const handler = async (m, {conn, command, args, text, usedPrefix}) => {
  if (!text) throw ` 𝗘𝗻𝘁𝗲𝗿 𝘁𝗵𝗲 𝗻𝗻𝗮𝗺𝗲 𝗼𝗿 𝘁𝗵𝗲 𝘁𝗶𝘁𝗹𝗲 𝗼𝗳 𝘁𝗵𝗲 𝘀𝗼𝗻𝗴 𝘂𝘀𝗶𝗻𝗴 𝘁𝗵𝗲 𝗳𝗼𝗹𝗹𝗼𝘄𝗶𝗻𝗴 𝗰𝗼𝗺𝗺𝗮𝗻𝗱 *\n\n*—◉ 𝗘𝘅𝗮𝗺𝗽𝗹𝗲:*\n*${usedPrefix + command} jingle bell by Frank Sinatra* `;
  try {
    const kyuu = await fetch(`https://api.agatz.xyz/api/ytsearch?message=${text}`);
    let additionalText = '';
   if (command === 'play') {
      additionalText = 'audio 🔊';
    } else if (command === 'play2') {
      additionalText = 'video 🎥';
    }
    const texto1 = `*◉—⌈🎶FIRE -MD (music downloader)🎶⌋—◉*\n❏ 📌 *𝗧𝗶𝘁𝗹𝗲:* ${kyuu.data[0].title}
❏ 📆 *𝗽𝘂𝗯𝗹𝗶𝘀𝗵𝗲𝗱:* ${kyuu.data[0].ago}
❏ ⌚ *Dur𝗮𝘁𝗶𝗼𝗻:* ${kyuu.data[0].timestamp}
❏ 👀 *Vi𝗲𝘄𝘀:* ${kyuu.data[0].views}
❏ 👤 *Au𝘁𝗵𝗼𝗿:* ${kyuu.data[0].author.name}
❏ ⏯️ *C𝗵𝗮𝗻𝗻𝗲𝗹:* ${kyuu.data[0].author.url}
❏ 🆔 *ID:* ${kyuu.data[0].videoId}
❏ 🪬 *T𝘆𝗽𝗲:* ${kyuu.data[0].type}
❏ 🔗 *L𝗶𝗻𝗸:* ${kyuu.data[0].url}\n
❏ *_𝘀𝗲𝗻𝗱𝗶𝗻𝗴 ${additionalText}, 𝗽𝗹𝗲𝗮𝘀𝗲 𝘄𝗮𝗶𝘁 𝗮 𝗺𝗼𝗺𝗲𝗻𝘁．．．_*`.trim();
    conn.sendMessage(m.chat, {image: {url: kyuu.data[0].thumbnail}, caption: texto1}, {quoted: m});
     if (command == 'play') {
      try {
        const tylor = await fetch(`https://api.agatz.xyz/api/ytmp3?url=${kyuu.data[0].url}`);
        const dl_url = tylor.data[0].downloadUrl;
        const title = kyuu.data[0].title;
        await conn.sendMessage(m.chat, { audio: {url: dl_url}, mimetype: 'audio/mpeg', fileName: title + `.mp3`}, {quoted: m});
          } catch {
            await conn.reply(m.chat, '*[🔥] Fire md is extracting your audio please be patient *', m);
    }
   }
  }
};
handler.help = ['play', 'play2'].map((v) => v + ' < busqueda >');
handler.tags = ['downloader'];
handler.command = /^(play|video)$/i;
export default handler
	       
