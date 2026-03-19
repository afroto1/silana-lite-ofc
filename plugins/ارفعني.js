let handler = async (m, { conn, isAdmin }) => {
  if (m.fromMe) throw 'Nggk'
  if (is.Admin) throw `*انت ادمن زعيم المكان يا مطورى 🌚♥️*`
  await conn.groupParticipantsUpdate(m.chat, [m.sender], "promote")
}
handler.command = ["ارفعني"]
handler.rowner = true
handler.botAdmin = true
export default handler
