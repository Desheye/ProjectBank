document.addEventListener("DOMContentLoaded", function() {
    // Get the form element
    const form = document.getElementById('form_post');

    // Add an event listener for form submission
    form.addEventListener('submit', handleSubmit);

    // Handle form submission
    function handleSubmit(event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Get the values from the input fields
        const username = document.getElementById("user_name").value;
        const age = document.getElementById("age").value;
        const phoneNumber = document.getElementById("phone_number").value;
        const city = document.getElementById("city").value;
        const country = document.getElementById("country").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm_password").value;

        // Create an object with the form data
        const formData = {
            username,
            age,
            phoneNumber,
            city,
            country,
            email,
            password,
            confirm_password: confirmPassword,
        };

        // Send a POST request to the server with the form data
        fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log(data.message); // Handle successful form submission here
                console.log('Form submitted successfully and made it to the database');
            } else {
                console.error(data.message); // Handle form submission error here
            }
        })
        .catch(error => {
            console.error('Error:', error); // Handle network or other errors here
        });
    }

    console.log('Document Loaded');
});
