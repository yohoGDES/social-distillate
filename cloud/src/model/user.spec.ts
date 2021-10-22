import User, { UserModel } from './user'

describe('model/User', () => {
    it('can be created', () => {
        const user = new User()
        expect(user).toBeDefined()
    })

    it('can still use Parse.User methods', () => {
        const user = new User()
        expect((user as UserModel).logIn).toBeDefined()
    })
})