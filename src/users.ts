const users = [];

const addUser = ({ id, name, room }: { id: any; name: string; room: string }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => user.room === room && user.name === name);
    if (existingUser) {
        return { error: 'Username is taken' };
    }

    const user = { id, name, room };
    users.push(user);

    return { user };
};

const removeUser = (id: any) => {
    const index: number = users.findIndex((user) => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};

const getUser = (id: any) => users.find((user) => user.id === id);

const getUsersInRoom = (room: string) => {
    const usersInRoom = users.filter((user) => user.room === room);
    return usersInRoom;
};

export default { addUser, removeUser, getUser, getUsersInRoom };
