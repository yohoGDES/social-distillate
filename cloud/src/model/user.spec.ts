import { User, UserModel } from './user'

describe('model/User', () => {
    it('can be created', () => {
        const user = new UserModel()
        expect(user).toBeDefined()
    })

    it('can be a User', () => {
        const user: User = new UserModel()
        expect(user).toBeDefined()       
    })

    it('can still use Parse.User methods', () => {
        const user = new UserModel()
        expect((user as UserModel).logIn).toBeDefined()
    })
})