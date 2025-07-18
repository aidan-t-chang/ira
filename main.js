import interact from 'https://cdn.jsdelivr.net/npm/interactjs@1.10.27/+esm';

const position = { x: 0, y: 0 };
let isDropped = false;
var vwidth = window.innerWidth;
var vheight = window.innerHeight;
const roomLength = 137;
const roomWidth = 201;
const bedLength = 85;
const bedWidth = 38.75;
const deskLength = 48;
const deskWidth = 24.25;
const wardLength = 38.25;
const wardWidth = 25.25;
const ptacLength = 20;
const ptacWidth = 62;
const doorLength = 30;
const doorWidth = 30;
const bathroomLength = 76;
const bathroomWidth = 26;
const cornerTriangleLength = 14;
const cornerTriangleWidth = 14;
var globalScale;

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

    document.querySelector(".scrollable-content").appendChild(newItem);
    modal.classList.remove("open");
}

function setRoom() {
    const hall = document.getElementById('hall').value;
    const wing = document.getElementById('wing').value;
    const room = document.getElementById('room').value;
    const ptac = document.querySelector('.ptac');
    const bathroom = document.querySelector('.bathroom');
    const door = document.querySelector('.door');
    const cornerTriangle = document.querySelector('.corner-triangle');
    const bathroomScaled = bathroomLength * globalScale;
    const doorScaled = doorLength * globalScale;
    const roomScaled = roomLength * globalScale;

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
            door.style.left = "auto";
            door.style.bottom = `${roomScaled - bathroomScaled - doorScaled}px`;
            door.style.top = "auto";
            door.style.right = 0;
            door.style.borderRadius = "0 0 0 100%";
            cornerTriangle.style.left = "auto";
            cornerTriangle.style.top = "auto";
            cornerTriangle.style.right = 0;
            cornerTriangle.style.bottom = 0;
            cornerTriangle.style.rotate = "0deg";
        }
        else {
            // ptac and bathroom are on the left(bottom) side of the room
            ptac.style.left = 0;
            ptac.style.top = "auto";
            ptac.style.right = "auto";
            ptac.style.bottom = 0;
            bathroom.style.left = "auto";
            bathroom.style.top = "auto";
            bathroom.style.right = 0;
            bathroom.style.bottom = 0;
            door.style.borderRadius = "100% 0 0 0";
            door.style.left = "auto";
            door.style.right = 0;
            door.style.bottom = "auto";
            door.style.top = `${roomScaled - bathroomScaled - doorScaled}px`;
            cornerTriangle.style.left = "auto";
            cornerTriangle.style.top = 0; 
            cornerTriangle.style.right = 0;
            cornerTriangle.style.bottom = "auto";
            cornerTriangle.style.rotate = "-90deg";
        }
    }
    else {
        if ((10 <= room && room <= 13) || (20 <= room && room <= 24)) {
            // ptac and bathroom are on the left(bottom) side of the room
            ptac.style.left = 0;
            ptac.style.top = "auto";
            ptac.style.right = "auto";
            ptac.style.bottom = 0;
            bathroom.style.left = "auto";
            bathroom.style.top = "auto";
            bathroom.style.right = 0;
            bathroom.style.bottom = 0;
            cornerTriangle.style.left = "auto";
            cornerTriangle.style.top = 0; 
            cornerTriangle.style.right = 0;
            cornerTriangle.style.bottom = "auto";
            cornerTriangle.style.rotate = "-90deg";
            door.style.borderRadius = "100% 0 0 0";
            door.style.left = "auto";
            door.style.right = 0;
            door.style.top = `${roomScaled - bathroomScaled - doorScaled}px`;
            door.style.bottom = "auto";
        }
        else {
            // ptac and bathroom are on the right(top) side of the room
            ptac.style.left = 0;
            ptac.style.top = 0;
            ptac.style.right = "auto";
            ptac.style.bottom = "auto";
            bathroom.style.left = "auto";
            bathroom.style.top = 0;
            bathroom.style.right = 0;
            bathroom.style.bottom = "auto";
            door.style.left = "auto";
            door.style.right = 0;
            door.style.top = "auto";
            door.style.bottom = `${roomScaled - bathroomScaled - doorScaled}px`;
            door.style.borderRadius = "0 0 0 100%";
            cornerTriangle.style.left = "auto";
            cornerTriangle.style.top = "auto";
            cornerTriangle.style.right = 0;
            cornerTriangle.style.bottom = 0;
            cornerTriangle.style.rotate = "0deg";
        }
    }
}

document.getElementById("addItem").addEventListener("click", addItem);
document.getElementById('setRoom').addEventListener("click", setRoom);
modal2.classList.add("open");

function saveState() {
    const dropzone = document.querySelector('.main-area');
    const elements = dropzone.querySelectorAll('.draggable.cloned');
    
    const state = {
        room: {
            hall: document.getElementById('hall').value,
            wing: document.getElementById('wing').value,
            room: document.getElementById('room').value
        },
        elements: Array.from(elements).map(element => {
            const matrix = new DOMMatrix(element.style.transform);
            const rect = element.getBoundingClientRect();
            
            return {
                width: element.style.width,
                height: element.style.height,
                text: element.textContent,
                transform: element.style.transform,
                backgroundColor: element.style.backgroundColor,
                left: element.style.left,
                top: element.style.top,
                right: element.style.right,
                bottom: element.style.bottom,
                x: matrix.m41,
                y: matrix.m42,
                rotation: Math.round(Math.atan2(matrix.b, matrix.a) * (180 / Math.PI)),
                classes: Array.from(element.classList)
            };
        })
    };
    
    const encodedState = btoa(JSON.stringify(state));
    const shareableUrl = `${window.location.origin}${window.location.pathname}?state=${encodedState}`;
    
    navigator.clipboard.writeText(shareableUrl).then(() => {
        showCopyPopup();
    }).catch(() => {
        prompt('Copy this shareable link:', shareableUrl);
    });
}

function showCopyPopup() {
    const existingPopup = document.querySelector('.copy-popup');
    if (existingPopup) {
        existingPopup.remove();
    }
    const popup = document.createElement('div');
    popup.className = 'copy-popup';
    popup.textContent = 'Link copied!';
    
    const saveButton = document.getElementById('saveState');
    const buttonRect = saveButton.getBoundingClientRect();
    const topBar = document.querySelector('.top-bar');
    const topBarRect = topBar.getBoundingClientRect();
    
    const buttonCenterX = buttonRect.left + (buttonRect.width / 2) - topBarRect.left;
    popup.style.left = (buttonCenterX - (popup.offsetWidth / 2)) + 'px';
    popup.style.top = (buttonRect.bottom - topBarRect.top + 5) + 'px';
    topBar.appendChild(popup);
    
    const popupWidth = popup.offsetWidth;
    popup.style.left = (buttonCenterX - (popupWidth / 2)) + 'px';
    
    setTimeout(() => popup.classList.add('show'), 10);
    
    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => popup.remove(), 300);
    }, 2000);
}

function loadStateFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedState = urlParams.get('state');
    
    if (!encodedState) return;
    
    try {
        const state = JSON.parse(atob(encodedState));
        if (state.room) {
            document.getElementById('hall').value = state.room.hall;
            document.getElementById('wing').value = state.room.wing;
            document.getElementById('room').value = state.room.room;
            setRoom(); 
        }
        
        const existingClones = document.querySelectorAll('.draggable.cloned');
        existingClones.forEach(clone => clone.remove());

        const dropzone = document.querySelector('.main-area');
        state.elements.forEach(elementData => {
            const element = document.createElement('div');
            
            elementData.classes.forEach(className => {
                element.classList.add(className);
            });
            
            element.style.width = elementData.width;
            element.style.height = elementData.height;
            element.style.transform = elementData.transform;
            element.style.backgroundColor = elementData.backgroundColor;
            element.style.position = 'absolute';
            element.style.left = elementData.left || 'auto';
            element.style.top = elementData.top || 'auto';
            element.style.right = elementData.right || 'auto';
            element.style.bottom = elementData.bottom || 'auto';
            element.textContent = elementData.text;
            
            dropzone.appendChild(element);
        });
        
    } catch (error) {
        console.error('Failed to load state from URL:', error);
        alert('Invalid share link format');
    }
}

document.getElementById('saveState').addEventListener('click', saveState);

window.addEventListener('load', loadStateFromUrl);

console.log(window.innerWidth, window.innerHeight);

function setEverythingDimensions() {
    const scale = Math.max(Math.floor(vwidth / 350), 0);
    globalScale = scale;
    console.log(scale);
    // 1 in = (scale) px
    const room = document.querySelector('.dropzone');
    const bathroom = document.querySelector('.bathroom');
    const ptac = document.querySelector('.ptac');
    const cornerTriangle = document.querySelector('.corner-triangle');
    const door = document.querySelector('.door');
    const bed = document.querySelector('.bed');
    const desk = document.querySelector('.desk');
    const ward = document.querySelector('.wardrobe');
    var to_scale = [room, bathroom, ptac, cornerTriangle, door, bed, desk, ward];
    
    for (let i = 0; i < to_scale.length; i++) {
        const element = to_scale[i];
        // console.log(element);
        if (element.classList.contains('bathroom')) {
            element.style.width = `${bathroomWidth * scale}px`;
            element.style.height = `${bathroomLength * scale}px`;
        } else if (element.classList.contains('ptac')) {
            element.style.width = `${ptacWidth * scale}px`;
            element.style.height = `${ptacLength * scale}px`;
        } else if (element.classList.contains('corner-triangle')) {
            element.style.borderLeft = `${cornerTriangleWidth * scale}px solid transparent`;
            element.style.borderBottom = `${cornerTriangleLength * scale}px solid blue`;
        } else if (element.classList.contains('door')) {
            element.style.width = `${doorLength * scale}px`;
            element.style.height = `${doorLength * scale}px`;
            var h = bathroom.style.height;
            var r = room.style.height;
            var rValue = parseInt(r);
            var hValue = parseInt(h);
            var news = rValue - hValue - (doorLength * scale);

            // element.style.top = `${news}px`;
            // element.style.bottom = 'auto';
        } else if (element.classList.contains('bed')) {
            element.style.width = `${bedWidth * scale}px`;
            element.style.height = `${bedLength * scale}px`;
        } else if (element.classList.contains('desk')) {
            element.style.width = `${deskWidth * scale}px`;
            element.style.height = `${deskLength * scale}px`;
        } else if (element.classList.contains('wardrobe')) {
            element.style.width = `${wardWidth * scale}px`;
            element.style.height = `${wardLength * scale}px`;
        } else if (element.classList.contains('dropzone')) {
            element.style.width = `${roomWidth * scale}px`;
            element.style.height = `${roomLength * scale}px`;
        }
    }
}

setEverythingDimensions();
setRoom();