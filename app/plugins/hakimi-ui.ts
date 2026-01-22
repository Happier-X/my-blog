import HakimiUi from 'hakimi-ui'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(HakimiUi)
})