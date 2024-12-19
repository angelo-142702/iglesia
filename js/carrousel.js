let radius = 240;
let autoRotate = true;
let rotateSpeed = -60;
let imgWith = 170;
let imgheight = 250;
let sx,sy,nx,ny, desx=0, desy=0,tx=0,ty=10;
const audio = document.getElementById("audio");
setTimeout(init , 1000);
document.addEventListener('click', play)
function play(){
    audio.play();
}
let odrag = document.getElementById("drag-container");
let ospin = document.getElementById("spin-container");
let aImg = ospin.getElementsByTagName("img");
let aEle = [...aImg];

ospin.style.width = imgWith + "px";
ospin.style.height = imgheight +"px";

let ground = document.getElementById("groud");
ground.style.width = (radius * 3) + "px";
ground.style.height = (radius * 3) + "px";
function init(delayTime){
    let longitud = aEle.length
    for (let i = 0; i < longitud; i++) {

        aEle[i].style.transform = `rotateY(${i*(360/longitud)}deg) translateZ(${radius}px)`;
        aEle[i].style.transition = "transform 1s";
        aEle[i].style.transitionDelay = delayTime || longitud-i / 4 +"s";
    }
}
function ampliTransform(obj){
    if (ty > 180) ty = 180;
    if (ty < 0) ty = 0;
    obj.style.transform = `rotateX(${(-ty)}deg) rotateY(${tx}deg)`;
}
function playSpin(yes){
    ospin.style.animationPlayState = (yes ? "running": "paused");

}
if (autoRotate) {
    let animationname = (rotateSpeed > 0 ? 'spin': 'spinRevert');
    ospin.style.animation= `${animationname} ${Math.abs(rotateSpeed)}s infinite linear`
}
document.onpointerdown = function(e){
    clearInterval(odrag.timer);
    let sx = e.clientX, sy = e.clientY;

    this.onpointermove = (e)=>{
        let nx = e.clientX, ny = e.clientY;
        
        desx = nx - sx;
        desy = ny - sy;

        tx += desx * 0.1;
        ty += desy * 0.1;

        ampliTransform(odrag);
        sx = nx;
        sy = ny;
    }
    this.onpointerup = (e) => {
        odrag.timer = setInterval(()=>{
            desx *= 0.95;
            desy *= 0.95;
            tx += desx * 0.1;
            ty += desy * 0.1;
            ampliTransform(odrag);
            playSpin(false);

            if(Math.abs(desx) < 0.5 && Math.abs(desy) < 0.5){
                clearInterval(odrag.timer);
                playSpin(true);
            }
        },17);
        this.onpointermove = this.onpointerup = null;
    };
    return false;
}
document.onmausewheel = function(e) {
    let d = e.wheelDelta / 20 || -e.datail;
    radius += d;
    init(1);
}