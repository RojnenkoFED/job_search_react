
export const stateApp = {
	jobItemsData: [],
	isFetching: false,
	disabledPre: true,
	disabledNext: true
}

const reducer = (state = stateApp, action) => {
	switch (action.type) {
		case 'SEARCH_LOAD':
			return { ...state, isFetching: true, disabledPre: true, disabledNext: true };

		case 'SEARCH_NO_RESULT':
			return { ...state, isFetching: false, noResult: true};

		case 'SEARCH_SUCCESS':
			return { ...state, 
				isFetching: false,
				jobItemsData: action.payload,
			 };

		case 'PRE_BUTTON':
			return { ...state, disabledPre: action.value };
		
		case 'NEXT_BUTTON':
			return { ...state, disabledNext: action.value };	 

		default:
			return state;
	}
}

export default reducer;