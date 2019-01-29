// App Code
function todos (state = [], action){ // pure function
	switch(action.type){
		case 'ADD_TODO':
			return state.concat([action.todo])
		case 'REMOVE_TODO':
			// retorna um novo estado (um array) apenas com aqueles itens da lista
			// de afazeres cujas id's não correspondem à id da tarefa que queremos remover
			return state.filter( (todo) => todo.id !== action.id ) 
		case 'TOGGLE_TODO':
			// Para alternar a marcação de tarefa completa/incompleta, queríamos mudar o 
			//valor da propriedade complete em qualquer id que fosse passada com a ação correspondente.
			// // Mapeamos o estado como um todo e, se todo.id fosse correspondente à action.id, 
			//usamos Object.assign() para retornar um novo objeto com propriedades mescladas
			return state.map( (todo) => todo.id !== action.id ? todo : 
			Object.assign({}, todo, {complete: !todo.complete}) )
		default:
			return state
	}	
}

function goals (state = [], action){
	switch(action.type){
		case 'ADD_GOAL':
			return state.concat([action.goal])
		case 'REMOVE_GOAL':
			return state.filter( (goal) => goal.id !== action.id )
		default:
			return state
	}
}

function app (state = {}, action){
	return{
		todos: todos.(state.todos, action),
		goals: goals.(state.goals, action),
	}
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

const store = createStore(app)

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