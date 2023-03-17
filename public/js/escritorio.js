//Referencias
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button');
const lblAtendiendo = document.querySelector('small');
const alerta = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');

const searcParams =  new URLSearchParams( window.location.search );

if (!searcParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}

const escritorio = searcParams.get('escritorio');
lblEscritorio.innerHTML = escritorio;

alerta.style.display = 'none';

const socket = io();

socket.on('connect', () => {
    btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    btnAtender.disabled = true;
});

socket.on('cola', (cola)=>{
    if(cola === 0){
        lblPendientes.style.disabled = 'none';
    }else{
        lblPendientes.style.disabled = '';
        lblPendientes.innerText = cola;
    }
    
});

btnAtender.addEventListener( 'click', () => {

    socket.emit('atender-ticket', {escritorio}, ({ok, ticket, msg})=>{
        if(!ok){
            lblAtendiendo.innerText = 'Nadie.';
            return alerta.style.display = '';
        }

        lblAtendiendo.innerText = 'Ticket ' + ticket.numero;

    });


});