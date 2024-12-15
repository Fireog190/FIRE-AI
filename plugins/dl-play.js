import fetch from 'node-fetch'
import ytdl from 'ytdl-core'
import yts from 'yt-search'
import fs from 'fs'
import { pipeline } from 'stream'
import { promisify } from 'util'
import os from 'os'

const streamPipeline = promisify(pipeline)

let handler = async (m, { conn, command, text, usedPrefix }) => {
    if (!text) throw `*Enter a song name!*\n\n*Example:*\n${usedPrefix + command} Heat waves`
    try {
        let search = await fetch(`https://api.agatz.xyz/api/ytsearch?message=${text}`)
        let vid = search.data[0].url
        let title = search.data[0].title
        let url = await fetch(`https://api.agatz.xyz/api/ytmp3?url=${vid}`)
        let music = url.data[0].downloadUrl
        let thumbnail = `https://i.imgur.com/tStJm2M.jpeg`
        
        // Send "Downloading..." message
        let m1 = await m.reply('*Downloading your song...* 🎵')

        // Prepare message template
        let doc = {
            audio: {
                url: music
            },
            mimetype: 'audio/mpeg',
            fileName: `${title}.mp3`,
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    mediaType: 2,
                    mediaUrl: music,
                    title: title,
                    body: 'FIRE MD MUSIC',
                    sourceUrl: music,
                    thumbnail: thumbnail,
                }
            }
        }

        // Send audio file with metadata
        await conn.sendMessage(m.chat, doc, { quoted: m })

        // Delete "Downloading..." message
        await m1.delete()

    } catch (error) {
        console.error('Error in music download:', error)
        m.reply(`An error occurred: ${error.message}\nPlease try again later`)
    }
}

handler.help = ['play'].map(v => v + ' <query>')
handler.tags = ['downloader']
handler.command = /^(play|spotify|ytmp3)$/i

export default handler
		
