function setCookie(key, value) {
    document.cookie = `${key}=${value};path=/`;
}

function getCookie(key) {
    return document.cookie
        .split("; ")
        .find(cookie => cookie.startsWith(`${key}=`))
        ?.split("=")[1];
}

export { setCookie, getCookie };