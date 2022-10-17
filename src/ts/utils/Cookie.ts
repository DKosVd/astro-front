import Cookies from 'js-cookie';

function setCookie(name, value) {
    Cookies.set(name, value, {
        expires: 7
    });
}

function getCookie(name) {
    return Cookies.get(name)
}

export {setCookie, getCookie}