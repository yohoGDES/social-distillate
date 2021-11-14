import { api } from '@/utilities/api'
import Parse from 'parse'

const serverUrl = 'https://parseapi.back4app.com'
const appId = 'NgDawUcAizSiYxhLwSYeg0SRhrLeFrgvFt2Zp3hI'
const jsKey = '0G9xedC70tbiLD6OAEC62RGLNYVcPwfrrOHrMgd9'
const liveQueryServerURL = 'wss://socialdistillate.b4a.io'
// initApi()
// api.LiveQ

Parse.initialize(appId, jsKey)
Parse.serverURL = serverUrl
Parse.liveQueryServerURL = liveQueryServerURL

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error

export const client = new Parse.LiveQueryClient({
  applicationId: appId,
  serverURL: liveQueryServerURL, // Example: 'wss://livequerytutorial.back4app.io'
  javascriptKey: jsKey
})
// client.open()

