import * as mongoose from 'mongoose';
import { ITask, TaskStatus } from '../../interface/task';

const taskSchema = new mongoose.Schema<ITask>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: Object.values(TaskStatus), default: TaskStatus.TODO },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

const taskModel = mongoose.model<ITask & mongoose.Document>('Task', taskSchema);
export default taskModel;
