import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  fullName: string;

  @Prop()
  email: number;

  @Prop()
  password: string;

  @Prop()
  phone: string;
}
export const UserSchema = SchemaFactory.createForClass(User);