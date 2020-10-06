import axios from '@/axios/axios.conf'

// 新增机构
export function addOrganization(data) {
  return axios({
    url: '/sys/addOrganization',
    method: 'post',
    data
  })
}

// 删除机构
export function deleteOrganization(data) {
  return axios({
    url: '/sys/deleteOrganization',
    method: 'get',
    params: data
  })
}

// 查询机构详情
export function getOneOrganization(data) {
  return axios({
    url: '/sys/getOneOrganization',
    method: 'post',
    data
  })
}

// 查询机构列表all
export function getOrganizationList(data) {
  return axios({
    url: '/sys/getOrganizationList',
    method: 'get',
    data
  })
}

// 查询机构列表page
export function getOrganizationListPage(data) {
  return axios({
    url: '/sys/getOrganizationListPage',
    method: 'post',
    data
  })
}

// 修改机构
export function modifyOrganization(data) {
  return axios({
    url: '/sys/modifyOrganization',
    method: 'post',
    data
  })
}

// 新增部门
export function addBranch(data) {
  return axios({
    url: '/sys/addBranch',
    method: 'post',
    data
  })
}

// 删除部门
export function deleteBranch(data) {
  return axios({
    url: '/sys/deleteBranch',
    method: 'get',
    params: data
  })
}

// 部门列表
export function getBranchList(data) {
  return axios({
    url: '/sys/getBranchList',
    method: 'post',
    data
  })
}

// 查询部门列表(Page)
export function getBranchListPage(data) {
  return axios({
    url: '/sys/getBranchListPage',
    method: 'post',
    data
  })
}

// 查询部门详情
export function getOneBranch(data) {
  return axios({
    url: '/sys/getOneBranch',
    method: 'post',
    data
  })
}

// 修改部门
export function modifyBranch(data) {
  return axios({
    url: '/sys/modifyBranch',
    method: 'post',
    data
  })
}
