document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('login-message');

    messageElement.innerHTML = "Processing...";

    try {
        const response = await fetch('http://custom-wp.local/wp-json/jwt-auth/v1/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: email, password })
        });

        const data = await response.json();

        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data));

            messageElement.innerHTML = `<span class="success">Login successful! Redirecting...</span>`;


            setTimeout(() => {
                window.location.href = "blog.html"; // Redirect to blog page
            }, 1000);
        } else {
            messageElement.innerHTML = `<span class="error">Error: ${data.message}</span>`;
        }
    } catch (error) {
        messageElement.innerHTML = `<span class="error">Login failed. Try again later.</span>`;
    }

    
});
