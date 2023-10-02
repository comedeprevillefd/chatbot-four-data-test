function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    const chatBox = document.getElementById('chat-box');

    // Affiche le message de l'utilisateur dans le chat
    chatBox.innerHTML += `<div>User: ${userInput}</div>`;

    // Envoie la requête POST à l'API
    fetch('https://n8n.fourdata.io/webhook-test/chatbot-four-data-ff3c-ee-dijon', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
    })
    .then(response => response.json())
    .then(data => {
        // Affiche la réponse de l'API dans le chat
        chatBox.innerHTML += `<div>Chatbot: ${data.message}</div>`;
    })
    .catch(error => console.error('Erreur lors de l\'envoi de la requête:', error));

    // Efface le champ de saisie
    document.getElementById('user-input').value = '';
}
