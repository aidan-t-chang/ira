import interact from 'interactjs';

const position = { x: 0, y: 0 };
let isDropped = false;

interact('.draggable').draggable({
    listeners: {
        start (event) {
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
.on('move', function (event) {
    var interaction = event.interaction;
    if (interaction.pointerIsDown && !interaction.interacting()) {
        position.x = 0;
        position.y = 0;

        var original = event.currentTarget,
         clone = event.currentTarget.cloneNode(true);
        document.body.appendChild(clone);
        // position the clone to be at the original position
        clone.style.position = 'absolute';
        clone.style.right = '50px';
        clone.style.top = '25px';

        interaction.start({ name: 'drag'}, event.interactable, clone);
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