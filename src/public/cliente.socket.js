const socket = io()

const formMessage = document.querySelector('#formMessage')
const usernameInput = document.querySelector('#usernameInput')
const messageInput = document.querySelector('#messageInput')
const contenedorMensaje = document.querySelector('#messagesPool')

function sendMessage() {
    try{
        const username = usernameInput.value
        const message = messageInput.value
    
        socket.emit('cliente: message', {username, message})
    } catch(err){
        console.log(`Ha ocurrido un error ${err}`)
    }
}

function MensajesRender(messageArr) {
    try{
        const html = messageArr.map(text =>{
            return(`<div>
                        <strong>${text.username}:</strong>
                        <em>${text.message}</em>
                    </div>`)
        }).join(" ");

        contenedorMensaje.innerHTML = html
    }catch(err){
        console.log(`Ha ocurrido un error ${err}`)
    }
}

formMessage.addEventListener('submit', event =>{
    event.preventDefault()

    sendMessage()
})

socket.on('server: message', MensajesRender)