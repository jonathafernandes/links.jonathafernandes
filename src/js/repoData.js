const userData = document.getElementById("userData");

async function getSpecificRepositories() {
    try {
        const username = 'jonathafernandes';
        const perPage = 100;
        let allRepositories = [];

        const fetchData = async (url) => {
            const response = await axios.get(url);
            allRepositories = allRepositories.concat(response.data);

        const nextLink = response.headers.link && response.headers.link.split(',').find(link => link.includes('rel="next"'));
        if (nextLink) {
            const nextUrl = nextLink.split(';')[0].slice(1, -1);
            await fetchData(nextUrl);
        }
        };

        const initialUrl = `https://api.github.com/users/${username}/repos?per_page=${perPage}`;
        await fetchData(initialUrl);

        const specificRepositories = ["alaclimabom"];
        const filteredRepositories = allRepositories.filter(repo => specificRepositories.includes(repo.name));

        const repositoriesList = document.getElementById('repositories-list');
        filteredRepositories.forEach(repo => {
        const listItem = document.createElement('li');

        listItem.innerHTML = `
            <h5>${repo.name}</h5>
            <br>
            <span>${repo.description}<span>
            <div class="repo-buttons">
                <a href="${repo.homepage}" target="_blank">Visite</a>
                <a href="${repo.html_url}" target="_blank">Ver no GitHub</a>
            </div>
        `;
        repositoriesList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Erro ao obter repositório:', error.message);
        userData.innerHTML = `<p style="color: red">Erro ao obter repositório!</p>`
    }
}

window.onload = getSpecificRepositories;
