﻿import * as React from 'react';
import {loadModel} from '../actions/model';
import {IStore, IStoreContext} from '../reducers';
import View from '../components/View';
import ViewController from '../components/ViewController';

const testJson = {
    people: [
        {
            firstName: 'Jess',
            lastName: 'Champion',
            team: [
                'space-ops'
            ]
        },
        {
            firstName: 'Tim',
            lastName: 'Kung',
            team: [
                'quantum-dragons'
            ]
        },
        {
            firstName: 'Tobie',
            lastName: 'Jamie',
            team: [
                'quantum-dragons'
            ]
        },
        {
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
