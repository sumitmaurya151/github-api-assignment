document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const resultsBody = document.getElementById('resultsBody');

    // Debounce function to delay search input handling
    let debounceTimer;
    function debounce(func, delay) {
        console.log(debounceTimer)
        // Clear any existing debounce timer
        clearTimeout(debounceTimer);
        // Set a new debounce timer
        debounceTimer = setTimeout(func, delay);
    }

    // Event listener for input changes with debouncing
    searchInput.addEventListener('input', function() {
        // Call handleSearch with a delay of 500ms after the last input event
        debounce(handleSearch, 500);
    });

    // Function to handle search
    async function handleSearch() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm === '') {
            resultsBody.innerHTML = '';
            return;
        }

        try {
            const sortBy = 'followers';
            // Fetch user data from GitHub API based on search term
            const response = await fetch(`https://api.github.com/search/users?q=${searchTerm}+&sort=${sortBy}`);
            const data = await response.json();
            // Display search results
            displayResults(data.items);
        } catch (error) {
            // Log error if fetch fails
            console.error('Error fetching data:', error);
            alert('Something went wrong')
            resultsBody.innerHTML = '';
        }
    }

    // Function to display search results
    function displayResults(users) {
        resultsBody.innerHTML = '';
        if (!users){
            return
        }
        // Populate table with new results
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img class="profile-avatar" src="${user.avatar_url}" alt="avatar"></td>
                <td><a href="${user.html_url}" target="_blank">${user.login}</a></td>
            `;
            resultsBody.appendChild(row);
        });
    }
});
