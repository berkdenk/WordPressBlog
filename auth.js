document.addEventListener('DOMContentLoaded', function () {
    const signInButton = document.getElementById('signin-button');
    const registerButton = document.getElementById('register-button');
    const logoutButton = document.getElementById('logout-button');
    
    // Check user login status
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        //If login:
        signInButton.style.display = "none";
        registerButton.style.display = "none";
        logoutButton.style.display = "inline-block"; // Logout visible

        logoutButton.addEventListener("click", function () {
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            alert("You have logged out! Redirecting to blog...");
            window.location.href = "blog.html"; 
        });
    } else {
        // If not logged in:
        signInButton.style.display = "inline-block";
        registerButton.style.display = "inline-block";
        logoutButton.style.display = "none"; // Logout hidden

        signInButton.addEventListener("click", function () {
            window.location.href = "login.html"; // direct
        });

        registerButton.addEventListener("click", function () {
            window.location.href = "register.html";
        });
    }
});
