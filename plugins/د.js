import fs from 'fs'
import fetch from 'node-fetch'
import PhoneNumber from 'awesome-phonenumber'
import { join } from 'path'

let handler = async (m, { conn, usedPrefix, __dirname }) => {
  try {
    let pp = fs.readFileSync('./Menu.png')
    let img = await (await fetch('https://telegra.ph/file/0a5b8c0c5f8a0f.png')).buffer()

    let d = new Date(Date.now() + 3600000)
    let locale = 'ar'

    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })

    let _uptime = process.uptime() * 1000
    let uptime = clockString(_uptime)

    let user = global.db.data.users[m.sender] || {}
    let { exp = 0, limit = 0, level = 0, role = 'مستخدم' } = user

    let { min, xp, max } = xpRange(level, global.multiplier)

    let taguser = '@' + m.sender.split("@")[0]

    let str = `
👋 مرحبا ${taguser}

📅 اليوم: ${week}
📆 التاريخ: ${date}
⏱️ وقت التشغيل: ${uptime}

⽗𓅓 ⋅ ───━ •﹝👑﹞• ━─── ⋅ 𓅓
﹝• م1 •﹞ *الرومات*
﹝• م2 •﹞ *الدين الاسلامي*
﹝• م3 •﹞ *الترفيه*
﹝• م4 •﹞ *التنزيلات*
﹝• م5 •﹞ *التحويلات*
﹝• م6 •﹞ *المطور فقط*
﹝• م7 •﹞ *الفعاليات*
﹝• م8 •﹞ *كل الاوامر*
⽗𓅓 ⋅ ───━ •﹝👑﹞• ━─── ⋅ 𓅓

✨ اكتب (.م) لعرض الأقسام
👑 المطور: BLACK-BOT
`.trim()

    let message = {
      image: pp,
      caption: str,
      mentions: [m.sender],
      footer: 'BLACK-BOT',
      contextInfo: {
        externalAdReply: {
          showAdAttribution: true,
          title: 'BLACK-BOT 👑',
          body: 'بوت واتساب احترافي',
          thumbnail: img,
          sourceUrl: 'https://whatsapp.com/channel/0029VacWb364dTnEKmVWd628',
          mediaType: 1
        }
      }
    }

    await conn.sendMessage(m.chat, message, { quoted: m })

  } catch (e) {
    console.error(e)
    conn.reply(m.chat, '❗ حدث خطأ ❗', m)
  }
}

handler.command = /^(اوامر|menu|الاوامر|مهام|المهام)$/i
handler.exp = 20

export default handler

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
  }
