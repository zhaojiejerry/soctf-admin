// import { exportExcel } from "./order"

/**
 * 系统中所有的接口
 */
const constant = {
    login: '/login', // 系统登录
    logout: '/logout', // 登出
    getMenuList: '/user/menu', // 获取用户权限列表
    getUserInfo: '/sys/getOneUserInfo', // 获取用户信息
    getBtnPermission: '/user/perm/getListByParentId', // 获取页面按钮权限信息
    editPassword: '/user/user/editPassword', // 修改密码
    areaSelect: '/basic/area/getListByPid', // 省市区三级联动选择
    schoolList: '/basic/driverSchool/getDriverSchoolListByParentCode', // 查询区域下的驾校列表
    getDeviceAreaList: '/device/device/getDeviceAreaList', // 设备地点控件
    fileUpload: '/health/healthReport/fileUpload', // 文件上传
    getSign: '/user/userSign/getDetail', // 获取签字签章
    updateSign: '/user/userSign/editUserSign', // 修改签字签章
    // 用户部分
    userPageList: '/user/user/getPageList', // 用户列表
    getUserTree: '/user/user/getUserTree', // 用户树控件
    getUserAreaList: '/user/user/getUserAreaList', // 用户所在区域控件
    userResetPassword: '/user/user/resetPassword', // 重置密码
    userToggleStatus: '/user/user/toggleStatus', // 用户状态切换
    getUserById: '/user/user/getDetail', // 根据ID获取用户信息
    getUserHospitalList: '/user/user/getUserHospitalList', // 获取下级医院列表
    editUser: '/user/user/editUser', // 修改用户
    addUser: '/user/user/add', // 新建用户
    getUserDeviceTree: '/user/user/getUserDeviceTree', // 获取设备列表
    subAccountPageList: '/user/subAccount/pageList', // 获取子账号列表
    getPermTree: '/user/user/getPermTree', // 查询权限树
    addSubAccount: '/user/subAccount/add', // 新建子账号
    updateSubAccount: '/user/subAccount/modify', // 编辑子账号
    getSubAccountDetail: '/user/subAccount/detail', // 查询子账号信息
    // 个人中心
    getPersonalById: '/user/personal/getDetail',
    personalSubAccountPageList: '/user/personal/subAccount/pageList',
    editPersonalUser: '/user/personal/edit',
    getPersonalPermTree: '/user/personal/getPermTree',
    getPersonalSubAccountDetail: '/user/personal/subAccount/detail',
    updatePersonalSubAccount: '/user/personal/subAccount/modify',
    // 角色部分
    roleList: '/user/role/getList', // 角色列表
    roleDelete: '/user/role/delete', // 删除角色
    getRoleById: '/user/role/getDetail', // 根据ID获取角色信息
    getRoleTree: '/user/perm/getAllTreeList', // 角色ID获取权限树
    editRole: '/user/role/editRole', // 新建/修改角色
    // 体检单部分
    updateHealthInfo: '/health/healthReportDetail/editHealthReportDetail',
    getBizOrderDetails: '/health/healthReport/getBizOrderDetails',
    healthList: '/health/healthReport/getPageList', // 体检单管理--分页列表
    BusinessPageList: '/health/healthReport/getBusinessPageList', // 业务订单分页
    reviewList: '/health/workbench/pendingReviewList', // 未检体检单管理--分页列表
    currentCheckState: '/health/workbench/currentCheckState', // 审核工作台-体检单审核状态查询
    healthUpload: '/health/healthReport/uploadHealthReport', // 体检单管理--发送信息（上传）
    healthPreview: '/health/healthReport/preViewHealthReport', // 体检单管理--生成预览体检报告
    getHealthById: '/health/healthReport/getDetail', // 根据ID 获取体检单详情
    getPlatformHealthById: '/health/workbench/getDetail', // 根据ID 获取评审平台体检单详情
    healthCheck: '/health/healthReport/editCheckStatus', // 体检单审核
    platformHealthCheck: '/health/workbench/check', // 体检单审核
    getHistoryVideo: '/health/healthReport/getHistoryVideoUrl', // 获取历史视频播放地址
    getNextHealth: '/health/healthReport/getPageIndex', // 获取上一单（下一单）体检单
    photoPageList: '/health/healthReport/getPhotoPageList', // 照相信息管理--分页列表
    getHealthReportStatistics: '/health/healthReport/healthReportStatistics', // 获取体检统计数据
    toggleWaitCheckNoice: '/health/workbench/toggleWaitCheckNoice', // web-待审核开关
    getWaitCheck: '/health/workbench/getWaitCheck', // web-待审核开关
    // 设备编码库部分
    deviceCodingList: '/device/device/getAllPageList', // 编码库列表
    addDeviceCoding: 'device/device/editDeviceCode', // 新增/更新编码库
    generatorCode: '/device/device/generatorCode', // 生成设备编码
    getManufacturerList: '/basic/deviceManufacturer/getList', // 获取厂商名称列表
    addDeviceManufacturer: '/basic/deviceManufacturer/editDeviceManufacturer', // 新增厂商名称
    getModelList: 'basic/deviceModel/getList', // 获取设备型号列表
    addDeviceModel: '/basic/deviceModel/editDeviceModel', // 新增设备型号
    // 设备列表部分
    deviceList: '/device/device/getPageList', // 设备列表
    deleteDevice: '/device/device/delUserDevice', // 删除设备
    deviceDetail: '/device/device/getDetail', // 设备详情
    updateDevice: '/device/device/editDevice', // 新增、更新设备
    deviceRemoteControl: '/device/device/deviceRemoteControl', // 远程开关机
    getDeviceStatistics: '/device/device/deviceStatistics', // 获取管理设备统计数据
    startStream: '/device/videoStream/startStream', // 设备管理-获取实时视频接口
    // 系统配置部分
    templateList: '/user/template/getPageList', // 配置模板列表
    editTemplate: '/user/template/editTemplate', // 新增、更新模板信息
    templateDetail: '/user/template/getDetail', // 查询模板详情
    // 订单管理部分
    orderList: '/order/order/getPageList',
    orderStatistics: '/order/order/getOrderStatistics',
    getMerchantPayChannel: '/order/order/getMerchantPayChannel',
    exportExcelApi: '/order/order/exportOrder',
    orderDetails: '/order/order/getDetail',
    finance: '/order/income/stats',
    getOrdersByReportId: '/order/order/getOrdersByReportId',
    getDeviceListByUserId: '/health/healthReport/getDeviceListByUserId',
    exportBusinessExcel: '/health/healthReport/businessBillStatistics',
    // 对账单管理部分
    checkBill: '/order/order/statistic/getPageList',
    billCount: '/order/order/statistic/getGroupCount',
    updateBill: '/order/order/statistic/updateProcessedById',
    exportBill: '/order/order/statistic/exportProcessedList',

    // 短信验证部分
    sendSmsA: '/sms/message/sendSmsByUser', // 短信-发送短信
    sendSmsB: '/sms/message/sendSmsByPhone', // 短信-发送短信（手机号）
    sendSmsC: '/sms/message/sendSmsByUserAfterVerify', // 短信-发送短信（验证Id）
    sendSmsD: '/sms/message/sendSmsByPhoneAfterVerify', // 短信-发送短信（手机号+验证Id）
    checkCodeA: '/sms/message/checkCode', // 短信-校验验证码（只验证）
    checkCodeB: '/sms/message/checkAndDelCode', // 短信-校验验证码（验证+删除）
    editPhone: '/user/user/editPhone', // 更新手机号
    refundOrder: '/order/order/refundOrder', // 退款

    // 日志相关
    getLogList: '/log/operationLog/getOperationLogPageList', // 日志列表

    // 人工录入相关

    getOfflineList: '/health/offline/page', // 业务列表
    getOfflineDetail: '/health/offline/detail', // 业务详情
    offlineSave: '/health/offline/save', // 录入保存
    parseAdd: '/basic/area/parse', // 地址邮编解析
    offlineUpload: 'health/offline/upload', // 上传报告
    querySchool: '/basic/area/school/query', // 搜索驾校
    editInfo: '/health/offline/edit', // 编辑信息

    exportSixOne: '/health/healthReport/exportSixOne', // 导出六合一
    deviceDisable: 'device/device/deviceDisable', // 停用设备
    deviceEnable: 'device/device/deviceEnable' // 启用设备
}

export default constant