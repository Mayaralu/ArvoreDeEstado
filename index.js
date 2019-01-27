// App Code
function todos (state = [], action){ // pure function
	if (action.type == 'ADD_TODO'){
		return state.concat([action.todo])
	}
	return state
}

// Library Code
function createStore(reducer) {
	// The store should have four parts
	// 1. The State
	// 2. Get the state
	// 3. Listen to changes on the state
	// 4. Update the state

	let state // variável que armazena o estado

	let listeners = []

	const getState = () => state // função que retorna o estado

	const subscribe = (listener) => {
		listeners.push(listener)

		return () => {
			listeners = listeners.filter( (l) => l !== listener )
		}
	}
	const dispatch = (action) => {
		state = reducer(state, action)
		listeners.forEach((listener) => listener())
	} 

	return {
		getState,
		subscribe,
		dispatch
	}	
}

const store = createStore(todos)

store.subscribe( () => {
	console.log('The new state is: ', store.getState())
} )

const unsubscribe = store.subscribe( () => {
	console.log('The store changes')
} )

const store = createStore(todos)

store.subscribe( () => {
	console.log('The new state is: ', store.getState())
} )

store.dispatch( {
	type: 'ADD_TODO',
	todo: {
		id: 0,
		name: 'Learn Redux',
		complete: false
	}
} )