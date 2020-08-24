const express = require('express')

const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)


let player = 'X';
io.on('connection', (socket) => {
    console.log('user connected')
    socket.emit('player',player)

    player === 'X'? player='O':player='X'

    socket.on('enviarJogada',(position) =>{
        //console.log(position)
        socket.broadcast.emit('jogada',position)
    })

})


http.listen(3333, ()=>{
    console.log('server running')
})
