async function fetchData(url) {
    try {
        const response = await axios.get(url);
        const allRepositories = response.data;

        const nextLink = response.headers.link &&
            response.headers.link.split(',')
                .find(link => link.includes('rel="next"'));

        if (nextLink) {
            const nextUrl = nextLink.split(';')[0].slice(1, -1);
            const nextData = await fetchData(nextUrl);
            return allRepositories.concat(nextData);
        }
        return allRepositories;
    } catch (error) {
        console.error('Erro ao buscar dados:', error.message);
        throw error;
    }
}

async function getSpecificRepositories() {
    try {
        const username = 'jonathafernandes';
        const perPage = 100;
        const initialUrl = `https://api.github.com/users/${username}/repos?per_page=${perPage}`;
        const allRepositories = await fetchData(initialUrl);

        const repoBlog = allRepositories.find(repo => repo.name === 'blog.github.io');
        const latestRepo = allRepositories
            .filter(repo => repo.topics.length > 0)
            .reduce((a, b) => new Date(a.created_at) > new Date(b.created_at) ? a : b, {});

        const specificRepositories = [repoBlog, latestRepo];

        renderRepositories(specificRepositories);
    } catch (error) {
        renderError('Erro ao obter repositório!');
    }
}

function renderRepositories(repositories) {
    const lastProject = document.getElementById('lastProject');
    const articleContent = document.getElementById('article-content');

    if (repositories[1]) {
        lastProject.innerHTML = `
            <h5>${repositories[1].name || 'Repositório'}</h5>
            <img src="./src/assets/${repositories[1].name}.png" alt=${repositories[1].name}>
            <br>
            <span>${repositories[1].description || ''}<span>
            <div class="repo-buttons">
                <a href="${repositories[1].html_url || '#'}" target="_blank">Mais informações</a>
                <a href="${repositories[1].homepage || '#'}" target="_blank">Visite</a>
            </div>
        `;
    } else {
        lastProject.innerHTML = `<p style="color:darkred">Repositório não encontrado.</p>`;
    }

    if (repositories[0]) {
        articleContent.innerHTML = `
            <a href="${repositories[0].homepage || '#'}" target="_blank">${repositories[0].description || 'Descrição do repositório'}</a>
        `;
    } else {
        articleContent.innerHTML = `<p style="color:darkred">Artigo não encontrado.</p>`;
    }
}

function renderError(message) {
    const lastProject = document.getElementById('lastProject');
    const articleContent = document.getElementById('article-content');

    if (lastProject) {
        lastProject.innerHTML = `<p style="color:darkred">${message}</p>`;
    }
    if (articleContent) {
        articleContent.innerHTML = `<p style="color:darkred">Erro ao obter informações do post!</p>`;
    }
}

window.onload = getSpecificRepositories;
