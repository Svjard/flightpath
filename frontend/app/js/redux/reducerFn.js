export default function reducerFn(initialState, actions={}) {
  const { actionFetch, actionSuccess, actionFail, actionReset } = actions;
  return (state=initialState, action)=> {
    switch (action.type) {
      case actionFetch:
        return {
          ...state,
          loading: true,
          error: null,
          syncing: !!action.syncing
        };
      case actionSuccess:
        return {
          ...state,
          loading: false,
          sync: true,
          syncing: false,
          error: null,
          data: action.data
        };
      case actionFail:
        return {
          ...state,
          loading: false,
          error: action.error.response.text,
          syncing: false
        };
      case actionReset:
        return { ...initialState };
      default:
        return state;
    }
  };
}
