import socket from 'socket.io';

import users from './users';

const { addUser, removeUser, getUser, getUsersInRoom } = users;

const sock = (server) => {
    const io = socket(server);

    io.on('connection', (socket) => {
        console.log(`Made socket connection to ${socket.id}.`);

        socket.on('join', ({ name, room }: { name: string; room: string }, callback: any) => {
            const { error, user } = addUser({ id: socket.id, name, room });

            if (error) {
                return callback(error);
            }

            socket.emit('message', { user: 'admin', text: `${user.name}, welcome to ${user.room}!` });
            socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined.` });

            socket.join(user.room);

            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

            callback();
        });

        socket.on('sendMessage', (message: string, callback: any) => {
            const user: any = getUser(socket.id);
            console.log(user);

            io.to(user.room).emit('message', { user: user.name, text: message });
            io.to(user.room).emit('message', { room: user.room, users: getUsersInRoom(user.room) });
            console.log(`User ${user.name} sent message.`);

            callback();
        });

        socket.on('disconnect', () => {
            const user = removeUser(socket.id);

            if (user) {
                console.log(`Removed used ${user.name}.`);
                io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` });
            }
        });
    });
};

export default sock;
