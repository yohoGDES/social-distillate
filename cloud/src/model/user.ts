import { BaseUser, expose } from './base'

// TS doesn't like empty interfaces so when we need to add things do so
// export interface UserModel {}
export class UserModel extends BaseUser<UserModel> {}

export default expose(UserModel)