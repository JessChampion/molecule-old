import * as React from 'react';
import {IStore, IStoreContext} from '../reducers';
import {IViewModelState} from '../reducers/reducers/viewModel';

import * as Physics from 'physicsjs';

// The mapping function tailors the store's state to the view's state.
function mapStateFromStore(store: IStore): IViewModelState {
    return {
        atoms: store.viewModel.atoms
    };
}

export default class View extends React.Component<any, any> {
    static contextTypes: React.ValidationMap<any> = {
        store: React.PropTypes.object
    };

    context: IStoreContext;
    unsubscribe: Function;
    world: any;
    molecules: Array<any>;

    constructor(props: any) {
        super(props);

        if (!this.state) {
            this.state = {atoms: []};
        }

        this.addCircle = this.addCircle.bind(this);
        this.molecules = [];
    }

    componentDidMount() {
        // This helper wraps common code so we can initialze state and then subscribe.
        this.setStateFromStore();
        this.unsubscribe = this.context.store.subscribe(this.setStateFromStore.bind(this));

        this.world = this.initWorld();
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }

    componentDidUpdate() {
        this.state.atoms.forEach((atom) => {
            this.addCircle(atom);
        });
    }

    setStateFromStore() {
        this.setState(mapStateFromStore(this.context.store.getState()));
    }

    render() {
        return (
            <div>
                <p>Hello, {JSON.stringify(this.state.atoms)}!</p>
            </div>
        );
    }

    addCircle(atom) {
        if (this.molecules[atom.person.id] === void 0) {
            // add a circle
            let circle = Physics.body('circle', {
                x: 50 + (atom.person.id * 60), // x-coordinate
                y: 30, // y-coordinate
                vx: 0.2, // velocity in x-direction
                vy: 0.01, // velocity in y-direction
                radius: atom.color === 'yellow' ? 40 : 20
            });

            this.molecules[atom.person.id] = circle;

            this.world.add(circle);

            this.world.step(new Date());
        } else {
            this.molecules[atom.person.id].radius = atom.color === 'yellow' ? 40 : 20;

            console.log(this.molecules);

            this.world.step(new Date());
        }
    }

    initWorld() {
        let world = Physics();
        let viewWidth = 600;
        let viewHeight = 400;

        var renderer = Physics.renderer('canvas', {
            el: 'viewport',
            width: viewWidth,
            height: viewHeight,
            meta: false, // don't display meta data
            styles: {
                // set colors for the circle bodies
                'circle' : {
                    strokeStyle: '#351024',
                    lineWidth: 1,
                    fillStyle: '#d33682',
                    angleIndicator: '#351024'
                }
            }
        });

        // add the renderer
        world.add(renderer);

        // render on each step
        world.on('step', () => {
            world.render();
        });

        // bounds of the window
        let viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);

        // constrain objects to these bounds
        world.add(Physics.behavior('edge-collision-detection', {
            aabb: viewportBounds,
            restitution: 0.99,
            cof: 0.99
        }));

        // ensure objects bounce when edge collision is detected
        world.add(Physics.behavior('body-impulse-response'));

        // add some gravity
        world.add(Physics.behavior('constant-acceleration'));

        // subscribe to ticker to advance the simulation
        Physics.util.ticker.on((time, dt) => {
            world.step(time);
        });

        // start the ticker
        Physics.util.ticker.start();

        return world;
    }
}
