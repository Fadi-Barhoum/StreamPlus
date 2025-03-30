let currentStep = 1;

function nextStep() {
    if (currentStep === 1) {
        // Validate user info
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();

        if (!name || !email || !phone) {
            alert("Please fill in all required fields in the User Information form.");
            return;
        }

        // Validate email format
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        document.getElementById("user-info-form").style.display = "none";
        document.getElementById("formsStartUser").style.display = "none";
        document.getElementById("address-info-form").style.display = "block";
        document.getElementById("formsStartAddress").style.display = "block";
        currentStep = 2;
    } else if (currentStep === 2) {
        // Validate address info
        const address1 = document.getElementById("address1").value.trim();
        const country = document.getElementById("country").value;
        const city = document.getElementById("city").value;
        const postalCode = document.getElementById("postal-code").value.trim();
        const state = document.getElementById("state").value.trim();

        if (!address1 || !country || !city || !postalCode || !state) {
            alert("Please fill in all required fields in the Address Information form.");
            return;
        }

        document.getElementById("address-info-form").style.display = "none";
        document.getElementById("formsStartAddress").style.display = "none";

        const subscriptionType = document.getElementById("subscription-type").value;
        if (subscriptionType === "Premium") {
            document.getElementById("payment-info-form").style.display = "block";
            document.getElementById("formsStartPayment").style.display = "block";
            currentStep = 3;
        } else {
            showConfirmationModal();
        }
    } else if (currentStep === 3) {
        // Validate payment info
        const cardNumber = document.getElementById("card-number").value.trim();
        const expiryDate = document.getElementById("expiry-date").value.trim();
        const cvv = document.getElementById("cvv").value.trim();

        if (!cardNumber || !expiryDate || !cvv) {
            alert("Please fill in all required fields in the Payment Information form.");
            return;
        }

        // Validate credit card number (simple pattern check for length)
        const cardNumberPattern = /^[0-9]{16}$/;
        if (!cardNumberPattern.test(cardNumber)) {
            alert("Please enter a valid credit card number.");
            return;
        }

        // Validate expiry date format (MM/YY)
        const expiryDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
        if (!expiryDatePattern.test(expiryDate)) {
            alert("Please enter a valid expiration date (MM/YY).");
            return;
        }

        // Validate CVV (3 digits)
        const cvvPattern = /^[0-9]{3}$/;
        if (!cvvPattern.test(cvv)) {
            alert("Please enter a valid CVV.");
            return;
        }

        showConfirmationModal();
        // Continue with API submission logic here (after validation)
    }
}

function showConfirmationModal() {
    // Get user info
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    // Get address info
    const address1 = document.getElementById("address1").value.trim();
    const country = document.getElementById("country").value;
    const city = document.getElementById("city").value;
    const postalCode = document.getElementById("postal-code").value.trim();
    const state = document.getElementById("state").value.trim();

    // Get payment info
    const cardNumber = document.getElementById("card-number").value.trim();

    // Populate modal with information
    document.getElementById("confirmName").textContent = name;
    document.getElementById("confirmEmail").textContent = email;
    document.getElementById("confirmPhone").textContent = phone;
    document.getElementById("confirmAddress").textContent = address1;
    document.getElementById("confirmCountry").textContent = country;
    document.getElementById("confirmCity").textContent = city;
    document.getElementById("confirmPostalCode").textContent = postalCode;
    document.getElementById("confirmState").textContent = state;

    // Obfuscate card number (show only last 4 digits)
    const obfuscatedCardNumber = cardNumber.slice(0, -4).replace(/[0-9]/g, 'X') + cardNumber.slice(-4);
    document.getElementById("confirmCardNumber").textContent = obfuscatedCardNumber;

    // Show the modal
    const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
    confirmationModal.show();
}

document.getElementById("submitBtn").addEventListener("click", function() {
    // Get form data
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address1 = document.getElementById("address1").value.trim();
    const country = document.getElementById("country").value;
    const city = document.getElementById("city").value;
    const postalCode = document.getElementById("postal-code").value.trim();
    const state = document.getElementById("state").value.trim();
    const subscriptionType = document.getElementById("subscription-type").value;
    
    // Check if user has completed the form fields
    if (!name || !email || !phone || !address1 || !country || !city || !postalCode || !state) {
        alert("Please fill in all required fields.");
        return;
    }

    // If the subscription is "Premium", get payment info
    let paymentData = null;
    if (subscriptionType === "Premium") {
        const cardNumber = document.getElementById("card-number").value.trim();
        const expiryDate = document.getElementById("expiry-date").value.trim();
        const cvv = document.getElementById("cvv").value.trim();

        // Validate payment info
        if (!cardNumber || !expiryDate || !cvv) {
            alert("Please fill in all required fields in the Payment Information form.");
            return;
        }

        // Prepare payment data
        paymentData = {
            cardNumber: cardNumber,
            expiryDate: expiryDate,
            cvv: cvv
        };
    }

    // Prepare user and address data
    const userData = {
        name: name,
        email: email,
        phone: phone,
        address: {
            addressLine1: address1,
            country: country,
            city: city,
            postalCode: postalCode,
            state: state
        },
        subscriptionType: subscriptionType
    };

    // Combine data into one object
    const formData = {
        user: userData,
        payment: paymentData // Only include payment data if the subscription is "Premium"
    };

    console.log(formData);

    // Make the API request
    fetch('/api/subscribe', { // Replace with your actual API endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Data submitted successfully!");
            // Redirect to another page or handle response as needed
        } else {
            alert("Error submitting data: " + data.message);
        }
    })
    .catch(error => {
        console.error("Error:", error);
        alert("An error occurred while submitting your data. Please try again.");
    });
});

function prevStep() {
    if (currentStep === 2) {
        document.getElementById("address-info-form").style.display = "none";
        document.getElementById("user-info-form").style.display = "block";
        currentStep = 1;
    } else if (currentStep === 3) {
        document.getElementById("payment-info-form").style.display = "none";
        document.getElementById("address-info-form").style.display = "block";
        currentStep = 2;
    }
}

// Fetch countries 
function fetchCountries() {
    fetch('https://countriesnow.space/api/v0.1/countries')
        .then(response => response.json())
        .then(data => {
            const countries = data.data;
            const countrySelect = document.getElementById('country');
            countrySelect.innerHTML = '';
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Select a country';
            countrySelect.appendChild(defaultOption);
            countries.forEach(country => {
                const option = document.createElement('option');
                option.value = country.country;
                option.textContent = country.country;
                countrySelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching countries:', error));
}

// Fetch cities based on the selected country
function updateCities() {
    const country = document.getElementById('country').value;
    if (country) {
        fetch('https://countriesnow.space/api/v0.1/countries/cities', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                country: country
            })
        })
        .then(response => response.json())
        .then(data => {
            const cities = data.data;
            const citySelect = document.getElementById('city');
            citySelect.innerHTML = '';
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = 'Select a city';
            citySelect.appendChild(defaultOption);
            cities.forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                citySelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching cities:', error));
    } else {
        const citySelect = document.getElementById('city');
        citySelect.innerHTML = '';
    }
}

window.onload = function() {
    fetchCountries();
};
