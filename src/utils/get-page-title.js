// eslint-disable-next-line
const title = HaiboCONF.sysName || '体检机后台管理系统'

export default function getPageTitle (pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
