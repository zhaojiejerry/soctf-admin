var express = require('express')

var commonSuccess = require('./commonSuccess')
var userInfo = require('./getUserInfo')
var btnPermission = require('./getBtnPermission')
var fileUpload = require('./fileUpload')
var getSign = require('./getSign')
var getUserTree = require('./getUserTree')
var getUserArea = require('./getUserArea')
var userPageList = require('./userPageList')
var getUserById = require('./getUserById')
var getUserHospitalList = require('./getUserHospitalList')
var roleList = require('./roleList')
var areaSelect = require('./areaSelect')
var getRoleById = require('./getRoleById')
var getRoleTree = require('./getRoleTree')
var getHealthList = require('./getHealthList')
var getPhotoList = require('./getPhotoList')
var getHealthById = require('./getHealthById')
var getHistoryVideo = require('./getHistoryVideo')
var getDeviceCodingList = require('./getDeviceCodingList')
var getDeviceList = require('./getDeviceList')
var getDeviceDetail = require('./getDeviceDetail')

var router = express.Router()

// axios请求模拟数据
router.post('/login', function(req, res) {
    res.json(commonSuccess)
})
router.post('/logout', function(req, res) {
    res.json(commonSuccess)
})
router.get('/sys/getOneUserInfo', function(req, res) {
    res.json(userInfo)
})
router.get('/user/perm/getListByParentId', function(req, res) {
    res.json(btnPermission)
})
router.post('/user/user/editPassword', function(req, res) {
    res.json(commonSuccess)
})
router.post('/health/healthReport/fileUpload', function(req, res) {
    res.json(fileUpload)
})
router.get('/user/userSign/getDetail', function(req, res) {
    res.json(getSign)
})
router.post('/user/userSign/editUserSign', function(req, res) {
    res.json(commonSuccess)
})
router.get('/user/user/getUserTree', function(req, res) {
    res.json(getUserTree)
})
router.get('/user/user/getUserAreaList', function(req, res) {
    res.json(getUserArea)
})
router.get('/device/device/getDeviceAreaList', function(req, res) {
    res.json(getUserArea)
})
router.get('/user/user/getPageList', function(req, res) {
    res.json(userPageList)
})
router.post('/user/user/resetPassword', function(req, res) {
    res.json(commonSuccess)
})
router.post('/user/user/toggleStatus', function(req, res) {
    res.json(commonSuccess)
})
router.get('/user/user/getDetail', function(req, res) {
    res.json(getUserById)
})
router.get('/user/user/getUserHospitalList', function(req, res) {
    res.json(getUserHospitalList)
})
router.get('/user/role/getList', function(req, res) {
    res.json(roleList)
})
router.post('/user/user/editUser', function(req, res) {
    res.json(commonSuccess)
})
router.get('/basic/area/getListByPid', function(req, res) {
    res.json(areaSelect)
})
router.post('/user/role/delete', function(req, res) {
    res.json(commonSuccess)
})
router.get('/user/role/getDetail', function(req, res) {
    res.json(getRoleById)
})
router.get('/user/perm/getAllTreeList', function(req, res) {
    res.json(getRoleTree)
})
router.post('/user/role/editRole', function(req, res) {
    res.json(commonSuccess)
})
router.get('/health/healthReport/getPageList', function(req, res) {
    res.json(getHealthList)
})
router.get('/health/healthReport/getPhotoPageList', function(req, res) {
    res.json(getPhotoList)
})
router.get('/health/healthReport/uploadHealthReport', function(req, res) {
    res.json(commonSuccess)
})
router.get('/health/healthReport/getDetail', function(req, res) {
    res.json(getHealthById)
})
router.get('/health/healthReport/getPageIndex', function(req, res) {
    res.json(getHealthById)
})
router.get('/health/healthReport/editCheckStatus', function(req, res) {
    res.json(commonSuccess)
})
router.get('/health/healthReport/getHistoryVideoUrl', function(req, res) {
    res.json(getHistoryVideo)
})
router.get('/device/device/getAllPageList', function(req, res) {
    res.json(getDeviceCodingList)
})
router.post('/device/device/editDevice', function(req, res) {
    res.json(commonSuccess)
})
router.get('/device/device/getPageList', function(req, res) {
    res.json(getDeviceList)
})
router.get('/device/device/delUserDevice', function(req, res) {
    res.json(commonSuccess)
})
router.get('/device/device/getDetail', function(req, res) {
    res.json(getDeviceDetail)
})
router.get('/device/device/saveUserDevice', function(req, res) {
    res.json(commonSuccess)
})

module.exports = router