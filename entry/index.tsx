import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

import Module from '../src/index';
import $history from './history';

ReactDOM.render(<div className="entry">
	<Router history={$history}>
		<Switch>
			<Route path={'/index'} component={Module} />
			<Route render={({ location }) => {
				const to = {
					pathname: '/index',
					state: { from: location }
				};
				return <Redirect to={to} />
			}}
			/>
		</Switch>
	</Router>
</div>, document.getElementById('moduleWrapperApp'));
