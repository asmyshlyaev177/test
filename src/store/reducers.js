// import { combineReducers } from 'redux';

const initialState = {
  invoices: [],
  statusEdit: false,
  statusNew: false,
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
      return Object.assign({}, {...state, statusEdit: action.payload, statusNew: !action.payload})
    case 'NEW_STATUS':
      return Object.assign({}, {...state, statusNew: action.payload, statusEdit: !action.payload ? false : state.statusEdit})
    case 'EDIT_ITEM':
      return Object.assign({}, {...state, statusEdit: true, statusNew: false, form: action.payload})
    default:
      return state
  }
}

export default reducer
