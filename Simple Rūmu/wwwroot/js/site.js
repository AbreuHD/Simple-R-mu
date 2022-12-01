"use strict";
const player = new Plyr('video', { captions: { active: true } });
var connection = new signalR.HubConnectionBuilder().withUrl("/movieHub").build();

// Expose player so it can be used from the console
window.player = player;


//Start Connection
connection.start().then(function () {
    console.log("Connected");
}).catch(function (err) {
    return console.error(err.toString());
});


//Get Connection Messages
connection.on("MovieStatus", function (status) {
    if (status == 0) {
        player.pause();
    }
    else if (status == 1){
        player.play();
    }
});

connection.on("MovieTime", function (time) {
    if ((player.currentTime - time) > 5 || 5 < (time - player.currentTime)) {
        player.currentTime = time;
    }
});


//Send Connection Messages
function sendMovieMessage(data) {
    connection.invoke("SendStatus", data).catch(function (err) {
        return console.error(err.toString());
    });
}

function sendMovieTime(data) {
    connection.invoke("SendTime", data).catch(function (err) {
        return console.error(err.toString());
    });
}

player.on('pause', (event) => {
    sendMovieMessage(0);
});


player.on('playing', (event) => {
    sendMovieMessage(1);
});

player.on('timeupdate', (event) => {
    sendMovieTime(player.currentTime)
});
