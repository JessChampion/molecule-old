import * as React from 'react';

export interface IViewControllerProps {
}

// User controls etc go here

export default class ViewController extends React.Component<IViewControllerProps, any> {
    constructor(props: IViewControllerProps) {
        super(props);
    }

    render() {
        return (
            <div>Some Controls go here</div>
        );
    }
}
