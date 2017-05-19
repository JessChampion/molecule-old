import * as React from 'react';
import {loadModel} from '../actions/model';
import View from '../components/View';
import ViewController from '../components/ViewController';
import {IStore, IStoreContext} from '../reducers';

const testJson = {
    people: [
        {
            id: 1,
            firstName: 'Jess',
            lastName: 'Champion',
            team: [
                'space-ops'
            ]
        },
        {
            id: 2,
            firstName: 'Tim',
            lastName: 'Kung',
            team: [
                'quantum-dragons'
            ]
        },
        {
            id: 3,
            firstName: 'Tobie',
            lastName: 'Jamie',
            team: [
                'quantum-dragons'
            ]
        },
        {
            id: 4,
            firstName: 'James',
            lastName: 'Ford',
            team: [
                'style-council'
            ]
        }
    ]
};

export default class MainView extends React.Component<any, any> {
    static contextTypes: React.ValidationMap<any> = {
        store: React.PropTypes.object
    };

    context: IStoreContext;
    unsubscribe: Function;


    componentDidMount() {
        // This helper wraps common code so we can initialze state and then subscribe.
        // this.unsubscribe = this.context.store.subscribe(this.setStateFromStore.bind(this));
        this.load();
    }

    load() {
        //noinspection TypeScriptValidateTypes
        this.context.store.dispatch(loadModel(testJson));
    }

    render() {
        return (
            <div>
                <h2>Molecule</h2>
                <ViewController/>
                <View/>
            </div>
        );
    }
};
