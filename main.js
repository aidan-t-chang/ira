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
                event.target.style.backgroundColor = 'red';
            } else {
                event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
                event.target.style.backgroundColor = '#29e';
                event.target.style.transitionDuration = '0.2s'
            }
        }
    }
})
.on('move', function (event) {
    var interaction = event.interaction;
    if (interaction.pointerIsDown && !interaction.interacting() && !event.currentTarget.classList.contains('cloned')) {
        position.x = 0;
        position.y = 0;

        var original = event.currentTarget,
         clone = event.currentTarget.cloneNode(true);
        document.querySelector('.main-area').appendChild(clone);
        clone.classList.remove('original');
        var originalRect = original.getBoundingClientRect();
        var blendContainerRect = document.querySelector('.main-area').getBoundingClientRect();
        
        clone.style.position = 'absolute';
        clone.style.left = (originalRect.left - blendContainerRect.left) + 'px';
        clone.style.top = (originalRect.top - blendContainerRect.top) + 'px';
        clone.style.right = 'auto'; // clear any existing right positioning
        clone.classList.add('cloned');
        interaction.start({ name: 'drag'}, event.interactable, clone);
    }
    else if (interaction.pointerIsDown && !interaction.interacting() && event.currentTarget.classList.contains('cloned')) {
        var matrix = new DOMMatrix(event.target.style.transform);
        var x = matrix.m41;
        var y = matrix.m42;
        position.x = x;
        position.y = y;
    }
})
.on('doubletap', function (event) {
    position.x = 0;
    position.y = 0;
    event.currentTarget.remove();
})

interact('.dropzone').dropzone({
    accept: '.draggable',
    overlap: 1,

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