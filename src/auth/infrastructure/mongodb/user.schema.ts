import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema(
    {
        timestamps: true,
        collection: 'users',
    },
)
export class UserDocument extends Document {
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    fullName: string;


}

export const UserSchema = SchemaFactory.createForClass(UserDocument);