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
            var matrix = new DOMMatrix(event.target.style.transform);
            var angle = Math.round(Math.atan2(matrix.b, matrix.a) * (180 / Math.PI));

            event.target.style.transform = `translate(${position.x}px, ${position.y}px) rotate(${angle}deg)`;
        },
        end (event) {
            if (!isDropped) {
                event.target.style.backgroundColor = 'red';
                var matrix = new DOMMatrix(event.target.style.transform);
                var left = matrix.m41;
                if (left >= -30) {
                    position.x = 0;
                    position.y = 0;
                    event.target.remove();
                }
            } else {
                var matrix = new DOMMatrix(event.target.style.transform);
                var angle = Math.round(Math.atan2(matrix.b, matrix.a) * (180 / Math.PI));

                event.target.style.transform = `translate(${position.x}px, ${position.y}px) rotate(${angle}deg)`;
                event.target.style.backgroundColor = '#29e';
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
    var matrix = new DOMMatrix(event.target.style.transform);
    var angle = Math.round(Math.atan2(matrix.b, matrix.a) * (180 / Math.PI));
    var x = matrix.m41;
    var y = matrix.m42;
    angle += 90;
    event.currentTarget.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
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

const open = document.getElementById("openModal");
const close = document.getElementById('closeModal');
const modal = document.getElementById("modal");
const open2 = document.getElementById("openModal2");
const close2 = document.getElementById('closeModal2');
const modal2 = document.getElementById("modal2");
const open3 = document.getElementById("openModal3");
const close3 = document.getElementById('closeModal3');
const modal3 = document.getElementById("modal3");

open.addEventListener('click', () => {
    modal.classList.add("open");
})

close.addEventListener("click", () => {
    modal.classList.remove("open");
})

open2.addEventListener('click', () => {
    modal2.classList.add("open");
})

close2.addEventListener("click", () => {
    modal2.classList.remove("open");
})

open3.addEventListener('click', () => {
    modal3.classList.add("open");
})

close3.addEventListener("click", () => {
    modal3.classList.remove("open");
})

function addItem() {
    const length = document.getElementById("length").value;
    const width = document.getElementById("width").value;
    const name = document.getElementById("name").value;

    if ((length <= 0) || (width <= 0) || (!length || !width)) {
        alert("Please enter a valid length and width.");
        return;
    }

    const newItem = document.createElement("div");
    newItem.classList.add("draggable");
    newItem.classList.add("original");
    newItem.style.width = `${length * 5}px`;
    newItem.style.height = `${width * 5}px`;
    newItem.textContent = name ? name : `Item (${length} x ${width})`;

    document.querySelector(".columnbar").appendChild(newItem);
    modal.classList.remove("open");
}

function setRoom() {
    const hall = document.getElementById('hall').value;
    const wing = document.getElementById('wing').value;
    const room = document.getElementById('room').value;
    const ptac = document.querySelector('.ptac');
    const bathroom = document.querySelector('.bathroom');

    if (!hall || !wing || !room) {
        alert("Please enter a valid hall, wing, and room number.");
        return;
    }
    if (wing === "B" || wing === "D") {
        if ((10 <= room && room <= 13) || (20 <= room && room <= 24)) {
            // ptac and bathroom are on the right(top) side of the room
            ptac.style.left = 0;
            ptac.style.top = 0;
            ptac.style.right = "auto";
            ptac.style.bottom = "auto";
            bathroom.style.left = "auto";
            bathroom.style.top = 0;
            bathroom.style.right = 0;
            bathroom.style.bottom = "auto";
        }
        else {
            // ptac and bathroom are on the left(bottom) side of the room
            ptac.style.left = "auto";
            ptac.style.top = "auto";
            ptac.style.right = 0;
            ptac.style.bottom = 0;
            bathroom.style.left = 0;
            bathroom.style.top = "auto";
            bathroom.style.right = "auto";
            bathroom.style.bottom = 0;
        }
    }
    else {
        if ((10 <= room && room <= 13) || (20 <= room && room <= 24)) {
            // ptac and bathroom are on the left(bottom) side of the room
            ptac.style.left = 0;
            ptac.style.top = "auto";
            ptac.style.right = "auto";
            ptac.style.bottom = 0;
            bathroom.style.left = 0;
            bathroom.style.top = "auto";
            bathroom.style.right = "auto";
            bathroom.style.bottom = 0;
        }
        else {
            // ptac and bathroom are on the right(top) side of the room
            ptac.style.left = "auto";
            ptac.style.top = 0;
            ptac.style.right = 0;
            ptac.style.bottom = "auto";
            bathroom.style.left = "auto";
            bathroom.style.top = 0;
            bathroom.style.right = 0;
            bathroom.style.bottom = "auto";
        }
    }
}

document.getElementById("addItem").addEventListener("click", addItem);
document.getElementById('setRoom').addEventListener("click", setRoom);
modal2.classList.add("open");