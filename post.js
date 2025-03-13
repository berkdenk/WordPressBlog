document.getElementById('post-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const title = document.getElementById('post-title').value;
    const content = document.getElementById('post-content').value;
    const messageElement = document.getElementById('post-message');
    const token = localStorage.getItem('token'); // User token

    if (!token) {
        alert("You need to log in to create a post.");
        return;
    }

    messageElement.innerHTML = "Publishing...";

    try {
        const response = await fetch('http://custom-wp.local/wp-json/wp/v2/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Authentication
            },
            body: JSON.stringify({
                title: title,
                content: content,
                status: 'publish' // Post automatically published
            })
        });

        const data = await response.json();

        if (data.id) {
            messageElement.innerHTML = `<span class="success">Post published successfully!</span>`;
            document.getElementById('post-form').reset(); // Reset form
        } else {
            messageElement.innerHTML = `<span class="error">Error: ${data.message}</span>`;
        }
    } catch (error) {
        messageElement.innerHTML = `<span class="error">Failed to publish post. Try again.</span>`;
    }
});
