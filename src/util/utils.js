import { Message } from 'element-ui'

export function success (msg) {
    Message.success(msg)
}
export function error (msg) {
    Message.error(msg)
}
/**
 *  post实现
 *
 * @exports
 * @param {String} url
 * @param {Object} options - https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
 * @returns {Promise}
 */
export function post (url, options) {
    let requestOptions = Object.assign(
        {},
        {
            method: 'POST',
            headers: {
                Accept: 'application/json; charset=UTF-8',
            },
            body: options
        },
    )
    return fetch(url, requestOptions)
}