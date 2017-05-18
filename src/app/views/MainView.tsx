import * as React from 'react';
import View from '../components/View';
import ViewController from '../components/ViewController';

const MainView = React.createClass({
    render: () => {
        return (
            <div>
                <h2>Molecule</h2>
                <ViewController/>
                <View/>
            </div>
        );
    }
});

export default MainView;
