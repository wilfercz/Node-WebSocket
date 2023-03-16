
const socketController = (socket) =>{
            
    console.log('Cliente Conectado', socket.id);

    socket.on('disconnect', ()=>{
        console.log('Cliente Desconectado', socket.id);
    });

    socket.on("mensaje", (payload, callback)=>{
        
        const id = 123456789;
        callback(id);

        socket.broadcast.emit('enviar-mensaje', payload);

    });
};

export {socketController};