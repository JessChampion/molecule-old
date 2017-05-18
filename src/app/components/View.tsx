import * as React from 'react';
import {IStore, IStoreContext} from '../reducers';
import {IViewModelState} from '../reducers/reducers/viewModel';

// The mapping function tailors the store's state to the view's state.
function mapStateFromStore(store: IStore): IViewModelState {
    return {
        atoms: store.viewModel.atoms
    };
}

export default class ViewController extends React.Component<any, any> {
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

    render() {
        return <p>Hello, {this.props.viewModel}!</p>;
    }
}
