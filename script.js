function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    const chatBox = document.getElementById('chat-box');

    // Affiche le message de l'utilisateur dans le chat
    chatBox.innerHTML += `<div>User: ${userInput}</div>`;

    // Prépare le corps de la requête POST
    const requestBody = {
        message: userInput
    };

    // Envoie la requête POST à l'API
    fetch('https://n8n.fourdata.io/webhook/chatbot-four-data-ff3c-ee-dijon', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(requestBody),
    })
    .then(response => response.json())
    .then(data => {
        // Traite la réponse de l'API
        if (Array.isArray(data) && data.length > 0) {
            const chatbotResponse = data[0].text;
            chatBox.innerHTML += `<div>Chatbot: ${chatbotResponse}</div>`;
        } else {
            console.error('Réponse inattendue de l\'API:', data);
        }
    })
    .catch(error => console.error('Erreur lors de l\'envoi de la requête:', error));

    // Efface le champ de saisie
    document.getElementById('user-input').value = '';
}
