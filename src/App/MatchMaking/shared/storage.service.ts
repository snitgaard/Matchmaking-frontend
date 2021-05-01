import {Injectable} from '@angular/core';
import {UserModel} from './user.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  saveChatClient(user: UserModel): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  loadChatClient(): UserModel | undefined {
    const userString = localStorage.getItem('user');
    if (userString) {
      const chatClient: UserModel = JSON.parse(userString);
      return chatClient;
    }
    return undefined;
  }
}
