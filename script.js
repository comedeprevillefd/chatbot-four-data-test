function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    const chatBox = document.getElementById('chat-box');

    // Affiche le message de l'utilisateur dans le chat
    chatBox.innerHTML += `<div>User: ${userInput}</div>`;

    // Crée un objet FormData pour envoyer les données
    const formData = new FormData();
    formData.append('message', userInput);

    // Envoie la requête POST à l'API
    fetch('https://n8n.fourdata.io/webhook/chatbot-four-data-ff3c-ee-dijon', {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'multipart/form-data; boundary=--------------------------048096710773151122201267',
            // Ajoutez d'autres entêtes si nécessaire
        },
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        // Assurez-vous que la réponse est un tableau non vide
        if (Array.isArray(data) && data.length > 0) {
            // Récupère le texte de la première réponse
            const botText = data[0].text;

            // Affiche la réponse de l'API dans le chat
            chatBox.innerHTML += `<div>Chatbot: ${botText}</div>`;
        } else {
            console.error('Réponse de l\'API invalide:', data);
        }
    })
    .catch(error => console.error('Erreur lors de l\'envoi de la requête:', error));

    // Efface le champ de saisie
    document.getElementById('user-input').value = '';
}
