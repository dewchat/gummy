function addMessage(text, isUser) {
    const message = document.createElement("div");
    message.className = "message " + (isUser ? "user-message" : "bot-message");
    message.innerText = text;
    document.getElementById("chat").appendChild(message);
    document.getElementById("chat").scrollTop = document.getElementById("chat").scrollHeight;
}

function fetchAnswer() {
    const question = document.getElementById("question").value;
    if (question.trim() === "") return;
    
    // Display user message
    addMessage(question, true);
    document.getElementById("question").value = "";

    fetch("https://ox2bo5qoa4.execute-api.us-east-1.amazonaws.com/chatbot", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "inputText": question
        })
    })
    .then(response => response.json())
    .then(data => {
        // Display bot response
        addMessage(data.body, false);
    })
    .catch(error => {
        console.error("Error:", error);
        addMessage("An error occurred. Please try again.", false);
    });
}
