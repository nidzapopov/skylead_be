import { Document, Types } from "mongoose";

export enum TaskStatus {
    TODO = "todo",
    IN_PROGRESS = "in_progress",
    DONE = "done"
}

export interface ITask extends Document {
    title: string;
    description: string;
    status: TaskStatus;
    userId: Types.ObjectId;
}