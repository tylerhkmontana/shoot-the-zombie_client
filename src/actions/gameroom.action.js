const roomCreated = roomInfo => ({
  type: 'ROOM_CREATED',
  payload: roomInfo
})

const updateUserList = userList => ({
  type: 'UPDATE_USERLIST',
  payload: userList
})
export { roomCreated, updateUserList }