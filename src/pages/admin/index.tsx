import * as React from 'react';
import { Router, Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';

import Detail from './detail';
import Camera from './camera';
import Search from './search';

interface IRedirectGen {
	pathname: string,
	state: object
}

const MainRouter: React.FunctionComponent<RouteComponentProps> = (props) => {
	const { match, history } = props;

	const pathGenerate = (url: string): string => `${match.url}/${url}`;

	const redirectPathGenerate = (url: string, location: object): IRedirectGen => ({
		pathname: pathGenerate(url),
		state: { from: location }
	})

	return (
		<Router history={history}>
			<Switch>
				<Route path={pathGenerate('detail')} component={Detail} />
				<Route path={pathGenerate('search')} component={Search} />
				<Route path={pathGenerate('camera')} component={Camera} />
				<Route render={({ location }) => <Redirect to={redirectPathGenerate('detail', location)} />} />
			</Switch>
		</Router>
	);
}

export default MainRouter;
