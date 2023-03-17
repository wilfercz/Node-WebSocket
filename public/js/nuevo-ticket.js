// Referencias
const lblNuevoTicket = document.getElementById('lblNuevoTicket');
const btnCrear = document.querySelector('button');

const socket = io();

socket.on('connect', () => {
    btnCrear.disabled = false;
});

socket.on('disconnect', () => {
    btnCrear.disabled = true;
});

socket.on('ultimo-ticket', (ultimoTicket)=>{
    lblNuevoTicket.innerText = 'Ticket '+ ultimoTicket;
});

btnCrear.addEventListener( 'click', () => {

    socket.emit('siguiente-ticket', null, (ticket)=>{
        lblNuevoTicket.innerText = ticket;
    });

});