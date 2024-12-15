import fetch from 'node-fetch'

let handler = async (m, { conn, command, text, usedPrefix }) => {
    if (!text) throw `*Enter a song name!*\n\n*Example:*\n${usedPrefix + command} behold by Hillsong`
    try {
        let kyuu = await fetch(`https://api.agatz.xyz/api/ytsearch?message=${text}`);
        let tylor = await fetch(`https://exonity.tech/api/ytdlp2-faster?apikey=adminsepuh&url=${kyuu.data[0].url}`);${kyuu.data[0].url}`);

        // Prepare message template
        let doc = {
            audio: {
                url: tylor.result.audio
            },
            mimetype: 'audio/mpeg',
            fileName: `${tylor.result.title}.mp3`,
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    mediaType: 2,
                    mediaUrl: `${tylor.result.audio}`,
                    title: `FIRE MD`,
                    body: `${tylor.result.title}.mp3`,
                    sourceUrl: `${tylor.result.audio}`,
                    thumbnail: `https://i.imgur.com/tStJm2M.jpeg`,
                }
            }
        }

        // Send audio file with metadata
        await conn.sendMessage(m.chat, doc, { quoted: m })


    } catch (error) {
        console.error('Error in music download:', error)
        m.reply(`An error occurred: ${error.message}\nPlease try again later`)
    }
}

handler.help = ['play'].map(v => v + ' <query>')
handler.tags = ['downloader']
handler.command = /^(play|mp3|ytmusic)$/i

export default handler

