// @flow
import View from './View.js';

type ViewClass = Class<View>;
type ViewClassPromise = Promise<ViewClass>;
type Route = {
	viewName: string;
	getViewClass: () => ViewClassPromise;
}

export default class Router {
	constructor(routes: Route[]){
		this.routes = routes;
	}

	getViewClass(viewName): ViewClassPromise {
		return new Promise((resolve, reject) => {
			this.routes.forEach((route: Route) =>{
				if(Router.testRoute(viewName, route)){
					resolve(route.getViewClass());
				}
			});

			reject('View "' + viewName + '" not found');
		});
	}

	static testRoute(viewName: string, route: Route) {
		if(route.viewName === viewName || route.viewName === '*'){
			return true;
		}

		return false;
	}
}