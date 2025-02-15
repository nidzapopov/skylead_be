import mongoose, { Schema } from 'mongoose';
import IUser from '../../interface/user';

const UserSchema: Schema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);