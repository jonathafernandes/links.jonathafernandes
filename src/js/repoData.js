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

        const specificRepositories = ["monteiro-esportes-cms","blog.github.io"];
        const filteredRepositories = allRepositories.filter(repo => specificRepositories.includes(repo.name));

        const lastProject = document.getElementById('lastProject');
        const lastProjectData = filteredRepositories[1];

        lastProject.innerHTML = `
            <h5>${lastProjectData.name}</h5>
            <img src="./src/assets/${specificRepositories[0]}.png" alt="">
            <br>
            <span>${lastProjectData.description}<span>
            <div class="repo-buttons">
                <a href="${lastProjectData.html_url}" target="_blank">Mais informações</a>
                <a href="${lastProjectData.homepage}" target="_blank">Visite</a>
            </div>
        `;

        const articleContent = document.getElementById('article-content');
        const articleData = filteredRepositories[0];
        articleContent.innerHTML = `
            <a href="${articleData.homepage}" target="_blank">${articleData.description}</a>
        `;

    } catch (error) {
        console.error('Erro ao obter repositório:', error.message);
        lastProject.innerHTML = `<p style="color: red">Erro ao obter repositório!</p>`
        lastPost.innerHTML = `<p style="color: red">Erro ao obter informações do post!</p>`
    }
}

window.onload = getSpecificRepositories;
