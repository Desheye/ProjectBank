document.addEventListener("DOMContentLoaded", function () {
  const userNameInput = document.getElementById("user_name");
  const ageInput = document.getElementById("age");
  const phoneInput = document.getElementById("phone_number");
  const cityInput = document.getElementById("city");
  const validCities = ["lagos", "ibadan", "oshogbo", "ekiti", "ondo", "ogun"];
  const countryInput = document.getElementById("country");
  const validCountry = "nigeria";
  const emailInput = document.getElementById("email");
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm_password");



  userNameInput.addEventListener("input", function () {
    const inputValue = userNameInput.value.trim();
    const names = inputValue.split(" ");

    if (
      names.length === 2 &&
      /^[a-zA-Z]+$/.test(names[0]) &&
      /^[a-zA-Z]+$/.test(names[1])
    ) {
      userNameInput.style.borderBottomColor = "green";
    } else {
      userNameInput.style.borderBottomColor = "red";
    }
  });

  /* Form Age Logic */

  ageInput.addEventListener("input", function () {
    const age = parseInt(ageInput.value);

    if (isNaN(age) || age < 18 || age > 99) {
      ageInput.setCustomValidity("Age must be between 18 and 99.");
      ageInput.style.borderBottomColor = "red";
    } else {
      ageInput.setCustomValidity("");
      ageInput.style.borderBottomColor = "green";
    }
  });

  /* Form Phone Logic */

  phoneInput.addEventListener("input", function () {
    const phoneNumber = phoneInput.value;

    if (phoneNumber.length !== 11 || !/^\d{11}$/.test(phoneNumber)) {
      phoneInput.setCustomValidity("Phone number must be exactly 11 digits.");
      phoneInput.style.borderBottomColor = "red";
    } else {
      phoneInput.setCustomValidity("");
      phoneInput.style.borderBottomColor = "green";
    }
  });

  /* Form Cities Logic */
  cityInput.addEventListener("input", function () {
    const inputValue = cityInput.value.toLowerCase().trim();

    if (validCities.includes(inputValue)) {
      cityInput.style.borderBottomColor = "green";
    } else {
      cityInput.style.borderBottomColor = "red";
    }
  });

    /* Form Country Logic */
    countryInput.addEventListener("input", function () {
        const inputValue = countryInput.value.toLowerCase().trim();
    
        if (validCountry.includes(inputValue)) {
          countryInput.style.borderBottomColor = "green";
        } else {
          countryInput.style.borderBottomColor = "red";
        }
      });

     /* Form Email Logic */
     emailInput.addEventListener("input", function() {
        const email = emailInput.value.trim();
    
        if (emailRegex.test(email)) {
          emailInput.setCustomValidity("");
          emailInput.style.borderBottomColor = "green";
        } else {
          emailInput.setCustomValidity("Please enter a valid email address.");
          emailInput.style.borderBottomColor = "red";
        }
      });

       /* Form Password Logic */

      function validatePasswordMatch() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
    
        if (password === confirmPassword) {
          passwordInput.setCustomValidity("");
          confirmPasswordInput.setCustomValidity("");
          passwordInput.style.borderBottomColor = "green";
          confirmPasswordInput.style.borderBottomColor = "green";
        } else {
          passwordInput.setCustomValidity("Passwords do not match");
          confirmPasswordInput.setCustomValidity("Passwords do not match");
          passwordInput.style.borderBottomColor = "red";
          confirmPasswordInput.style.borderBottomColor = "red";
        }
      }
    
      passwordInput.addEventListener("input", validatePasswordMatch);
      confirmPasswordInput.addEventListener("input", validatePasswordMatch);


  console.log("DOM content is loaded and parsed");
});

/* Form Submission Logic*/

document.getElementById('form_post').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch('/submit', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Form submitted successfully!');
        } else {
            alert('Form submission failed!');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while submitting the form.');
    });
});

