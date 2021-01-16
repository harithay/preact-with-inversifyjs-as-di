import { injectable } from 'inversify';

@injectable()
export default class StorageService {
    _inMemoryStorage: { [key: string]: any } = {};
    store(key: string, value: any) {
        this.getLocalStorage().setItem(key, JSON.stringify(value))
    }

    getAsJSON(key: string) {
        const storedData = this.getLocalStorage().getItem(key);
        return storedData ? JSON.parse(storedData) : null;
    }

    getLocalStorage() {
        if (globalThis['localStorage']) {
            return localStorage;
        }
        return this.getInMemoryStorage();
    }

    getInMemoryStorage() {
        return {
            setItem: (key: string, value: any) => {
                this._inMemoryStorage[key] = value;
            },
            getItem: (key: string) => {
                return this._inMemoryStorage[key];
            }
        };
    }
}