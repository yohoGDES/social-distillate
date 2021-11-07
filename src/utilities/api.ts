import Parse from 'parse'

const serverUrl = 'https://parseapi.back4app.com'
const appId = 'NgDawUcAizSiYxhLwSYeg0SRhrLeFrgvFt2Zp3hI'
const jsKey = '0G9xedC70tbiLD6OAEC62RGLNYVcPwfrrOHrMgd9'

export type ParsePointer = {
  className: string
  objectId: string
  __type: string
}

export type ParseNewRelation = {
  __op: string,
  objects: ParsePointer[]
}

export type UserDetails = {
  _localId: string
  _objCount: number
  className: string
  id: string
  attributes: any
}

export function initApi(): void {
  Parse.serverURL = serverUrl
  Parse.initialize(appId, jsKey)
}

export function setPointer(id: string, className: string): ParsePointer {
  return {
    className: className,
    objectId: id,
    __type: 'Pointer'
  }
}

export function setRelation(id: string, className: string): ParseNewRelation {
  return {
    __op: 'AddRelation',
    objects: [{ ...setPointer(id, className) }]
  }
}

export { Parse as api }
