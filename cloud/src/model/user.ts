import { BaseUser, expose } from './base'

export interface UserModel {}
export class UserModel extends BaseUser<UserModel> {}

export default expose(UserModel)