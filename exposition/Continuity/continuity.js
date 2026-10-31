document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('drawingCanvas');
    const ctx = canvas.getContext('2d');
    const resetBtn = document.getElementById('resetCanvas');

    var isDrawing = false;
    var lastX = 0;
    var lastY = 0;

    function resizeCanvas() {
        const container = canvas.parentElement;
        const maxWidth = Math.min(400, container.clientWidth);
        canvas.style.width = maxWidth;
        canvas.style.height = maxWidth;

        const wrapper = canvas.parentElement;
        const labels = wrapper.querySelector('.canvas-labels');
        if (labels) {
            labels.style.width = canvas.style.width;
            labels.style.height = canvas.style.height;
        }
    }

    function initCanvas() {
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg-primary');
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border-color');
        ctx.lineWidth = 1;

        for (let x = canvas.width / 10; x <= canvas.width; x += canvas.width / 10) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }

        for (let y = canvas.height / 10; y <= canvas.height; y += canvas.height / 10) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, canvas.height);
        ctx.stroke();
    }

    function startDrawing(e) {
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        lastX = (e.clientX - rect.left)*scaleX;
        lastY = (e.clientY - rect.top)*scaleY;
    }

    function draw(e) {
        if (isDrawing){

        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        var currentX = (e.clientX - rect.left)*scaleX;
        var currentY = (e.clientY - rect.top)*scaleY;

        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent-secondary');
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(currentX, currentY);
        ctx.stroke();

        lastX = currentX;
        lastY = currentY;
        }
        else {
            return;
        }
    }

    function stopDrawing() {
        isDrawing = false;
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    canvas.addEventListener('touchstart', function(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });

    canvas.addEventListener('touchmove', function(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });

    canvas.addEventListener('touchend', function(e) {
        e.preventDefault();
        const mouseEvent = new MouseEvent('mouseup', {});
        canvas.dispatchEvent(mouseEvent);
    });

    resetBtn.addEventListener('click',function(){
        initCanvas();
    });

    resizeCanvas();
    initCanvas();

    window.addEventListener('resize', resizeCanvas);
});


document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('curvesCanvas');
    const curveSlider = document.getElementById('curveSlider');
    const sliderValue = document.getElementById('sliderValue');
    const button0=document.getElementById('x');
    const button1=document.getElementById('x2');
    const button2=document.getElementById('sinx');
    const button3=document.getElementById('quarter-circle');

    const ctx = canvas.getContext('2d');
    let jump = 0;
    
    function resize() {
        const container = canvas.parentElement;
        const maxWidth = Math.min(400, container.clientWidth);
        canvas.style.width = maxWidth;
        canvas.style.height = maxWidth;
        
        const wrapper = canvas.parentElement;
        const labels = wrapper.querySelector('.canvas-labels');
        if (labels) {
            labels.style.width = canvas.style.width;
            labels.style.height = canvas.style.height;
        }
    }
    
    function f(x){
        return x;
    }
    function f1(x){
        return x**2;
    }
    function f2(x){
        return (1+Math.sin(2* Math.PI * x))/2;
    }
    function f3(x){
        return (Math.sqrt(1-(Math.pow(x,2))));
    }

    const prototypes=[f,f1,f2,f3];
    var choice=0;

    button0.addEventListener('click',function(){
        choice=0;
        drawCurves();
    });
    button1.addEventListener('click',function(){
        choice=1;
        drawCurves();
    });
    button2.addEventListener('click',function(){
        choice=2;
        drawCurves();
    });
    button3.addEventListener('click', function(){
        choice=3;
        drawCurves();
    });

    function init() {
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg-primary');
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border-color');
        ctx.lineWidth = 1;
        
        for (let x = canvas.width / 10; x <= canvas.width; x += canvas.width / 10) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        
        for (let y = canvas.height / 10; y <= canvas.height; y += canvas.height / 10) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
        
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, canvas.height);
        ctx.stroke();
    }
    
    function drawCurves() {
        init();
        
        var width = canvas.width;
        var height = canvas.height;
        const discontinuity = width*0.5;

        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent-secondary');
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(0,(height*(1-prototypes[choice](0))));

        for (let i = 1; i <= discontinuity; i++) {
            var x = i / width;
            let y = prototypes[choice](x);
            var canvasY = height*(1-y);
            ctx.lineTo(i, canvasY);
        }
        ctx.stroke();
        
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent-secondary');
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        for (let i = discontinuity; i <= width; i++) {
            var x = i / width;
            let y = Math.min(1, Math.max(0, (jump+prototypes[choice](x))));
            var canvasY = height*(1-y);
            if (i == (discontinuity)) {
                ctx.moveTo(i, canvasY);
            } else {
                ctx.lineTo(i, canvasY);
            }
        }
        ctx.stroke();

        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-example');
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(width/2, height*(1-prototypes[choice](0.5)));
        let y = Math.min(1, Math.max(0, (jump+prototypes[choice](0.5))));
        ctx.lineTo(width/2, height*(1-y));
        ctx.stroke();
        ctx.setLineDash([]);
    }

    curveSlider.addEventListener('input', function() {
        jump = parseFloat(this.value);
        sliderValue.textContent = Math.abs(jump).toFixed(2);
        drawCurves();
    });

    resize();
    drawCurves();

    window.addEventListener('resize', resize);
});