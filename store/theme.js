export const state = () => ({
  visibleMenuMobile: false,
  visibleDialogLogin: false,
  visibleSearchMobile: false,
})

export const mutations = {
  TOGGLE_MENU_MOBILE(state) {
    state.visibleMenuMobile = !state.visibleMenuMobile
  },
  TOGGLE_DIALOG(state) {
    state.visibleDialogLogin = !state.visibleDialogLogin
  },
  TOGGLE_SEARCH_MOBILE(state) {
    state.visibleSearchMobile = !state.visibleSearchMobile
  },
}
