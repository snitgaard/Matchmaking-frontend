import {UserModel} from './user.model';

export interface ChatModel {
    message: string;
    user: UserModel;
    date: number;
}
