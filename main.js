import interact from 'interactjs';

const position = { x: 0, y: 0 };
let isDropped = false;

interact('.draggable').draggable({
    listeners: {
        start (event) {
            console.log(event.type, event.target);
            isDropped = false;
        },
        move (event) {
            position.x += event.dx;
            position.y += event.dy;

            event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
        },
        end (event) {
            if (!isDropped) {
                position.x = 0;
                position.y = 0;
                event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
            }
        }
    }
})

interact('.dropzone').dropzone({
    accept: '.draggable',
    overlap: 0.75,

    listeners: {
        drop (event) {
            isDropped = true;
        },

        dropactivate (event) {
            event.target.classList.add('drop-activated');
        },

        dropdeactivate (event) {
            event.target.classList.remove('drop-activated');
        }
    }

})