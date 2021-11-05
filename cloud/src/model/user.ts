/* eslint-disable @typescript-eslint/no-empty-interface */
import Parse from 'parse'
import { BaseUser, BaseUserAttributes } from './base'

export interface User extends BaseUserAttributes {}

export interface UserModel extends User {}
export class UserModel extends BaseUser<User> {}

// Not sure where to put this but I don't think it's working here
Parse.Object.registerSubclass('_User', UserModel)
