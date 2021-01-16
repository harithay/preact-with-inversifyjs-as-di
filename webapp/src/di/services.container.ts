import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';
import StorageService from '../services/storage.service';
import TODOListService from '../services/todo-list.service';

// Must have https://www.npmjs.com/package/babel-plugin-transform-typescript-metadata
export const container = new Container({ autoBindInjectable: true });
container.bind('StorageService').to(StorageService).inSingletonScope();
container.bind('TODOListService').to(TODOListService).inSingletonScope();

// setup the container...
let { lazyInject: originalLazyInject } = getDecorators(container);

// Additional function to make properties decorators compatible with babel.
function fixPropertyDecorator<T extends Function>(decorator: T): T {
    return ((...args: any[]) => (
        target: any,
        propertyName: any,
        ...decoratorArgs: any[]
    ) => {
        decorator(...args)(target, propertyName, ...decoratorArgs);
        return Object.getOwnPropertyDescriptor(target, propertyName);
    }) as any;
}

export const lazyInject = fixPropertyDecorator(originalLazyInject);
