
export const searchLoad = () => ({ type: 'SEARCH_LOAD', });

export const searchSuccess = (res) => ({ 
  type: 'SEARCH_SUCCESS',
  payload: res
});

export const setPaginationNext = (bool) => ({ 
  type: 'NEXT_BUTTON',
  value: bool
});

export const setPaginationPre = (bool) => ({
   type: 'PRE_BUTTON',
   value: bool
  });

export const searchNoResult = () => ({ type: 'SEARCH_NO_RESULT' });


