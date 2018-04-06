// import { combineReducers } from 'redux';

const initialState = {
  invoices: [],
  statusEdit: false,
  statusNew: false,
  formIndex: 0,
  form: {}
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOAD':
      return Object.assign({}, {...state, invoices: action.payload})
    case 'REMOVE_ITEM':
      let newInvoices = state.invoices.map(i => i).filter(i => i.id !== action.id)
      return Object.assign({}, {...state, invoices: newInvoices})
    case 'ADD_ITEM':
      return Object.assign({}, {...state, invoices: state.invoices.concat(action.payload)})
    case 'EDIT_STATUS':
      return Object.assign({}, {...state, statusEdit: action.payload})
    case 'NEW_STATUS':
      return Object.assign({}, {...state, statusNew: action.payload})
    case 'EDIT_ITEM':
      return Object.assign({}, {...state, statusEdit: true, statusNew: false})
    case 'SET_FORM':
      return Object.assign({}, {...state, form: action.payload.form, formIndex: action.payload.formIndex})
    case 'SAVE_EDITED':
      let newState = Object.assign({}, state)
      let formInd = newState.invoices.findIndex(el => el.id === action.payload.id)
      newState.invoices.splice(formInd, 1, action.payload)
      newState.invoices = Object.assign([], newState.invoices)
      return newState
    default:
      return state
  }
}

export default reducer
