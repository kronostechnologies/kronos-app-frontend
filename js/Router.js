// @flow
type ObjectClass = Class<{}>;
type ObjectClassPromise = Promise<ObjectClass>;
type Route = {
	match: RegExp | string;
	getClass: () => ObjectClassPromise;
}

export default class Router {
	constructor(routes: Route[]){
		this.routes = routes;
	}

	getClass(path): ObjectClassPromise {
		return new Promise((resolve, reject) => {
			this.routes.forEach((route: Route) =>{
				if(Router.testRoute(path, route)){
					resolve(route.getClass());
				}
			});

			reject('No route match:"' + path + '"');
		});
	}

	static testRoute(path: string, route: Route) {
		if(route.match && route.match === path){
			return true;
		}

		if(route.match instanceof RegExp && path.match(route.match)) {
			return true;
		}

		return false;
	}
}