import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const getToken = (value: string) => {
    return btoa(`token-${value}`);
}

const parseToken = (value: string) => {
    const user = atob(value).replace('token-', '').split('_');
    if (user && user.length) {
        return {username: user[0]};    
    }
    return null;
}

export {
    history,
    getToken,
    parseToken
}