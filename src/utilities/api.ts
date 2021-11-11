import Parse from 'parse'
import { http } from './http'
export * from './liveQuery'

const serverUrl = 'https://parseapi.back4app.com'
const appId = 'NgDawUcAizSiYxhLwSYeg0SRhrLeFrgvFt2Zp3hI'
const jsKey = '0G9xedC70tbiLD6OAEC62RGLNYVcPwfrrOHrMgd9'

export type ParsePointer = {
  className: string
  objectId: string
  __type: string
}

export type ParseNewRelation = {
  __op: string
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
export function setRelations(
  ids: string[],
  className: string
): ParseNewRelation {
  return {
    __op: 'AddRelation',
    objects: ids.map((id: string) => {
      return { ...setPointer(id, className) }
    })
  }
}

export async function queryRelation(
  id: string,
  columnName: string,
  targetClassName: string,
  queryAgainst: string
) {
  const query = encodeURI(
    `where={"${columnName}":{"__type":"Pointer","className":"${targetClassName}","objectId":"${id}"}}`
  )
  const { data } = await http.get(`/${queryAgainst}?${query}`)
  return data.results
}

export async function query(query: string, className: string) {
  const { data } = await http.get(
    `/${className}?${encodeURI(`where={${query}}`)}`
  )
  return data.results
}

export async function getRelation(
  id: string,
  key: string,
  relatedClass: string,
  className: string,
) {
  return await query(
    `"$relatedTo": {"object": {"__type":"Pointer","className": "${className}","objectId": "${id}"},"key": "${key}"}`,
    relatedClass
  )
}

export function getClassRelationObjects(payload: any) {
  return Object.entries(payload)
    .filter(
      (e: any) =>
        typeof e[1] === 'object' && e[1]?.__type === 'Relation'
    ) 
    .map((i) => {
      return { key: i[0], value: i[1] }
    })
}

// 
/**
 * getClassRelationObjects
 * TODO: This needs a test
 * 
const fixture = {
  objectId: 'ZYLzIyxJZ9',
  name: 'test event',
  location: '',
  date: '2021-11-08T12:48',
  description: '',
  blind: false,
  revealSequentially: false,
  showProgressBar: false,
  createdAt: '2021-11-09T03:49:02.802Z',
  updatedAt: '2021-11-09T03:49:02.802Z',
  host: { __type: 'Relation', className: '_User' },
  coHost: { __type: 'Relation', className: '_User' },
  group: { __type: 'Relation', className: 'Group' },
  beverages: { __type: 'Relation', className: 'Beverage' },
  guests: { __type: 'Relation', className: '_User' }
}

const resultFixture = [
  {
    "key": "host",
    "value": {
      "__type": "Relation",
      "className": "_User"
    }
  },
  {
    "key": "coHost",
    "value": {
      "__type": "Relation",
      "className": "_User"
    }
  },
  {
    "key": "group",
    "value": {
      "__type": "Relation",
      "className": "Group"
    }
  },
  {
    "key": "beverages",
    "value": {
      "__type": "Relation",
      "className": "Beverage"
    }
  },
  {
    "key": "guests",
    "value": {
      "__type": "Relation",
      "className": "_User"
    }
  }
]
 */

export type RelationObject = {
  key: string
  value: {
    __type: string
    className: string
  }
}

export async function resolveRelationalChildren(payload: any, classObjectId: string, baseClass: string) {
  return await Promise.all(
    getClassRelationObjects(payload).map(async (relation: any) => {
      return {
        key: relation.key,
        value: await getRelation(
          classObjectId,
          relation.key,
          (relation.value as { __type: string; className: string }).className,
          baseClass
        )
      }
    })
  )
}


// new Parse.LiveQuerySubscription
// const client = new Parse.Li({
//   applicationId: 'Your app Id here',
//   serverURL: 'wss://' + 'Your domain here', // Example: 'wss://livequerytutorial.back4app.io'
//   javascriptKey: 'Your JavaScript key here'
// });
// client.open();

export { Parse as api }
