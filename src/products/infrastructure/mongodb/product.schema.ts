import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema(
    {
        timestamps: true,
        collection: 'products',
    },
)
export class ProductDocument extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    price: number;

    @Prop({ type: Types.ObjectId, required: true })
    owner: Types.ObjectId;

    @Prop({ default: 'active' })
    status: 'active' | 'inactive';

    @Prop({ default: Date.now })
    creation_date: Date;

    @Prop({ default: false })
    validated: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(ProductDocument);