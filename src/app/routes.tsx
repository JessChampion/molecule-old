import * as React from 'react';
import { IndexRoute, Route } from 'react-router';

import AppFrame from './views/AppFrame';
import MainView from './views/MainView';
import NotFoundView from './views/NotFoundView';

const routeMap = (
    <Route path="/" component={AppFrame}>
        <IndexRoute component={MainView}/>
    </Route>
);

export default routeMap;
