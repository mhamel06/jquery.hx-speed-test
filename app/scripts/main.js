var interval = null,
    duration = 2000;

var animateFnc = {

    jqhx: function (el) {
        var ratio = Math.floor(Math.random() * 180),
            dist = 400,
            xD = (dist * (Math.cos(ratio))),
            yD = (dist * (Math.sin(ratio)));

        $(el).hx({
            type: 'transform',
            //rotateZ: '-=1000',
            translate: {
                y: '+=' + yD,
                x: '+=' + xD
            },
            duration: duration
        }).done(function () {
            el.remove();
        });
    },
    tweenLite: function (el) {
        var ratio = Math.floor(Math.random() * 180),
            dist = 400,
            xD = (dist * (Math.cos(ratio))),
            yD = (dist * (Math.sin(ratio)));

        //console.log(xD)
        TweenLite.to(el, duration / 1000, {
            y: yD,
            x: xD,
            onComplete: function () {
                el.remove();
            }
        });
    }
};

function addEl(){
    var box = document.createElement('div');
    box.className = 'box';
    $('.container').append(box);
    animateFnc[$('select').val()](box);
}
function addBunch(amount){
    for(var x = 0; x < amount; x++){
        addEl();
    }
}

$('#start').on('click',function(){
    stats.begin();
    interval = window.setInterval(function() {
        addBunch($('#dots').val());
    }, 500);
});

$('#stop').on('click',function(){
    stats.end();

    clearInterval(interval);
});

var stats = new Stats();
stats.setMode(0); // 0: fps, 1: ms

// Align top-left
stats.domElement.style.position = 'absolute';
stats.domElement.style.right = '0px';
stats.domElement.style.top = '0px';

document.body.appendChild( stats.domElement );

setInterval( function () {

    stats.begin();

    // your code goes here

    stats.end();

}, 1000 / 60 );