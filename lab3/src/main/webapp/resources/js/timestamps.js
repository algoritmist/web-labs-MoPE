"use strict";

function convert_timestamp(timestamp) {
    if (!isNaN(timestamp) && timestamp.match("^[0-9]+$")) {
        return new Date(+timestamp).toLocaleString();
    }
    return timestamp;
}

function convert_timestamps() {
    let timestamps = document.getElementsByClassName("timestamp");
    Array.prototype.forEach.call(timestamps, timestamp => {
        timestamp.innerHTML = convert_timestamp(timestamp.innerHTML);
    });
}

convert_timestamps();