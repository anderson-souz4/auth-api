import User from "../model/User.js";

class UserRepository {

    async findByid(id){
        try {
            console.log('chegou no findone')
            return await User.findOne({where: {id}});
        } catch (error) {
            console.log(error);
            return null;
        }

    }

    async findByEmail(email) {
        try {
            return await User.findOne({where: {email}});
        } catch (error) {
            console.log(error);
            return null;
        }
    }


}

export default new UserRepository();