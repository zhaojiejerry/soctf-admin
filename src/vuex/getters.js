const getters = {
  token: state => state.token,
  menu: state => state.menu,
  user: state => state.user,
  isLoadMenu: state => state.isLoadMenu,
  permissionRoutes: state => state.permissionRoutes,
  btnPermissions: state => state.btnPermissions,
  multiVideoVisible: state => state.multiVideoVisible,
  cachedViews: state => state.cachedViews
}

export default getters
