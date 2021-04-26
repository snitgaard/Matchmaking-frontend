import {UserModel} from './user.model';

export interface MessageModel {
    message: string;
    user: UserModel;
    date: number;
}
