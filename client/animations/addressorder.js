var parseColor = require("./parsecolor");

var interval, currentStrip = 0, color, stripsOrder = [];

function init(strips, settings) {

    var stripList = strips.strips.map((strip, index) => ({
        index: index,
        ip: strip.ip
    }));
    
    stripList.sort((a, b) => a.ip.localeCompare(b.ip));
    stripsOrder = stripList.map(s => s.index);
    
    color = parseColor(settings.color || "white");
    

    var speed = 1;
    switch(settings.speed) {
        case "fast": speed = 0.5; break;
        case "slow": speed = 2; break;
        case "superslow": speed = 5; break;
    }

    interval = setInterval(() => {
        currentStrip = (currentStrip + 1) % stripsOrder.length;
    }, speed * 1000);
}

function draw(strips) {
    strips.clearAll();
    if(stripsOrder.length > 0) {
        strips.fillSingle(stripsOrder[currentStrip], color);
    }
}

function terminate() {
    clearInterval(interval);
}

module.exports = {
    addressorder: {
        name: "IP Address Order",
        settings: {
            color: ["white", "red", "green", "blue", "rainbow"],
            speed: ["normal", "fast", "slow", "superslow"]
        },
        init: init,
        draw: draw,
        event: function() {},
        terminate: terminate,
        description: "Illuminates strips sequentially ordered by their IP addresses"
    }
}; 