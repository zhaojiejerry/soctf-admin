module.exports = {
  "code": 0,
  "msg": "成功",
  "data": {
    "checkedList": [
      1,
      2,
      5,
      6,
      17,
      18
    ],
    "treeList": [
      {
        "id": 1,
        "path": "/system",
        "name": "system",
        "redirect": "/system/user",
        "component": "layout",
        "meta": {
          "title": "系统管理",
          "icon": "iconfont icon-system",
          "activeMenu": null
        },
        "code": "10000",
        "hidden": false,
        "children": [
          {
            "id": 2,
            "path": "user",
            "name": "user",
            "redirect": null,
            "component": "user",
            "meta": {
              "title": "用户管理",
              "icon": "",
              "activeMenu": null
            },
            "code": "1000001",
            "hidden": false,
            "children": [
              {
                "id": 5,
                "path": "user/detail",
                "name": "userDetail",
                "redirect": null,
                "component": "userDetail",
                "meta": {
                  "title": "用户详情",
                  "icon": null,
                  "activeMenu": "/system/user"
                },
                "code": "100000101",
                "hidden": true,
                "children": []
              },
              {
                "id": 6,
                "path": "user/edit",
                "name": "userEdit",
                "redirect": null,
                "component": "userEdit",
                "meta": {
                  "title": "用户编辑",
                  "icon": null,
                  "activeMenu": "/system/user"
                },
                "code": "100000102",
                "hidden": true,
                "children": []
              },
              {
                "id": 17,
                "path": null,
                "name": null,
                "redirect": null,
                "component": null,
                "meta": {
                  "title": "重置密码",
                  "icon": null,
                  "activeMenu": null
                },
                "code": "100000103",
                "hidden": false,
                "children": []
              },
              {
                "id": 18,
                "path": null,
                "name": null,
                "redirect": null,
                "component": null,
                "meta": {
                  "title": "启用/停用",
                  "icon": null,
                  "activeMenu": null
                },
                "code": "100000104",
                "hidden": false,
                "children": []
              }
            ]
          },
          {
            "id": 3,
            "path": "role",
            "name": "role",
            "redirect": null,
            "component": "role",
            "meta": {
              "title": "角色管理",
              "icon": "",
              "activeMenu": null
            },
            "code": "1000002",
            "hidden": false,
            "children": []
          }
        ]
      }
    ]
  }
}
