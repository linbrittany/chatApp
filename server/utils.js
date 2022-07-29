const activeUsers = [];

const addUser = ({ socketId, name, userId, roomId }) => {
    const exist = activeUsers.find(user => user.roomId === roomId && user.userId === userId);
    if (exist) {
        return { error: 'User already exist in this room' }
    }
    const user = { socketId, name, userId, roomId };
    activeUsers.push(user)
    console.log('Users list', activeUsers)
    return { user }
}

const removeUser = (socketId) => {
    const index = activeUsers.findIndex(user => user.socketId === socketId);
    if (index !== -1) {
        return activeUsers.splice(index, 1)[0]
    }
}

const getUser = (socketId) => activeUsers.find(user => user.socketId === socketId);

module.exports = { addUser, removeUser, getUser };