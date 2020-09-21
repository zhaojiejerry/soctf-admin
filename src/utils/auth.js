import Cookies from 'js-cookie'

const ENUM = {
    Token: 'vue_admin_template_token', // SESSION
    Account: 'vue_admin_template_account',
    Password: 'vue_admin_template_password',
    Remember: 'vue_admin_template_remember',
    AutoLogin: 'vue_admin_template_autoLogin',
    usrId: 'vue_admin_template_usrId'
}

export function getCookie(name) {
    return Cookies.get(ENUM[name])
}

export function setCookie(name, value) {
    return Cookies.set(ENUM[name], value, {
        expires: 30
    })
}

export function removeCookie(name) {
    return Cookies.remove(ENUM[name])
}