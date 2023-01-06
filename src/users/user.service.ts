import { Model } from 'mongoose';
import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users, UsersDocument } from './Schema/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(Users.name) private readonly userModel: Model<UsersDocument>) { }
    async ListUsers(): Promise<Users[]> {
        return this.userModel.find().exec();
    }

    async RegisterUsers(createUser: Users): Promise<Users> {
        // const CreatedUser = new this.userModel(createUser);
        // return CreatedUser.save()
        const createdUser = await this.userModel.create(createUser);
        return createdUser
    }

    async searchId(id: string): Promise<Users> {
        const searchId = await this.userModel.findById({ _id: id }).exec();
        return searchId;
    }

    async updateUser(id: string, updateUser: Users): Promise<Users> {
        const updateUserId = await this.userModel.findByIdAndUpdate(id, { $set: updateUser })
        return updateUserId;
    }

    async deleteUser(id: string): Promise<Users> {
        const deletedUser = await this.userModel
            .findByIdAndRemove({ _id: id }).exec()
        return deletedUser;
    }
}
