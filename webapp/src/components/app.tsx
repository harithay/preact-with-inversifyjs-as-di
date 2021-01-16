import { Component, createRef, h } from "preact";
import { lazyInject } from '../di/services.container';
import TODOListService from '../services/todo-list.service';
import { LIST_CHANGED_EVENT_TYPE_ID } from '../services/todo-list.service';

interface AppState {
    itemCount: number;
    listItems: string[];
}
export default class App extends Component<any, AppState> {
    @lazyInject('TODOListService') todoListService: TODOListService;

    // Creates a reference to our html input element so that we can get its value
    inputElement = createRef<HTMLInputElement>();

    constructor() {
        super();
        this.state = {
            itemCount: this.todoListService.getItemCount(),
            listItems: this.todoListService.getListItems() || [],
        }

        // When event an item is added to the todoList, this will be notified of it.
        window.addEventListener(LIST_CHANGED_EVENT_TYPE_ID, () => {
            this.setState({ itemCount: this.todoListService.getItemCount() });
        });

        window.addEventListener(LIST_CHANGED_EVENT_TYPE_ID, () => {
            this.setState({ listItems: this.todoListService.getListItems() });
        });
    }

    addAndClearItem($event) {
        const item = this.inputElement.current.value;
        if (item && item.length > 0) {
            this.todoListService.addListItem(item);
        }
        this.inputElement.current.value = "";
    }

    render() {
        return (
            <div id="app">
                <div class="list-item-count">
                    You have {this.state.itemCount} items todo.
                </div>
                <div >
                    <div class="control-container">
                        <input ref={this.inputElement} type="text" />
                        <button onClick={($event) => this.addAndClearItem($event)}>Add</button>
                    </div>
                </div>
                <div class="todo-list">
                    {
                        // Render current list
                        this.state.listItems.map((item) => {
                            return <div>{item}</div>
                        })
                    }
                </div>
            </div>
        );
    }
}
