var objects = {
    "chips": {
        "mcu": document.getElementById("board3dChipMCU"),
        "chip": document.getElementById("board3dChipUnk"),
        "r1": document.getElementById("board3dChipResistor1"),
        "r2": document.getElementById("board3dChipResistor2"),
        "r3": document.getElementById("board3dChipResistor3"),
        "led": document.getElementById("board3dChipLED"),
        "c1": document.getElementById("board3dChipSMDC1"),
        "c2": document.getElementById("board3dChipSMDC2"),
        "c3": document.getElementById("board3dChipEC"),
        "t1": document.getElementById("board3dChipTransistor"),
        "plug": document.getElementById("board3dChipPlug")
    },
    "led": {
        "side1": document.getElementById("board3dChipLEDSideTop"),
        "side2": document.getElementById("board3dChipLEDSideLateral")
    },
    "traces": document.getElementById("board3dLayerTraces"),
    "pads": document.getElementById("board3dLayerPads"),
}
const staggerSleep = 500;

var currentAnimation = 0;

// Add some extra props by mutating initial array
var chips = {}
for (const chip in objects.chips) {
    if (Object.hasOwnProperty.call(objects.chips, chip)) {
        const element = objects.chips[chip];
        
        chips[chip] = {
            element,
            initialY: gsap.getProperty(element, 'y') - 10
        }
        gsap.set(element, {y: chips[chip].initialY, opacity: 0});
    }
}
objects.chips = chips;

objects.traces = {
    element: objects.traces,
    initialY: gsap.getProperty(objects.traces, 'y') - 20
}
gsap.set(objects.traces.element, {opacity: 0, y: objects.traces.initialY});

objects.pads = {
    element: objects.pads,
    initialY: gsap.getProperty(objects.pads, 'y') - 20
}
gsap.set(objects.pads.element, {opacity: 0, y: objects.pads.initialY});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

console.log(objects);
async function animateNext() {
    console.log('*');
    switch (currentAnimation) {
        case 0: {
            TweenLite.fromTo(objects.pads.element, 2, {y: objects.pads.initialY, opacity: 0, ease: "power4.out"}, {y: objects.pads.initialY + 20, opacity: 1});
            await sleep(staggerSleep);
        } break;
        case 1: {
            TweenLite.fromTo(objects.traces.element, 2, {y: objects.traces.initialY, opacity: 0, ease: "power4.out"}, {y: objects.traces.initialY + 20, opacity: 1});
            await sleep(staggerSleep);
        } break;
        case 2: {
                for (const chip in objects.chips) {
                    if (Object.hasOwnProperty.call(objects.chips, chip)) {
                        TweenLite.fromTo(objects.chips[chip].element, 2, {y: objects.chips[chip].initialY, opacity: 0, ease: "power4.out"}, {y: objects.chips[chip].initialY + 10, opacity: 1});
                        await sleep(staggerSleep);
                    }
                }
            }
            break;
        case 3: {
            objects.led.side1.classList.add("pulsing");
            objects.led.side2.classList.add("pulsing");
        }
        default:
            break;
    }
    currentAnimation++;

}