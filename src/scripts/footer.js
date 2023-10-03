document.getElementById('openContactsModal').addEventListener('click', () => {
    $('#contactsModal').modal('show');
});

document.getElementById('openSupportModal').addEventListener('click', () => {
    $('#supportModal').modal('show');
});

const supportForm = document.getElementById('supportForm');
const sendButton = document.getElementById('sendButton');

sendButton.addEventListener('click', function () {
    const formData = new FormData(supportForm);
    let message = "Ihre Nachricht wurde erfolgreich gespeichert.\n";

    formData.forEach((value, key) => {
        message += key + ":" + value + "\n";
    });

    alert(message);

    supportForm.reset();
});