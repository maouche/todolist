function reducer(state, action) {
	switch (action.type) {
		case "fetch" : 
			return action.items;
		case "add" : 
			return [action.item, ...state];
		case "update" :
			const newStateAdd = [];
			state.forEach((item) => {
				if ( item.id === action.item.id ) {
					newStateAdd.push({...item, ...action.item});
				} else {
					newStateAdd.push(item);
				}
			});
			return newStateAdd;
		case "completed" :
			const newStatecompleted = [];
			state.forEach((item) => {
				if ( item.id === action.item.id ) {
					newStatecompleted.push({...item, ...action.item});
				} else {
					newStatecompleted.push(item);
				}
			});
			return newStatecompleted;
		case 'remove' : 
			return [...state.filter(item => item.id !== action.id)];
		default : 
			throw new Error("L'action " + action.type + " est inconnue.");
	}
}

export default reducer;