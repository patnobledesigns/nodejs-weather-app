const inputValue = document.getElementById('input-value');
const formSubmit = document.getElementById('form-submit');
const message1 = document.getElementById('message-1');
const message2 = document.getElementById('message-2');



formSubmit.onclick = (e) => {
    e.preventDefault();

    const address = inputValue.value;
    message1.textContent = 'loading...';
    message2.textContent = '';
    const url = `/weather?address=${address}`;
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.error) {
                inputValue.value = '';
                message1.textContent = data.error;
            } else {
                inputValue.value = '';
                message1.textContent = data.location;
                message2.textContent = data.forecast;
            }
        })
        .catch((err) => {
            alert("Error Getting Json request");
        });
};