import axios from 'axios';

// Exemplo usando a biblioteca axios para fazer requisições HTTP
// const axios = require('axios');

// Credenciais da Aplicação Spotify
const clientId = 'SEU_CLIENT_ID';
const clientSecret = 'SEU_CLIENT_SECRET';
const redirectUri = 'SEU_URI_DE_REDIRECIONAMENTO';

// Endpoint de autenticação
const authEndpoint = 'https://accounts.spotify.com/authorize';
const tokenEndpoint = 'https://accounts.spotify.com/api/token';

// URL de autorização
const authUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=user-read-currently-playing`;

// Substitua 'SEU_CODIGO_DE_AUTORIZACAO' pelo código de autorização obtido após o usuário autenticar
const authorizationCode = 'SEU_CODIGO_DE_AUTORIZACAO';

// Função para obter token de acesso usando o código de autorização
async function getAccessToken() {
    try {
        const response = await axios.post(tokenEndpoint, null, {
            params: {
                grant_type: 'authorization_code',
                code: authorizationCode,
                redirect_uri: redirectUri,
                client_id: clientId,
                client_secret: clientSecret,
            },
        });

        return response.data.access_token;
    } catch (error) {
        console.error('Erro ao obter token de acesso:', error.response.data);
        throw error;
    }
}

// Função para obter informações sobre a música atualmente sendo ouvida
async function getCurrentPlaybackInfo(accessToken) {
    try {
        const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        console.log('Informações sobre a música atual:', response.data);
    } catch (error) {
        console.error('Erro ao obter informações de reprodução atual:', error.response.data);
    }
}

// Exemplo de uso
async function main() {
    try {
        const accessToken = await getAccessToken();
        await getCurrentPlaybackInfo(accessToken);
    } catch (error) {
        console.error('Erro:', error.message);
    }
}

main();
