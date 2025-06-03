// Enhanced form validation with real-time feedback and better UX
document.addEventListener("templates-loaded", () => {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    // Add real-time validation on blur/input
    const inputs = form.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      input.addEventListener("blur", () => validateField(input));
      input.addEventListener("input", () => clearFieldError(input));
    });

    // Handle form submission
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get all form fields by their placeholders and aria-labels
      const nameField =
        this.querySelector('input[placeholder*="Name"]') ||
        this.querySelector('input[aria-label*="name"]');
      const emailField =
        this.querySelector('input[type="email"]') ||
        this.querySelector('input[placeholder*="E-mail"]');
      const phoneField =
        this.querySelector('input[type="tel"]') ||
        this.querySelector('input[placeholder*="Phone"]');
      const interestedField =
        this.querySelector('input[placeholder*="interested"]') ||
        this.querySelector('input[aria-label*="interested"]');
      const groupSizeField = this.querySelector(
        'input[placeholder*="Group size"]'
      );
      const datesField = this.querySelector('input[placeholder*="dates"]');
      const messageField = this.querySelector("textarea");

      let isValid = true;

      // Clear all previous errors
      clearAllErrors(this);

      // Validate all fields
      if (nameField) {
        if (!validateName(nameField)) isValid = false;
      }

      if (emailField) {
        if (!validateEmail(emailField)) isValid = false;
      }

      if (phoneField && phoneField.value.trim()) {
        if (!validatePhone(phoneField)) isValid = false;
      }

      if (interestedField) {
        if (!validateInterested(interestedField)) isValid = false;
      }

      if (groupSizeField && groupSizeField.value.trim()) {
        if (!validateGroupSize(groupSizeField)) isValid = false;
      }

      if (messageField) {
        if (!validateMessage(messageField)) isValid = false;
      }

      if (isValid) {
        showSuccess(this);
      } else {
        // Focus on first error field
        const firstError = this.querySelector(".field-error");
        if (firstError) {
          firstError.focus();
          firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    });
  });
});

// Individual field validation functions
function validateField(field) {
  const placeholder = field.placeholder.toLowerCase();
  const ariaLabel = (field.getAttribute("aria-label") || "").toLowerCase();

  if (placeholder.includes("name") || ariaLabel.includes("name")) {
    return validateName(field);
  } else if (field.type === "email" || placeholder.includes("mail")) {
    return validateEmail(field);
  } else if (field.type === "tel" || placeholder.includes("phone")) {
    return validatePhone(field);
  } else if (
    placeholder.includes("interested") ||
    ariaLabel.includes("interested")
  ) {
    return validateInterested(field);
  } else if (placeholder.includes("group size")) {
    return validateGroupSize(field);
  } else if (field.tagName === "TEXTAREA") {
    return validateMessage(field);
  }
  return true;
}

function validateName(field) {
  const value = field.value.trim();

  if (!value) {
    showFieldError(field, "Name is required");
    return false;
  }

  if (value.length < 2) {
    showFieldError(field, "Name must be at least 2 characters long");
    return false;
  }

  if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(value)) {
    showFieldError(
      field,
      "Name can only contain letters, spaces, hyphens, and apostrophes"
    );
    return false;
  }

  return true;
}

function validateEmail(field) {
  const value = field.value.trim();

  if (!value) {
    showFieldError(field, "Email is required");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    showFieldError(field, "Please enter a valid email address");
    return false;
  }

  return true;
}

function validatePhone(field) {
  const value = field.value.trim();

  if (!value) return true; // Phone is optional

  // Remove all non-digit characters for validation
  const cleanPhone = value.replace(/\D/g, "");

  if (cleanPhone.length < 8) {
    showFieldError(field, "Phone number must be at least 8 digits");
    return false;
  }

  if (cleanPhone.length > 15) {
    showFieldError(field, "Phone number must be no more than 15 digits");
    return false;
  }

  return true;
}

function validateInterested(field) {
  const value = field.value.trim();

  if (!value) {
    showFieldError(field, "Please tell us what services you're interested in");
    return false;
  }

  if (value.length < 3) {
    showFieldError(field, "Please be more specific about your interests");
    return false;
  }

  return true;
}

function validateGroupSize(field) {
  const value = field.value.trim();

  if (!value) return true; // Group size is optional

  const number = parseInt(value);
  if (isNaN(number) || number < 1 || number > 50) {
    showFieldError(field, "Group size must be a number between 1 and 50");
    return false;
  }

  return true;
}

function validateMessage(field) {
  const value = field.value.trim();

  if (!value) {
    showFieldError(field, "Message is required");
    return false;
  }

  if (value.length < 10) {
    showFieldError(
      field,
      "Please provide a more detailed message (at least 10 characters)"
    );
    return false;
  }

  if (value.length > 1000) {
    showFieldError(field, "Message is too long (maximum 1000 characters)");
    return false;
  }

  return true;
}

function showFieldError(field, message) {
  // Clear any existing errors for this field FIRST
  clearFieldError(field);

  // Style the field
  field.classList.add("field-error");
  field.style.borderColor = "#ff4444";
  field.style.backgroundColor = "#fff5f5";

  // Create error message element
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;
  errorDiv.style.cssText = `
    color: #ff4444;
    font-size: 14px;
    margin-top: 5px;
    display: block;
  `;

  // Insert error after the field
  field.parentNode.insertBefore(errorDiv, field.nextSibling);
}

function clearFieldError(field) {
  // Remove error styling
  field.classList.remove("field-error");
  field.style.borderColor = "";
  field.style.backgroundColor = "";

  // Remove ALL error messages related to this field
  let nextElement = field.nextElementSibling;
  while (nextElement && nextElement.classList.contains("error-message")) {
    const toRemove = nextElement;
    nextElement = nextElement.nextElementSibling;
    toRemove.remove();
  }
}

function clearAllErrors(form) {
  // Remove all error styling and messages
  const errorFields = form.querySelectorAll(".field-error");
  errorFields.forEach((field) => {
    field.classList.remove("field-error");
    field.style.borderColor = "";
    field.style.backgroundColor = "";
  });

  // Remove all error messages in the form
  const errorMessages = form.querySelectorAll(".error-message");
  errorMessages.forEach((msg) => msg.remove());

  // Remove any success messages
  const successMessages = form.querySelectorAll(".success-message");
  successMessages.forEach((msg) => msg.remove());
}

function showSuccess(form) {
  const successDiv = document.createElement("div");
  successDiv.className = "success-message";
  successDiv.innerHTML = `
    <strong>Thank you!</strong> Your message has been sent successfully. 
    We'll get back to you within 24 hours to discuss your mountain adventure.
  `;
  successDiv.style.cssText = `
    color: #155724;
    background-color: #d4edda;
    border: 1px solid #c3e6cb;
    padding: 15px;
    border-radius: 4px;
    margin-top: 20px;
    font-size: 16px;
  `;

  // Insert at the top of the form
  form.insertBefore(successDiv, form.firstChild);

  // Reset form
  form.reset();

  // Scroll to success message
  successDiv.scrollIntoView({ behavior: "smooth", block: "center" });

  // Remove success message after 8 seconds
  setTimeout(() => {
    if (successDiv.parentNode) {
      successDiv.remove();
    }
  }, 8000);
}
