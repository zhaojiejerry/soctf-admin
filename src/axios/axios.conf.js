import axios from 'axios'
import {
    MessageBox,
    Message
} from 'element-ui'
import {
    getCookie,
    removeCookie
} from '@/utils/auth'
import router from '@/router'

const Axios = axios.create({
    /* eslint-disable no-undef */
    baseURL: '/baseApi',
    timeout: 10000, // 超时设置
    withCredentials: true // 允许请求携带cookie信息
})

// 请求拦截器
Axios.interceptors.request.use(config => {
    const token = getCookie('Token')
    if (token) {
        config.headers['Authorization'] = token
    }
    return config
}, error => {
    return Promise.reject(error)
})
const downloadUrl = url => {
    const link = document.createElement('a')
    link.href = url
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // let iframe = document.createElement('iframe')
    // iframe.style.display = 'none'
    // iframe.src = url
    // iframe.onload = function () {
    //   document.body.removeChild(iframe)
    // }
    // document.body.appendChild(iframe)
}
const downloadZipUrl = response => {
    const fileName = response.headers['content-disposition']
    console.log(fileName)
    const strs = fileName.split('=')
    console.log(strs)
    const blob = new Blob([response.data], {
        type: 'application/zip'
    })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a') // 创建a标签
    link.href = url
    link.download = strs[1] // 重命名文件
    link.click()
    URL.revokeObjectURL(url)
}

// 响应拦截器
Axios.interceptors.response.use(response => {
    // 导出ZIP
    if (response.headers && response.headers['content-type'].indexOf('application/octet-stream') != -1) {
        console.log(response.data)
        downloadZipUrl(response)
        response.data = {
            code: 0,
            message: 'success'
        }
    }
    // 导出excel
    if (response.headers && (response.headers['content-type'].indexOf('application/x-msdownload') != -1 || response.headers['content-type'].indexOf('application/vnd.ms-excel') != -1)) {
        downloadUrl(response.request.responseURL)
        response.data = {
            code: 0,
            message: 'success'
        }
    }
    const res = response.data
    if (res.code == 401) {
        Message.closeAll()
        Message({
                message: res.msg || 'Error',
                type: 'error'
            })
            // 重新登录
        if (res.code == 401) {
            MessageBox.confirm('您已退出，请重新登录', '退出确认', {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                removeCookie('Token')
                router.push({
                    path: '/login'
                })
            })
        }
        return res
    } else {
        return res
    }
}, err => {
    if (err && err.response) {
        switch (err.response.status) {
            case 400:
                err.message = '请求错误(400)'
                break
            case 401:
                err.message = '未授权，请重新登录'
                break
            case 403:
                err.message = '拒绝访问'
                break
            case 404:
                err.message = '请求错误,未找到该资源'
                break
            case 405:
                err.message = '请求方法未允许'
                break
            case 408:
                err.message = '请求超时'
                break
            case 500:
                err.message = '服务器错误'
                break
            case 501:
                err.message = '网络未实现'
                break
            case 502:
                err.message = '网络错误'
                break
            case 503:
                err.message = '服务不可用'
                break
            case 504:
                err.message = '网络超时'
                break
            case 505:
                err.message = 'HTTP版本不受支持'
                break
            default:
                err.message = `连接错误${err.response.status}`
        }
    } else if (err.code == 'ECONNABORTED' && err.message.indexOf('timeout') !== -1) {
        // 接口请求超时
        err.message = '接口请求超时'
    } else {
        err.message = '连接到服务器失败'
    }
    Message.closeAll()
    Message({
        message: err.message,
        type: 'error'
    })
    return Promise.reject(err)
})

export default Axios