import {createStore, applyMiddleware} from './redux'

let counter = (state = 0, action) => {
	if (action) {
		switch (action.type) {
			case 'ADD': {
				return state + 1
			}
			case 'SUB': {
				return state - 1
			}
			default : {
				return state
			}
		}
	} else {
		return state
	}
}

let logger = store => next => action => {
	console.log('前',store.getState())
	next(action)
	console.log('后',store.getState())
}

let store=applyMiddleware(logger)(createStore)(counter)
store.dispatch({type: 'ADD'})
store.dispatch({type: 'SUB'})
