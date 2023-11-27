function validateform() {
    var partnerType = document.myform.partnerType.value;
    var name = document.myform.name.value;
    var email = document.myform.email.value;
    var mobno = document.myform.mobile.value;
    var pan = document.myform.pan.value;
    var pinCode = document.myform.pinCode.value;
    var kyc = document.myform.kyc.value;
    var upload = document.myform.upload.value;
    var pass = document.myform.password.value;
    var confpass = document.myform.confirmPassword.value;

    console.log(partnerType);

    if (partnerType == null || partnerType === "") {
        alert("Please select a partner type");
        return false;
    } else if (name == null || name === "") {
        alert("Name cannot be empty");
        return false;
    } else if (email == null || email === "") {
        alert("Email cannot be empty");
        return false;
    } else if (mobno == null || mobno === "") {
        alert("Mobile number cannot be empty");
        return false;
    } else if (mobno.length < 10) {
        alert("Mobile number should be of 10 digits");
        return false;
    } else if (pan == null || pan === "") {
        alert("PAN No cannot be empty");
        return false;
    } else if (!validatePan(pan)) {
        alert("Invalid PAN format");
        return false;
    } else if (pinCode == null || pinCode === "") {
        alert("Pin Code cannot be empty");
        return false;
    } else if (kyc == null || kyc === "") {
        alert("KYC input cannot be empty");
        return false;
    } else if (upload == null || upload === "") {
        alert("Please upload KYC documents");
        return false;
    } else if (!validateFileExtension(upload)) {
        alert("Invalid file format. Please upload a valid document (PDF, JPG, JPEG, PNG)");
        return false;
    } else if (pass == null || pass === "") {
        alert("Password cannot be empty");
        return false;
    } else if (pass.length < 6) {
        alert("Password must be at least 6 characters long");
        return false;
    } else if (confpass == null || confpass === "") {
        alert("Confirm Password cannot be empty");
        return false;
    } else if (pass !== confpass) {
        alert("Passwords do not match");
        return false;
    } else {
        // Call sendData function only if all validations pass
        sendData({
            partnerType,
            name,
            email,
            mobno,
            pan,
            pinCode,
            kyc,
            upload,
            pass,
            confpass
        });
        return false; // Prevent the default form submission
    }
}

function validatePan(pan) {
    // PAN format validation logic
    var panRegex = /^([A-Z]{5}[0-9]{4}[A-Z])$/;
    return panRegex.test(pan);
}

function validateFileExtension(fileName) {
    // Validate file extension logic
    var allowedExtensions = ['pdf', 'jpg', 'jpeg', 'png'];
    var fileExtension = fileName.split('.').pop().toLowerCase();
    return allowedExtensions.includes(fileExtension);
}

function togglePasswordVisibility() {
    var passwordInput = document.getElementById("password");
    var togglePassword = document.querySelector(".toggle-password");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.textContent = "👁️";
    } else {
        passwordInput.type = "password";
        togglePassword.textContent = "👁️";
    }
}

function togglePasswordVisibility1() {
    var confirmPasswordInput = document.getElementById("confirmPassword");
    var togglePassword = document.querySelector(".toggle-password");

    if (confirmPasswordInput.type === "password") {
        confirmPasswordInput.type = "text";
        togglePassword.textContent = "👁️";
    } else {
        confirmPasswordInput.type = "password";
        togglePassword.textContent = "👁️";
    }
}


function sendData(formData) {
    fetch("/userregister", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if(data){
            alert("Registration succesfull");
        }
        else{
            alert("Registration not Succesfull")
        }
        // Handle success or error response as needed
    })
    .catch(error => {
        console.error("Error:", error);
    });
}
