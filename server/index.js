// server/index.js
const { Server } = require('socket.io')
const fs = require('fs')
const http = require('http')

const PORT = 20051
const server = http.createServer()

const io = new Server(server, {
  cors: { origin: '*' } // permite conexión desde frontend en otro puerto
})

let votos = [0, 0, 0, 0]
const votosFile = './votos.json'

if (fs.existsSync(votosFile)) {
  votos = JSON.parse(fs.readFileSync(votosFile))
} else {
  fs.writeFileSync(votosFile, JSON.stringify(votos))
}

io.on('connection', socket => {
  console.log('🟢 Nuevo cliente conectado:', socket.id)
  socket.emit('updateVotos', votos)

  socket.on('vote', idx => {
    console.log('🗳️ Voto recibido:', idx)
    votos[idx]++
    fs.writeFileSync(votosFile, JSON.stringify(votos))
    io.emit('updateVotos', votos)
  })

  socket.on('disconnect', () => {
    console.log('🔴 Cliente desconectado:', socket.id)
  })
})

server.listen(PORT, () => console.log(`✅ Servidor Socket.IO en puerto ${PORT}`))
