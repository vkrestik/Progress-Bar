class Progress {
    constructor(container) { 
        this.container = container;
        this.svg = container.querySelector('.svgBox');
        this.circle = container.querySelector('.movingCircle');
        this.valueInput = container.querySelector('.progressBarValue');
        this.animateSwitch = container.querySelector('input[name="progressBarAnimate"]');
        this.hideSwitch = container.querySelector('input[name="progressBarHide"]');

        this.isAnimated = false;
        this.value = 25;
        this.circleLength = this.circle.getTotalLength();
        this.circle.style.strokeDasharray = this.circleLength;
        this.updateDashOffset();
        this.setHidden(false);

        this.attachControls();
    }

    setValue(value) {
        if (value >= 0 && value <= 100) {
            this.value = value;
            this.updateDashOffset();
        }
    }

    updateDashOffset() {
        this.circle.style.strokeDashoffset = this.circleLength - (this.circleLength * this.value) / 100;
    }

    setAnimated(enabled) {
        this.isAnimated = enabled;
        if (enabled) {
            this.circle.style.animation = 'spin 1.5s linear infinite';
            this.circle.style.animationPlayState = 'running';
        } else {
            this.circle.style.animationPlayState = 'paused';
        }
    }

    setHidden(hidden) {
        this.svg.classList.toggle('svgHidden', hidden);
    }

    attachControls() {
        this.valueInput.addEventListener('change', e => this.setValue(Number(e.target.value)));
        this.animateSwitch.addEventListener('change', e => this.setAnimated(e.target.checked));
        this.hideSwitch.addEventListener('change', e => this.setHidden(e.target.checked));
    }
}

//
document.querySelectorAll('.progressContainer').forEach(container => {
    new Progress(container);
});


