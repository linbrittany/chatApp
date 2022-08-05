const activeUsers = [];

const addUser = ({ socketId, name, userId }) => {
    const exist = activeUsers.find(user => user.userId === userId);
    if (exist) {
        return { error: 'User already exist in this room' }
    }
    const user = { socketId, name, userId };
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

const getAllUsers = () => {
    return activeUsers
}

module.exports = { addUser, removeUser, getUser, getAllUsers };