// Form Validation JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const appointmentForm = document.getElementById('appointmentForm');
    const inquiryForm = document.getElementById('inquiryForm');
    
    if (appointmentForm) {
        initAppointmentForm(appointmentForm);
    }
    
    if (inquiryForm) {
        initInquiryForm(inquiryForm);
    }
});

// Appointment Form Initialization
function initAppointmentForm(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateAppointmentForm(form)) {
            showSuccessMessage(form, 'Your appointment has been booked successfully! We will contact you shortly.');
            form.reset();
        }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearError(this);
        });
    });
}

// Inquiry Form Initialization
function initInquiryForm(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateInquiryForm(form)) {
            showSuccessMessage(form, 'Thank you for your inquiry! We will get back to you within 24 hours.');
            form.reset();
        }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearError(this);
        });
    });
}

// Validate Appointment Form
function validateAppointmentForm(form) {
    let isValid = true;
    
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const phone = form.querySelector('#phone');
    const date = form.querySelector('#date');
    const time = form.querySelector('#time');
    const service = form.querySelector('#service');
    
    if (!validateName(name)) isValid = false;
    if (!validateEmail(email)) isValid = false;
    if (!validatePhone(phone)) isValid = false;
    if (!validateRequired(date, 'Please select a date')) isValid = false;
    if (!validateRequired(time, 'Please select a time')) isValid = false;
    if (!validateRequired(service, 'Please select a service')) isValid = false;
    
    return isValid;
}

// Validate Inquiry Form
function validateInquiryForm(form) {
    let isValid = true;
    
    const name = form.querySelector('#contactName');
    const email = form.querySelector('#contactEmail');
    const subject = form.querySelector('#subject');
    const message = form.querySelector('#message');
    
    if (!validateName(name)) isValid = false;
    if (!validateEmail(email)) isValid = false;
    if (!validateRequired(subject, 'Please enter a subject')) isValid = false;
    if (!validateMessage(message)) isValid = false;
    
    return isValid;
}

// Individual Field Validation
function validateField(field) {
    const fieldType = field.type;
    const fieldId = field.id;
    
    if (fieldId === 'name' || fieldId === 'contactName') {
        return validateName(field);
    } else if (fieldId === 'email' || fieldId === 'contactEmail') {
        return validateEmail(field);
    } else if (fieldId === 'phone') {
        return validatePhone(field);
    } else if (fieldId === 'message') {
        return validateMessage(field);
    } else {
        return validateRequired(field, 'This field is required');
    }
}

// Validate Name
function validateName(nameField) {
    const value = nameField.value.trim();
    
    if (value === '') {
        showError(nameField, 'Name is required');
        return false;
    }
    
    if (value.length < 2) {
        showError(nameField, 'Name must be at least 2 characters');
        return false;
    }
    
    if (!/^[a-zA-Z\s'-]+$/.test(value)) {
        showError(nameField, 'Name can only contain letters, spaces, hyphens, and apostrophes');
        return false;
    }
    
    clearError(nameField);
    return true;
}

// Validate Email
function validateEmail(emailField) {
    const value = emailField.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (value === '') {
        showError(emailField, 'Email is required');
        return false;
    }
    
    if (!emailRegex.test(value)) {
        showError(emailField, 'Please enter a valid email address');
        return false;
    }
    
    clearError(emailField);
    return true;
}

// Validate Phone
function validatePhone(phoneField) {
    const value = phoneField.value.trim();
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    
    if (value === '') {
        showError(phoneField, 'Phone number is required');
        return false;
    }
    
    if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 10) {
        showError(phoneField, 'Please enter a valid phone number (at least 10 digits)');
        return false;
    }
    
    clearError(phoneField);
    return true;
}

// Validate Message
function validateMessage(messageField) {
    const value = messageField.value.trim();
    
    if (value === '') {
        showError(messageField, 'Message is required');
        return false;
    }
    
    if (value.length < 10) {
        showError(messageField, 'Message must be at least 10 characters');
        return false;
    }
    
    clearError(messageField);
    return true;
}

// Validate Required Field
function validateRequired(field, message) {
    const value = field.value.trim();
    
    if (value === '') {
        showError(field, message);
        return false;
    }
    
    clearError(field);
    return true;
}

// Show Error Message
function showError(field, message) {
    const formGroup = field.closest('.form-group');
    let errorElement = formGroup.querySelector('.error-message');
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    field.style.borderColor = '#d32f2f';
}

// Clear Error Message
function clearError(field) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    if (errorElement) {
        errorElement.style.display = 'none';
    }
    
    field.style.borderColor = '#ddd';
}

// Show Success Message
function showSuccessMessage(form, message) {
    let successElement = form.querySelector('.success-message');
    
    if (!successElement) {
        successElement = document.createElement('div');
        successElement.className = 'success-message';
        form.insertBefore(successElement, form.firstChild);
    }
    
    successElement.textContent = message;
    successElement.style.display = 'block';
    
    // Scroll to success message
    successElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Hide after 5 seconds
    setTimeout(() => {
        successElement.style.display = 'none';
    }, 5000);
}

// Date validation - prevent past dates
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.querySelector('#date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
});
