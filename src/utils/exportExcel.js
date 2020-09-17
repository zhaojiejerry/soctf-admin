
export function exportExcel (url, params) {
  let link = document.createElement('a')
  link.href = url + '?' + pars(params)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
function pars (param, key, encode) {
  if (param == null) return ''
  var arr = []
  var t = typeof (param)
  if (t == 'string' || t == 'number' || t == 'boolean') {
    arr.push(key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param))
  } else {
    for (var i in param) {
      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
      arr.push(pars(param[i], k, encode))
    }
  }
  return arr.join('&')
};
