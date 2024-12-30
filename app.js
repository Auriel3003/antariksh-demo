document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const addUserForm = document.getElementById("addUserForm");

    // Simulated CSV data
    const users = [
        { username: "admin", password: "admin123", role: "admin" },
        { username: "client", password: "client123", role: "client" }
    ];

    // Login form submission
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                if (user.role === "admin") {
                    window.location.href = "admin.html";
                } else if (user.role === "client") {
                    window.location.href = "client.html";
                }
            } else {
                document.getElementById("error").textContent = "Invalid credentials!";
            }
        });
    }

    // Add user form submission
    if (addUserForm) {
        addUserForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const newUsername = document.getElementById("newUsername").value;
            const newPassword = document.getElementById("newPassword").value;
            const role = document.getElementById("role").value;

            users.push({ username: newUsername, password: newPassword, role });
            alert("User added successfully!");
        });
    }

    // Fetch and display APOD
    if (document.getElementById("apod")) {
        fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`)
            .then(response => response.json())
            .then(data => {
                document.getElementById("apod").innerHTML = `
                    <h2>${data.title}</h2>
                    <img src="${data.url}" alt="${data.title}" style="width:100%;border-radius:8px;">
                    <p>${data.explanation}</p>`;
            });
    }

    // Fetch and display Solar System data
    if (document.getElementById("solarSystemData")) {
        fetch(`https://api.le-systeme-solaire.net/rest/bodies/`)
            .then(response => response.json())
            .then(data => {
                const planets = data.bodies.filter(body => body.isPlanet);
                document.getElementById("solarSystemData").innerHTML = `
                    <h2>Solar System Planets</h2>
                    <ul>${planets.map(planet => `<li>${planet.englishName}</li>`).join("")}</ul>`;
            });
    }

    // Display current time
    if (document.getElementById("currentTime")) {
        setInterval(() => {
            const now = new Date();
            document.getElementById("currentTime").textContent = `Current Time: ${now.toLocaleTimeString()}`;
        }, 1000);
    }
});
