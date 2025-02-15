import { ITask } from "./task";
import IUser from "./user";

export type DataForRespond = ITask | IUser | IUser[] | ITask[] | [];

export interface IResponse {
    message: string;
    data: DataForRespond;
    status: number;
}