const updateMessage = newMessage => ({
  type: 'UPDATE_MESSAGE',
  payload: newMessage
})

const deleteMessage = targetMessage => ({
  type: 'DELETE_MESSAGE',
  payload: targetMessage
})

export { updateMessage, deleteMessage }