import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepositoryPort } from '../../domain/ports/user.repository.port';
import { User } from '../../domain/entities/user.entity';
import { UserDocument } from './user.schema';

@Injectable()
export class AuthMongodbAdapter implements UserRepositoryPort {
    constructor(
        @InjectModel(UserDocument.name) private readonly userModel: Model<UserDocument>,
    ) { }

    async save(user: User): Promise<User> {
        const createdUser = new this.userModel(user);
        const savedUser = await createdUser.save();
        return { id: savedUser.id, ...user };
    }

    async findByEmail(email: string): Promise<User | null> {
        const userDocument = await this.userModel.findOne({ email }).exec();
        if (!userDocument) {
            return null;
        }
        return { id: userDocument.id, email: userDocument.email, password: userDocument.password, fullName: userDocument.fullName };
    }

    async findById(id: string): Promise<User | null> {
        const userDocument = await this.userModel.findById(id).exec();
        if (!userDocument) {
            return null;
        }
        return { id: userDocument.id, email: userDocument.email, password: userDocument.password, fullName: userDocument.fullName };
    }
}