// Button-Element referenzieren
let eventList: HTMLUListElement;
window.addEventListener("load", handleLoad);

function handleLoad(): void {
    const button = document.getElementById('myButton') as HTMLButtonElement;
    eventList = document.getElementById('eventList') as HTMLUListElement;

    document.addEventListener("mousemove", setInfoBox)
    // Event-Listener für den Button
button.addEventListener('click', function () {
    // Ein Custom-Event erstellen
    const customEvent = new CustomEvent('customEvent', {
        detail: { message: 'Button wurde geklickt!' },
        bubbles: true, // Das Event soll im DOM aufsteigen
        cancelable: true
    });

    // Das Custom-Event auf den Button auslösen
    button.dispatchEvent(customEvent);
    logEvent('Click', 'Button wurde geklickt');
});

}

// Funktion zum Hinzufügen von Events in den Event Inspector
function logEvent(eventType: string, detail: string) {
    const listItem = document.createElement('li');
    listItem.textContent = `${eventType}: ${detail}`;
    eventList.appendChild(listItem);
}



// Event-Listener für das document, um das Custom-Event abzufangen
document.addEventListener('customEvent', function (event: Event) {
    const customEvent = event as CustomEvent;
    console.log('Custom Event abgefangen!', customEvent.detail.message);
    logEvent('Custom Event', customEvent.detail.message);
});



function setInfoBox (_event: MouseEvent) {
    const infoBox = document.getElementById("infoBox");
    if (infoBox) {
        const mouseX = _event.clientX;
        const mouseY = _event.clientY;
        const offset = 10;

        infoBox.textContent = `Mouse Position: (${mouseX},${mouseY})`;
        infoBox.style.left = `${mouseX+offset}px`;
        infoBox.style.top = `${mouseY+offset}px`;
        infoBox.style.display = "block";

    }
}


function logEventInfo (_event: Event){
    console.log("Event Type:", _event.type);
    console.log("Event Type:", _event.target);
    console.log("Event CurrentType:", _event.currentTarget);
    console.log("Full Event Object:", _event);
}