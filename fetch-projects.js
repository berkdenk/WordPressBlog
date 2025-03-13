async function fetchBlogPosts() {
    try {
        const response = await fetch('http://custom-wp.local/wp-json/custom/v1/blog/');
        const posts = await response.json();

        const list = document.getElementById('blog-list');
        list.innerHTML = ''; // Clean Previous List

        posts.forEach(post => {
            let li = document.createElement('li');
            li.innerHTML = `
                <h3><a href="${post.permalink}" target="_blank">${post.title}</a></h3>
                <p><strong>By ${post.author}</strong> - ${post.date}</p>
                <p>${post.content}</p>
                <hr>
            `;
            list.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
    }
}

fetchBlogPosts();
