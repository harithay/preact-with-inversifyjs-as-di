import { inject, injectable } from 'inversify';
import StorageService from './storage.service';

const TODO_LIST_STORAGE_KEY = 'TODO_LIST_STORAGE_KEY';
export const LIST_CHANGED_EVENT_TYPE_ID = 'list-changed';
@injectable()
export default class TODOListService {

    constructor(
        @inject('StorageService') private storageService: StorageService,
    ) {
    }

    addListItem(item: string) {
        let todoList = this.storageService.getAsJSON(TODO_LIST_STORAGE_KEY);
        todoList = todoList || [];
        todoList.push(item);
        this.storageService.store(TODO_LIST_STORAGE_KEY, todoList);
        this.notifyListChanged();
    }

    getListItems() {
        let todoList = this.storageService.getAsJSON(TODO_LIST_STORAGE_KEY);
        todoList = todoList || [];
        return todoList;
    }

    getItemCount() {
        let todoList = this.storageService.getAsJSON(TODO_LIST_STORAGE_KEY);
        todoList = todoList || [];
        return todoList.length;
    }

    // In practice, this should the a Subject to which others can subscribe. 
    // But for the purpose of this article, I will just emit this as an event
    notifyListChanged() {
        window.dispatchEvent(new Event(LIST_CHANGED_EVENT_TYPE_ID))
    }
}