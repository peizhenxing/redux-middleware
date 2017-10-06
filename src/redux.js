let createStore = (reducer) => {
	let state;
	let listeners = [];
	let getState = () => state;
	let subscribe = (listener) => {
		listeners.push(listener);
		return () => {
			listeners = listeners.filter(l => l !== listener);
		}
	}
	let dispatch = action => {
		state = reducer(state, action);
		listeners.forEach(l => l());
	}
	dispatch();
	return {
		getState,
		subscribe,
		dispatch
	}
}
//应用中间件
let applyMiddleware = (...middlewares) => createStore => reducer => {
	let store = createStore(reducer);
	middlewares = middlewares.map(middleware=>middleware(store));
	let dispatch = compose(...middlewares)(store.dispatch);
	return {
		...store, dispatch
	}
}

function compose(...fns){
	return function(...args){
		let last = fns.pop();
		return fns.reduceRight((composed,fn)=>{
			return fn(composed);
		},last(...args))
	}
}
export {createStore, applyMiddleware}