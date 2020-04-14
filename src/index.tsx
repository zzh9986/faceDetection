import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import './scss/index.scss';

import Router from './router';

export default class Index extends React.Component<RouteComponentProps, {}> {
	render() {
		const { history, match, location } = this.props;
		return (
			<div className="sxz-module-app">
				<Router
					history={history}
					match={match}
					location={location}
				/>
			</div>
		);
	}
}
