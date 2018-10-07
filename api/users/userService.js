var userModel = require('../../libs/mongo').userModel;


class UserServices {

    // save user
    async saveUser(userDetails) {
        const user = new userModel(userDetails);
        return await user.save();
    }

    // update user
    async updateUser(userId, userDetails) {
        return await userModel.findOneAndUpdate({ '_id': userId }, userDetails);
    }

    // delete user
    async deleteUser(userId) {
        return await userModel.findOneAndRemove({ '_id': userId });
    }

    // get users
    async getUsers() {
        return await userModel.find({});
    }

    // check user    
    async checkUser(userId) {
        return await userModel.findOne({ '_id': userId });
    }


}

module.exports = new UserServices();