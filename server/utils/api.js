const API_URL = 'http://localhost:3333/discogs';
const headers = {
    'Content-Type': 'application/json;charset=utf-8',
    Connection: 'keep-alive',
};

export const get = (path) => {
    return {
        url: API_URL + path,
        method: 'GET',
        headers,
    };
};

export const post = ({path, json}) => {
    return {
        url: API_URL + path,
        method: 'POST',
        headers,
        pool: {maxSockets: 500},
        gzip: true,
        json,
    };
};
