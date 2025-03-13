async function fetchBlogPosts() {
    try {
        const response = await fetch('http://custom-wp.local/wp-json/wp/v2/posts');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const posts = await response.json();
        console.log("Fetched posts:", posts); // Show fetched posts in console

        const list = document.getElementById('blog-list');
        list.innerHTML = ''; // Clean list

        if (posts.length === 0) {
            list.innerHTML = '<p class="no-posts">No blog posts found.</p>';
            return;
        }

        posts.forEach(post => {
            let li = document.createElement('li');
            li.classList.add('blog-post'); // CSS class
            li.innerHTML = `
                <h3><a href="${post.link}" target="_blank">${post.title.rendered}</a></h3>
                <p class="meta"><strong>By Unknown</strong> - ${new Date(post.date).toLocaleDateString()}</p>
                <p>${post.excerpt.rendered}</p>
                <hr>
            `;
            list.appendChild(li);
        });

    } catch (error) {
        console.error('Error fetching blog posts:', error);
        document.getElementById('blog-list').innerHTML = '<p class="error">Error loading blog posts. Check console for details.</p>';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    const postSection = document.getElementById('post-section');

    if (!token) {
        postSection.innerHTML = `<p>You need to <a href="login.html">log in</a> to create a post.</p>`;
    }
});

fetchBlogPosts();
