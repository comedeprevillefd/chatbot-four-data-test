// Remplacez 'YOUR_API_KEY' par votre clé API GPT-3.5
const apiKey = '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';
const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

function sendMessage() {
    const userInput = document.getElementById('user-input');
    const userMessage = userInput.value.trim();

    if (userMessage === '') {
        return;
    }

    appendMessage('user', userMessage);

    // Ajoutez le préfixe demandé à la prompt
    const prompt = "Tu es un assistant spécialiste des combustibles. Réponds à ceci : " + userMessage;

    // Envoie la requête à l'API GPT-3.5
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            prompt: prompt,
            max_tokens: 150
        })
    })
    .then(response => response.json())
    .then(data => {
        const gptResponse = data.choices[0].text.trim();
        appendMessage('assistant', gptResponse);
    })
    .catch(error => console.error('Error:', error));

    // Efface l'input utilisateur
    userInput.value = '';
}

function appendMessage(sender, message) {
    const chatContainer = document.getElementById('chat-container');
    const chat = document.getElementById('chat');
    const newMessage = document.createElement('div');
    newMessage.className = `message ${sender}`;
    newMessage.textContent = message;
    chat.appendChild(newMessage);

    // Fait défiler vers le bas pour afficher le dernier message
    chatContainer.scrollTop = chatContainer.scrollHeight;
}
