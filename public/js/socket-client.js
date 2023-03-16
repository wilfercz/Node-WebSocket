//Referencias del HTML
const lblOnline  = document.getElementById('Online');
const lblOffline = document.getElementById('Offline');
const mensaje    = document.getElementById('txtMensaje');
const boton      = document.getElementById('btnEnviar');

const socket = io();

socket.on('connect', ()=>{

    lblOnline.style.display = '';
    lblOffline.style.display = 'none';

});

socket.on('disconnect', ()=>{

    lblOffline.style.display = '';
    lblOnline.style.display = 'none';

});

socket.on('enviar-mensaje', (payload)=>{

    console.log(payload);

});

boton.addEventListener('click', ()=>{

    const mensajeEnviar = mensaje.value;
    const payload = {
        mensajeEnviar,
        id: '123ABC',
        fecha: new Date().getTime()
    };

    socket.emit("mensaje", payload, (id)=>{
        console.log('Desde el server', id);
    });

});