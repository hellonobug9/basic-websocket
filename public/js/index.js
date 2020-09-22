const socket = io()

socket.on('message', (message) => {
    console.log(message);
})

document.querySelector('#location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Cannot access your location!')
    }
    navigator.geolocation.getCurrentPosition(function (position) {
        // console.log('position', position.coords.latitude)
        const { latitude, longitude } = position.coords;
        socket.emit('shareLocation', { latitude, longitude })
    });
})