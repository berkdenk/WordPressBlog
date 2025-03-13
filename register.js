document.getElementById('register-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('register-message');

    messageElement.innerHTML = "Processing...";

    try {
        const response = await fetch('http://custom-wp.local/wp-json/custom/v1/register/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });

        const data = await response.json();

        if (data.user_id) {
            messageElement.innerHTML = `<span class="success">User registered successfully! Redirecting...</span>`;
            
            // **2 saniye bekletmeden direkt yönlendirme**
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1000);
        } else {
            messageElement.innerHTML = `<span class="error">Error: ${data.message}</span>`;
        }
    } catch (error) {
        messageElement.innerHTML = `<span class="error">Registration failed. Try again later.</span>`;
    }
    
});
