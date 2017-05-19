import * as React from 'react';
import {updateViewModel} from '../actions/viewModel';
import {IStore, IStoreContext} from '../reducers';
import {createPersonView} from '../actions/viewModel';

// User controls etc go here

// The mapping function tailors the store's state to the view's state.
function mapStateFromStore(store: IStore): any {
    return {
        model: store.model
    };
}

export default class PersonSelector extends React.Component<any, any> {
    static contextTypes: React.ValidationMap<any> = {
        store: React.PropTypes.object
    };

    context: IStoreContext;
    unsubscribe: Function;

    constructor(props: any) {
        super(props);
        if (!this.state) {
            this.state = {atoms: []};
        }
    }

    componentDidMount() {
        // This helper wraps common code so we can initialze state and then subscribe.
        this.setStateFromStore();
        this.unsubscribe = this.context.store.subscribe(this.setStateFromStore.bind(this));
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    setStateFromStore() {
        this.setState(mapStateFromStore(this.context.store.getState()));
    }

    handleChange(event) {
        console.log(event.target.value);
        this.context.store.dispatch(createPersonView(event.target.value, this.state.model.people));
    }

    render() {
        const people = this.state.model ? this.state.model.people : [];
        let selected = null;
        return (
            <div>Some Controls go here
                <select onChange={(evt)=>this.handleChange(evt)}>
                    {people.map(function(person){
                        return <option key={person.id} value={person.id}>{person.firstName}</option>;
                    })}
                </select>
            </div>
        );
    }
}
