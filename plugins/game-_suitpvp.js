let handler = m => m
handler.before = async function (m) {
this.suit = this.suit ? this.suit : {}
if (db.data.users[m.sender].suit < 0) db.data.users[m.sender].suit = 0
let room = Object.values(this.suit).find(room => room.id && room.status && [room.p, room.p2].includes(m.sender))
if (room) {
let win = ''
let tie = false
if (m.sender == room.p2 && /^(acc(ept)?|terima|aceptar|gas|aceptare?|nao|gamau|rechazar|ga(k.)?bisa)/i.test(m.text) && m.isGroup && room.status == 'wait') {
if (/^(tolak|gamau|rechazar|ga(k.)?bisa)/i.test(m.text)) {
let textno = `*[ā] @${room.p2.split`@`[0]} šš“š²š·š°šš¾ š“š» šæššæ, š“š» š¹šš“š¶š¾ šš“ š²š°š½š²š“š»š°*`
m.reply(textno, null, {mentions: this.parseMention(textno)})
delete this.suit[room.id]
return !0 }
room.status = 'play'
room.asal = m.chat
clearTimeout(room.waktu)
let textplay = `š® š¶š°š¼š“š - šæššæ - š¶š°š¼š“š š®\n\nāā š“š» š¹šš“š¶š¾ š²š¾š¼šøš“š½šš°, š»š°š š¾šæš²šøš¾š½š“š š·š°š½ ššøš³š¾ š“š½ššøš°š³š¾š š° š»š¾š š²š·š°šš šæššøšš°š³š¾š š³š“ @${room.p.split`@`[0]} š @${room.p2.split`@`[0]}\n\nā šš“š»š“š²š²šøš¾š½š“š½ šš½š° š¾šæš²šøš¾š½ š“š½ ššš š²š·š°šš šæššøšš°š³š¾š, šš“ššæš“š²ššøšš°š¼š“š½šš“\n*ā š“š»š“š¶šøš š¾šæš²šøš¾š½ š“š½ wa.me/${conn.user.jid.split`@`[0]}*`
m.reply(textplay, m.chat, {mentions: this.parseMention(textplay)})
let imgplay = `https://www.merca2.es/wp-content/uploads/2020/05/Piedra-papel-o-tijera-0003318_1584-825x259.jpeg`    
if (!room.pilih) this.sendHydrated(room.p, 'šæš¾š šµš°šš¾š šš“š»š“š²š²šøš¾š½š“ šš½š° š³š“ š»š°š ššøš¶ššøš“š½šš“š š¾šæš²šøš¾š½š“š', `š¶š°š½š°š³š¾š +${room.poin}ššæ\nšæš“šš³š“š³š¾š ${room.poin_lose}ššæ`, imgplay, null, null, null, null, [['PIEDRA šæ', 'Piedra'], ['PAPEL š', 'Papel'], ['TIJERA āļø', 'Tijera']], m)
if (!room.pilih2) this.sendHydrated(room.p2, 'šæš¾š šµš°šš¾š šš“š»š“š²š²šøš¾š½š“ šš½š° š³š“ š»š°š ššøš¶ššøš“š½šš“š š¾šæš²šøš¾š½š“š', `š¶š°š½š°š³š¾š +${room.poin}ššæ\nšæš“šš³š“š³š¾š ${room.poin_lose}ššæ`, imgplay, null, null, null, null, [['PIEDRA šæ', 'Piedra'], ['PAPEL š', 'Papel'], ['TIJERA āļø', 'Tijera']], m)                             
room.waktu_milih = setTimeout(() => {
if (!room.pilih && !room.pilih2) this.sendButton(m.chat, `[ā] š½šøš½š¶šš½ š¹šš¶š°š³š¾š šš¾š¼š¾ š»š° šøš½šøš²šøš°ššøšš° š³š“ š“š¼š“šæš“šš°š š“š» š¹šš“š¶š¾, š“š» šæššæ šš“ š°š· š²š°š½š²š“š»š°š³š¾`, wm, null, [['š¼š“š½š šæššøš½š²šøšæš°š»', '#menu']], m)
else if (!room.pilih || !room.pilih2) {
win = !room.pilih ? room.p2 : room.p 
let textnull = `*[ā] @${(room.pilih ? room.p2 : room.p).split`@`[0]} š½š¾ š“š»š“š¶šøššš“ š½šøš½š¶šš½š° š¾šæš²šøš¾š½, šµšøš½ š³š“š» šæššæ*`
this.sendButton(m.chat, textnull, wm, null, [['š¼š“š½š šæššøš½š²šøšæš°š»', '#menu']], m, { mentions: this.parseMention(textnull)})
db.data.users[win == room.p ? room.p : room.p2].exp += room.poin
db.data.users[win == room.p ? room.p : room.p2].exp += room.poin_bot
db.data.users[win == room.p ? room.p2 : room.p].exp -= room.poin_lose
}
delete this.suit[room.id]
return !0
}, room.timeout)}
let jwb = m.sender == room.p
let jwb2 = m.sender == room.p2
let g = /tijera/i
let b = /piedra/i
let k = /papel/i
let reg = /^(tijera|piedra|papel)/i
if (jwb && reg.test(m.text) && !room.pilih && !m.isGroup) {
room.pilih = reg.exec(m.text.toLowerCase())[0]
room.text = m.text
m.reply(`*[ ā ] š·š°š š“š»š“š¶šøš³š¾ ${m.text}, šš“š¶šš“šš° š°š» š¶šššæš¾ š ${room.pilih2 ? `šš“ššøšš° š»š¾š šš“ššš»šš°š³š¾š*` : 'š“ššæš“šš° š»š¾š šš“ššš»šš°š³š¾š*'}`)
if (!room.pilih2) this.reply(room.p2, '*[ā] š“š» š¾šæš¾š½š“š½šš“ š°š· š“š»š“š¶šøš³š¾, š“š šš šššš½š¾ š³š“ š“š»š“š¶šøš!!*', 0)}
if (jwb2 && reg.test(m.text) && !room.pilih2 && !m.isGroup) {
room.pilih2 = reg.exec(m.text.toLowerCase())[0]
room.text2 = m.text
m.reply(`*[ ā ] š·š°š š“š»š“š¶šøš³š¾ ${m.text}, šš“š¶šš“šš° š°š» š¶šššæš¾ š ${room.pilih ? `šš“ššøšš° š»š¾š šš“ššš»šš°š³š¾š*` : 'š“ššæš“šš° š»š¾š šš“ššš»šš°š³š¾š*'}`)
if (!room.pilih) this.reply(room.p, '*[ā] š“š» š¾šæš¾š½š“š½šš“ š°š· š“š»š“š¶šøš³š¾, š“š šš šššš½š¾ š³š“ š“š»š“š¶šøš!!*', 0)}
let stage = room.pilih
let stage2 = room.pilih2
if (room.pilih && room.pilih2) {
clearTimeout(room.waktu_milih)
if (b.test(stage) && g.test(stage2)) win = room.p
else if (b.test(stage) && k.test(stage2)) win = room.p2
else if (g.test(stage) && k.test(stage2)) win = room.p
else if (g.test(stage) && b.test(stage2)) win = room.p2
else if (k.test(stage) && b.test(stage2)) win = room.p
else if (k.test(stage) && g.test(stage2)) win = room.p2
else if (stage == stage2) tie = true 
this.reply(room.asal, `
*š šš“ššš»šš°š³š¾š š³š“š» šæššæ š*${tie ? '\n*āā š“š¼šæš°šš“!!*' : ''}

*@${room.p.split`@`[0]} (${room.text}) ${tie ? '' : room.p == win ? ` š¶š°š½š¾ š„³ +${room.poin}XP*` : ` šæš“šš³šøš¾ š¤” ${room.poin_lose}XP*`}
*@${room.p2.split`@`[0]} (${room.text2}) ${tie ? '' : room.p2 == win ? ` š¶š°š½š¾ š„³ +${room.poin}XP*` : ` šæš“šš³šøš¾ š¤” ${room.poin_lose}XP*`}
`.trim(), m, { mentions: [room.p, room.p2] } )
if (!tie) {
db.data.users[win == room.p ? room.p : room.p2].exp += room.poin
db.data.users[win == room.p ? room.p : room.p2].exp += room.poin_bot
db.data.users[win == room.p ? room.p2 : room.p].exp += room.poin_lose
}
delete this.suit[room.id]}}
return !0
}
handler.exp = 0
export default handler
function random(arr) {
return arr[Math.floor(Math.random() * arr.length)]}
