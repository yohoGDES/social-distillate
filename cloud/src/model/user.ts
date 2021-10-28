import { BaseUser, BaseUserAttributes } from './base'

export interface User extends BaseUserAttributes {}

export interface UserModel extends User {}
export class UserModel extends BaseUser<User> {}
