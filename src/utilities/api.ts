import Parse from 'parse'

const serverUrl = 'https://parseapi.back4app.com'
const appId = 'NgDawUcAizSiYxhLwSYeg0SRhrLeFrgvFt2Zp3hI'
const jsKey = '0G9xedC70tbiLD6OAEC62RGLNYVcPwfrrOHrMgd9'

export function initApi(): void {
  Parse.serverURL = serverUrl
  Parse.initialize(appId, jsKey)
}
export { Parse as api }
