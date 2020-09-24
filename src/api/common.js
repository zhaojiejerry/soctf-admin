import axios from '@/axios/axios.conf'

export function getjson(url) {
    return axios({
        url: url,
        baseURL: '/jsonApi'
    })
}