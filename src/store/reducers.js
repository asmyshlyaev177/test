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
      let d = new Date()
      let day = ('0' + d.getDate()).slice(-2)
      let month = d.toDateString().split(' ')[1]
      let year = d.getFullYear()
      let newItem = {
        id: btoa(Math.random()).substring(0, 24).toLowerCase(),
        date_created: `${day} ${month} ${year}`,
        number: 0,
        date_due: action.due_date,
        date_supply: action.date_supply,
        comment: action.comment
      }
      return Object.assign({}, {...state, invoices: state.invoices.concat(newItem)})
    case 'EDIT_STATUS':
      return Object.assign({}, {...state, statusEdit: action.payload, statusNew: !action.payload})
    case 'NEW_STATUS':
      return Object.assign({}, {...state, statusNew: action.payload, statusEdit: !action.payload})
    case 'EDIT_ITEM':
      return Object.assign({}, {...state, statusEdit: true, statusNew: false, form: action.payload})
    default:
      return state
  }
}

export default reducer
