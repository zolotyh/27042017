const image = document.createElement('img');
document.body.appendChild(image);

image.style.position = 'absolute';
image.style.zIndex = 1000;
image.style.left = 0;
image.style.top = 0;

image.setAttribute('src', 'http://localhost:8080/img/css5.png');

image.onmousedown = function (e) {
    const coords = getCoords(image);
    const shiftX = e.pageX - coords.left;
    const shiftY = e.pageY - coords.top;

    image.style.position = 'absolute';
    moveAt(e);

    image.style.zIndex = 1000; // над другими элементами

    function moveAt(e) {
        image.style.left = e.pageX - shiftX + 'px';
        image.style.top = e.pageY - shiftY + 'px';
        window.pixelperfectconfig = getStyle(image);
    }

    document.onmousemove = function (e) {
        moveAt(e);
    };

    image.onmouseup = function () {
        document.onmousemove = null;
        image.onmouseup = null;
    };

}

image.ondragstart = function () {
    return false;
};

function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
}


function KeyPress(e) {
    if(e.altKey && e.code === 'KeyX'){ // x key
        const isVisible = image.style.display !== 'none'
        if(isVisible){
            image.style.display = 'none';
        } else {
            image.style.display = 'block';
        }
	return;
    }

    let step = 1;

    if(e.shiftKey){
        step = 10;
    }

    if(e.code === 'KeyO'){
        if(image.style.opacity > 0){
            image.style.opacity -= step/100;
            return;
        }
    }
    if(e.code === 'KeyP'){
        if(image.style.opacity < 1){
            image.style.opacity = +image.style.opacity + step/100;
            return;
        }
    }


    if(e.code === 'KeyH' || e.code === 'ArrowLeft'){
        image.style.left = +image.style.left.replace('px','') - step + 'px';
        e.preventDefault();
    }
    if(e.code === 'KeyL' || e.code === 'ArrowRight'){
        image.style.left = +image.style.left.replace('px','') + step + 'px';
        e.preventDefault();
    }
    if(e.code === 'KeyK' || e.code === 'ArrowUp'){
        image.style.top = +image.style.top.replace('px','') - step + 'px';
        e.preventDefault();
    }
    if(e.code === 'KeyJ' || e.code === 'ArrowDown'){
        image.style.top = +image.style.top.replace('px','') + step + 'px';
        e.preventDefault();
    }

    if(e.altKey && e.code === 'KeyR'){
        image.style.opacity = 1;
        image.style.display = 'block';
        image.style.left = 0;
        image.style.top = 0;
        window.pixelperfectconfig = null;
    }
    window.pixelperfectconfig = getStyle(image);
}

document.onkeydown = KeyPress;

document.addEventListener('DOMContentLoaded', function(){
    if(window.pixelperfectconfig){
        setStyle(image, window.pixelperfectconfig)
    }
});

function setStyle(elem, config){
    elem.style.opacity = config.opacity;
    elem.style.top = config.top;
    elem.style.left = config.left;
    elem.style.display = config.display
}

function getStyle(elem){
    return {
        opacity: elem.style.opacity,
        top:elem.style.top,
        left: elem.style.left,
        display: elem.style.display
    }
}


Object.defineProperty(window, "pixelperfectconfig", {
    get: function () {
        return JSON.parse(localStorage.getItem('.position'));
    },
    set: function(value){
        return localStorage.setItem('.position', JSON.stringify(value));
    }
});
