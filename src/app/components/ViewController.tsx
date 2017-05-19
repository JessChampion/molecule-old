﻿import * as React from 'react';
import {updateViewModel} from '../actions/viewModel';
import {IStore, IStoreContext} from '../reducers';
import PersonSelector from './PersonSelector';

// User controls etc go here

// The mapping function tailors the store's state to the view's state.
function mapStateFromStore(store: IStore): any {
    return {
        model: store.model
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

    componentWillUpdate(nextProps, nextState) {
       this.processChange(nextState);
    }

    async processChange(nextState) {
        if (this.state.model !== nextState.model) {
            await this.setStateFromStore();
            this.context.store.dispatch(updateViewModel(this.state.model.people));
        }
    }

    render() {
        return (
            <div><PersonSelector/></div>
        );
    }
}
