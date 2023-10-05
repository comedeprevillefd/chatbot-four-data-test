// Attend que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function () {
    // Sélectionne le chat-box
    const chatBox = document.getElementById('chat-box');

    // Message de bienvenue
    const welcomeMessage = `
        <div class="chatbot-message">
            <b>FD Chatbot :</b> Bienvenue ! Je suis l'IA de Four Data, vous pouvez me poser les questions que vous voulez, j'essaierai d'y répondre de manière ... pertinente !
        </div>
    `;

    // Ajoute le message de bienvenue au chat-box
    chatBox.innerHTML += welcomeMessage;

    // Défilement automatique vers le bas avec une animation en douceur
    chatBox.scrollTo({
        top: chatBox.scrollHeight,
        behavior: 'smooth'
    });
});


function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    const chatBox = document.getElementById('chat-box');
    const loader = document.getElementById('loader');

    // Affiche le message de l'utilisateur dans le chat avec l'animation de chargement
    chatBox.innerHTML += `
        <div class="user-message">
            <b>Moi :</b> ${userInput}
            <div class="loader"></div>
        </div>
    `;

    // Afficher l'animation de chargement
    loader.style.display = 'inline-block';

    // Crée un objet FormData pour envoyer les données
    const formData = new FormData();
    formData.append('message', userInput);

    // Construit le corps de la requête manuellement
    const body = Array.from(formData.entries())
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

    // Envoie la requête POST à l'API
    fetch('https://n8n.fourdata.io/webhook/chatbot-four-data-ff3c-ee-dijon', {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/x-www-form-urlencoded',
            // Ajoutez d'autres entêtes si nécessaire
        },
        body: body,
    })
    .then(response => response.json())
    .then(data => {
        console.log('Réponse de l\'API:', data);

        // Assurez-vous que la réponse est un objet non vide
        if (typeof data === 'object' && data.text) {
            // Récupère le texte de la réponse
            const botText = data.text;
            console.log('Texte du chatbot:', botText);

            // Supprime l'animation de chargement du message de l'utilisateur
            const userMessage = chatBox.lastElementChild;
            userMessage.removeChild(userMessage.lastElementChild);

            // Affiche la réponse de l'API dans le chat
            const chatbotMessage = document.createElement('div');
            chatbotMessage.className = 'chatbot-message';
            chatbotMessage.innerHTML = `<div><b>FD Chatbot :</b> ${botText}</div>`;
            chatBox.appendChild(chatbotMessage);

            // Défilement automatique vers le bas avec une animation en douceur
            chatBox.scrollTo({
                top: chatBox.scrollHeight,
                behavior: 'smooth'
            });

            console.log('Message du chatbot ajouté à la boîte de chat:', chatbotMessage);
        } else {
            console.error('Réponse de l\'API invalide:', data);
        }
    })
    .catch(error => console.error('Erreur lors de l\'envoi de la requête:', error));

    // Efface le champ de saisie
    document.getElementById('user-input').value = '';
}
