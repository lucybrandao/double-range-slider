class DoubleRangeSlider extends HTMLElement {
    constructor() {
        super()

        this.slider1 = null
        this.slider2 = null
        this.range1 = null
        this.range2 = null
        this.minGap = 3
        this.sliderMaxValue = null
        this.track = null

        this.startValue1 = 30
        this.startValue2 = 70

        this.currentValue1 = this.startValue1
        this.currentValue2 = this.startValue2

        this.build()
    }

    build() {
        const shadow = this.attachShadow({mode: 'open'});
        shadow.appendChild(this.styles());

        const wrapper = this.createWrapper();

        shadow.appendChild(wrapper);
    }

    createWrapper() {
        const wrapper = document.createElement('div')
        wrapper.classList.add('wrapper')

        const values = this.createValue()
        const sliders = this.createSliders()

        wrapper.appendChild(values)
        wrapper.appendChild(sliders)
        return wrapper
    }

    createValue() {
        const values = document.createElement('div');
        values.classList.add('values');

        this.range1 = document.createElement('span');
        this.range1.setAttribute('id', 'value1')
        this.range1.textContent = ' 0 '

        const valueseparator = document.createElement('span');
        valueseparator.innerHTML = ' &dash; '

        this.range2 = document.createElement('span');
        this.range2.setAttribute('id', 'value2')
        this.range2.textContent = ' 100 '

        values.appendChild(this.range1)
        values.appendChild(valueseparator)
        values.appendChild(this.range2)

        return values
    }

    createSliders(_, id) {
        const sliders = document.createElement('div');
        sliders.classList.add('container');

        this.track = document.createElement('div');
        this.track.classList.add('slider-track');

        this.slider1 = document.createElement('input');
        this.slider1.setAttribute('id', 'slider-1')
        this.slider1.setAttribute('type', 'range')
        this.slider1.setAttribute('min', 0)
        this.slider1.setAttribute('max', 100)
        this.slider1.setAttribute('value', this.currentValue1)

        this.slider2 = document.createElement('input');
        this.slider2.setAttribute('id', 'slider-2')
        this.slider2.setAttribute('type', 'range')
        this.slider2.setAttribute('min', 0)
        this.slider2.setAttribute('max', 100)
        this.slider2.setAttribute('value', this.currentValue2)

        this.slider1.addEventListener('input', this.slideOne.bind(this))
        this.slider2.addEventListener('input', this.slideTwo.bind(this))
        this.fillColor();

        sliders.appendChild(this.track)
        sliders.appendChild(this.slider1)
        sliders.appendChild(this.slider2)

        return sliders
    }

    slideOne(event) {
        let displayValOne = this.range1;

        if(parseInt(this.currentValue2) - parseInt(event.target.value) <= this.minGap) {
            event.target.value = parseInt(this.currentValue2) - this.minGap
            return
        }
        displayValOne.textContent = event.target.value;
        this.currentValue1 = event.target.value;

        this.fillColor();
    }

    slideTwo(event) {
        let displayValTwo = this.range2;

        if(parseInt(event.target.value) - parseInt(this.currentValue1) <= this.minGap) {
            event.target.value = parseInt(this.currentValue1) + this.minGap
            return
        }
        displayValTwo.textContent = event.target.value;
        this.currentValue2 = event.target.value;

        console.log(event.target.value, this.currentValue1, this.currentValue2)

        this.fillColor();
    }

    fillColor() {
        let sliderMaxValue = this.slider1.getAttribute('max')
        let sliderTrack = this.track

        const percent1 = (this.currentValue1/ sliderMaxValue) * 100;
        const percent2 = (this.currentValue2 / sliderMaxValue) * 100;
        sliderTrack.style.background = `linear-gradient(
            to right,
            #dadae5 ${percent1}%,
            #8a2be2 ${percent1}%,
            #8a2be2 ${percent2}%,
            #dadae5 ${percent2}%
        )`;
    }

    styles() {
        const style = document.createElement('style')
        style.textContent = `
            .wrapper {
                position: relative;
                max-width: 95vmin;
                padding: 30px;
            }
            
            .container {
                position: relative;
                width: 100%;
                height: 100px;
            }
            
            input[type="range"] {
                -webkit-appearance: none;
                -moz-appearance: none;
                appearance: none;
                width: 100%;
                outline: none;
                position: absolute;
                margin: auto;
                top: 0;
                bottom: 0;
                background-color: transparent;
                pointer-events: none;
            }
            
            .slider-track {
                width: 100%;
                height: 5px;
                position: absolute;
                margin: auto;
                top: 0;
                bottom: 0;
                border-radius: 5px;
            }
            
            input[type="range"]::-webkit-slider-runnable-track {
                -webkit-appearance: none;
                height: 0px;
            }
            
            input[type="range"]::-moz-range-track {
                -webkit-appearance: none;
                height: 0px;
            }
            
            input[type="range"]::-ms-track {
                appearance: none;
                height: 0px;
            }
            
            input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                height: 1.3em;
                width: 1.3em;
                background-color: #8a2be2;
                cursor: pointer;
                border-radius: 10px;
                pointer-events: auto;
                margin-top: -9px;
                pointer-events: auto;
            }
            
            input[type="range"]::-moz-range-thumb {
                -webkit-appearance: none;
                height: 1.3em;
                width: 1.3em;
                cursor: pointer;
                border-radius: 50%;
                background-color: #8a2be2;
                pointer-events: auto;
            }
            
            input[type="range"]::-ms-thumb {
                appearance: none;
                height: 1.3em;
                width: 1.3em;
                cursor: pointer;
                border-radius: 50%;
                background-color: #8a2be2;
                pointer-events: auto;
            }
            
            input[type="range"]:active::-webkit-slider-thumb {
                background-color: white;
                border: 2px solid #8a2be2;
            }
            
            .values {
                background-color: #8a2be2;
                width: 26%;
                position: relative;
                margin: auto;
                padding: 10px 10px;
                border-radius: 5px;
                text-align: center;
                font-weight: 500;
                font-size: 18px;
                color: white;
            }
            
            .values::before {
                content: "";
                position: absolute;
                height: 0;
                width: 0;
                border-top: 15px solid #8a2be2;
                border-left: 15px solid transparent;
                border-right: 15px solid transparent;
                margin: auto;
                bottom: -14px;
                left: 0;
                right: 0;
            }
        `
        return style
    }
}

customElements.define('double-range-slider', DoubleRangeSlider);

// window.onload = function() {
//     slideOne();
//     slideTwo();
// }

// let sliderOne = document.getElementById('slider-1');
// let sliderTwo = document.getElementById('slider-2');
// let displayValOne = document.getElementById('range1');
// let displayValTwo = document.getElementById('range2');
// let minGap = 0;
// let sliderTrack = document.querySelector('.slider-track');
// let sliderMaxValue = document.getElementById('slider-1').max;


// function slideOne() {
//     if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
//         sliderOne.value = parseInt(sliderTwo.value) - minGap;
//     }
//     displayValOne.textContent = sliderOne.value;
//     fillColor();
// }

// function slideTwo() {
//     if(parseInt(sliderTwo.value) - parseInt(sliderOne.value) <= minGap) {
//         sliderTwo.value = parseInt(sliderOne.value) + minGap;
//     }
//     displayValTwo.textContent = sliderTwo.value;
//     fillColor();
// }

// function fillColor() {
//     percent1 = (sliderOne.value/ sliderMaxValue) * 100;
//     percent2 = (sliderTwo.value / sliderMaxValue) * 100;
//     sliderTrack.style.background = `linear-gradient(
//         to right,
//         #dadae5 ${percent1}%,
//         #8a2be2 ${percent1}%,
//         #8a2be2 ${percent2}%,
//         #dadae5 ${percent2}%
//     )`;
// }
