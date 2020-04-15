import * as React from 'react';
import { Router, Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import Info from './pages/info';
import Course from './pages/course';

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
				<Route path={pathGenerate('signin')} component={SignIn} />
				<Route path={pathGenerate('signup')} component={SignUp} />
				<Route path={pathGenerate('info')} component={Info} />
				<Route path={pathGenerate('course')} component={Course} />
				<Route render={({ location }) => <Redirect to={redirectPathGenerate('signin', location)} />} />
			</Switch>
		</Router>
	);
}

export default MainRouter;
