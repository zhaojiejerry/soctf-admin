module.exports = {
  code: 0,
  msg: 'success',
  data: {
    user: {
      address: '反对大沙发刻录机',
      age: null,
      area: 370211,
      areaName: null,
      cardNo: null,
      city: 370200,
      cityName: null,
      createBy: '430086113063997452',
      createTime: '2019-09-25 01:59:23',
      email: null,
      gender: null,
      id: '442437627531104256',
      lastLoginTime: null,
      parentId: '3',
      parentName: null,
      password: '$2a$10$aSCvXsPPfr7jOsJI656vM.466sHks7tzDkNEiuxj5Ex7rQ3Eioxka',
      phone: '18354214075',
      province: 370000,
      provinceName: null,
      realName: '青岛xx驾校',
      remark: '发撒打发打发士大夫',
      roleList: [],
      status: 1,
      statusName: null,
      type: 3,
      typeName: null,
      updateBy: '430086113063997452',
      updateTime: '2019-09-26 17:05:09',
      currentLoginTime: '2019-10-10 11:57:09',
      lastLoginTime: '2019-09-26 17:05:09',
      username: 'lixin'
    },
    menu: [
      {
        path: '/system',
        name: 'system',
        redirect: '/system/user',
        component: 'layout',
        meta: { title: '账号管理', icon: 'iconfont icon-system' },
        children: [
          {
            path: 'user',
            name: 'user',
            component: 'user',
            meta: { title: '用户管理', icon: '' },
            children: [
              {
                path: 'detail',
                name: 'userDetail',
                component: 'userDetail',
                hidden: true,
                meta: { title: '用户详情', icon: '', activeMenu: '/system/user' },
                children: []
              },
              {
                path: 'edit',
                name: 'userEdit',
                component: 'userEdit',
                hidden: true,
                meta: { title: '用户编辑', icon: '', activeMenu: '/system/user' },
                children: []
              },
              {
                path: 'addSubAccount',
                name: 'addSubAccount',
                component: 'addSubAccount',
                hidden: true,
                meta: { title: '新建子账号', icon: '', activeMenu: '/system/user' },
                children: []
              },
              {
                path: 'subAccountInfo',
                name: 'subAccountInfo',
                component: 'subAccountInfo',
                hidden: true,
                meta: { title: '新建子账号', icon: '', activeMenu: '/system/user' },
                children: []
              }
            ]
          },
          {
            path: 'role',
            name: 'role',
            component: 'role',
            meta: { title: '角色管理', icon: '' },
            children: [
              {
                path: 'detail',
                name: 'roleDetail',
                component: 'roleDetail',
                hidden: true,
                meta: { title: '角色详情', icon: '', activeMenu: '/system/role' },
                children: []
              },
              {
                path: 'edit',
                name: 'roleEdit',
                component: 'roleEdit',
                hidden: true,
                meta: { title: '角色编辑', icon: '', activeMenu: '/system/role' },
                children: []
              }
            ]
          },
          {
            path: 'optLogList',
            name: 'optLogList',
            component: 'optLogList',
            meta: { title: '操作日志', icon: '' },
            children: []
          }
        ]
      },
      {
        path: '/info',
        name: 'info',
        redirect: '/info/health',
        component: 'layout',
        meta: { title: '信息管理', icon: 'iconfont icon-info' },
        children: [
          {
            path: 'healthPlatform',
            name: 'healthPlatform',
            component: 'healthPlatform',
            meta: { title: '体检审核工作台', icon: '' }
          },
          {
            path: 'artificialList',
            name: 'artificialList',
            component: 'artificialList',
            meta: { title: '人工体检', icon: '' },
            children: []
          },
          {
            path: 'artificialDetail',
            name: 'artificialDetail',
            component: 'artificialDetail',
            meta: { title: '人工体检详情', icon: '' },
            children: []
          }
        ]
      },
      {
        path: '/order',
        name: 'order',
        redirect: '/order/list',
        component: 'layout',
        meta: { title: '订单管理', icon: 'iconfont icon-device' },
        children: [
          {
            path: 'finance',
            name: 'finance',
            component: 'finance',
            meta: { title: '财务统计', icon: '' },
            children: []
          },
          {
            path: 'business',
            name: 'business',
            component: 'business',
            meta: { title: '业务订单', icon: '' },
            children: [
              {
                path: 'detail',
                name: 'businessDetail',
                component: 'businessDetail',
                hidden: true,
                meta: { title: '体检单详情', icon: '', activeMenu: '/order/business' },
                children: []
              },
              {
                path: 'info',
                name: 'businessInfo',
                component: 'businessInfo',
                hidden: true,
                meta: { title: '订单详情', icon: '', activeMenu: '/order/business' },
                children: []
              }
            ]
          },
          {
            path: 'list',
            name: 'orderList',
            component: 'orderList',
            meta: { title: '订单列表', icon: '' },
            children: [
              {
                path: 'orderDetails',
                name: 'orderDetail',
                component: 'orderDetails',
                hidden: true,
                meta: { title: '订单信息', icon: '', activeMenu: '/order/list' },
                children: []
              }
            ]
          },
          {
            path: 'checkBill',
            name: 'checkBill',
            component: 'checkBill',
            meta: { title: '对账统计', icon: '' },
            children: []
          }
        ]
      },
      {
        path: '/device',
        name: 'device',
        redirect: '/device/list',
        component: 'layout',
        meta: { title: '设备管理', icon: 'iconfont icon-device' },
        children: [
          {
            path: 'list',
            name: 'deviceList',
            component: 'deviceList',
            meta: { title: '设备列表', icon: '' },
            children: [
              {
                path: 'edit',
                name: 'editDevice',
                component: 'editDevice',
                hidden: true,
                meta: { title: '编辑设备', icon: '', activeMenu: '/device/list' },
                children: []
              },
              {
                path: 'detail',
                name: 'deviceInfo',
                component: 'deviceInfo',
                hidden: true,
                meta: { title: '设备信息', icon: '', activeMenu: '/device/list' },
                children: []
              }
            ]
          },
          {
            path: 'coding',
            name: 'deviceCoding',
            component: 'deviceCoding',
            meta: { title: '设备编码库', icon: '' },
            children: [
              {
                path: 'add',
                name: 'addDeviceCoding',
                component: 'addDeviceCoding',
                hidden: true,
                meta: { title: '新增设备编码库', icon: '', activeMenu: '/device/coding' },
                children: []
              }
            ]
          }
        ]
      },
      {
        name: 'config',
        path: '/config',
        component: 'layout',
        redirect: '/config/templeteList',
        meta: { title: '功能配置', icon: 'iconfont icon-function' },
        children: [
          {
            path: 'templeteList',
            name: 'templeteList',
            component: 'templeteList',
            meta: { title: '模板列表', icon: '' },
            children: [
              {
                path: 'addTemplete',
                name: 'addTemplete',
                component: 'addTemplete',
                hidden: true,
                meta: { title: '新建模板', icon: '', activeMenu: '/config/templeteList' },
                children: []
              }
            ]
          }
        ]
      }
    ],
    codeList: ['10000', '1000001', '100000101', '100000102', '100000103', '100000104', '100000201', '100000202', '1000002', '100000203', '100010201', '100020101', '100020102']
  }
}
