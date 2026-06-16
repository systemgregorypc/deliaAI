document.getElementById('sendBtn').addEventListener('click', sendMessage);
document.getElementById('userInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

async function sendMessage() {
    const input = document.getElementById('userInput');
    const text = input.value.trim();
    if (!text) return;

    appendMessage(text, 'user');
    input.value = '';

    // Crear burbuja de carga para DeliaAI
    const botMessageId = appendMessage('Pensando...', 'bot');

    try {
        // Apunta al endpoint de tu Cloudflare Worker
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: text })
        });
        
        const data = await response.json();
        document.getElementById(botMessageId).innerText = data.response;
    } catch (error) {
        document.getElementById(botMessageId).innerText = 'Error al conectar con la red neuronal.';
    }
}

function appendMessage(text, sender) {
    const messagesDiv = document.getElementById('messages');
    const msgElement = document.createElement('div');
    const id = 'msg-' + Date.now();
    msgElement.id = id;
    msgElement.className = `message ${sender}`;
    msgElement.innerText = text;
    messagesDiv.appendChild(msgElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
    return id;
}
