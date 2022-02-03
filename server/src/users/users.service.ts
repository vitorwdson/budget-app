import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument } from './interfaces/user.interface';
import { UserInput } from './inputs/user.input';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  async getUserByID(userId: any): Promise<UserDocument> {
    return this.userModel.findById(userId).exec();
  }

  async getUserByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }

  async create(
    userData: UserInput,
  ): Promise<[UserDocument | null, number | null]> {
    try {
      const createdUser = new this.userModel(userData);
      return [await createdUser.save(), null];
    } catch (err) {
      return [null, err.code];
    }
  }
}
