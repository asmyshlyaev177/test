export function removeItem(id) {
  return {type: 'REMOVE_ITEM', id: id}
}

export function loadItems(payload) {
  return {type: 'LOAD', payload: payload}
}

export function addItem(payload) {
  return {type: 'ADD_ITEM', payload: payload}
}

export function editItem(payload) {
  return {type: 'EDIT_ITEM', payload: payload}
}

export function editStatus(payload) {
  return {type: 'EDIT_STATUS', payload: payload}
}

export function newStatus(payload) {
  return {type: 'NEW_STATUS', payload: payload}
}
