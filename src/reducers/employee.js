const initialState = {
	employees: [],
	employee: {},
}

const employee = (state = initialState, action = {}) => {
	switch(action.type) {
		case 'GET_EMPLOYEES':
			return {
				...state,
				employee: {},
				employees: action.value,
			}
		case 'CREATE_EMPLOYEE':
			return {
				...state,
			}
		case 'STORE_EMPLOYEE':
			return {
				...state,
				employee: {}
			}
		case 'EDIT_EMPLOYEE':
			return {
				...state,
				employee: action.value,
			}
		case 'UPDATE_EMPLOYEE':
			return {
				...state,
				employee: {}
			}
		case 'DELETE_EMPLOYEE':
			return {
				...state,
				employees: state.employees.filter(item => item.id !== parseInt(action.value))
			}
		default: return state
	}
}

export default employee;