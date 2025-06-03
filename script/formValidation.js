/**
 * Form validation with real-time feedback
 */

document.addEventListener("templates-loaded", () => {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    const inputs = form.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      input.addEventListener("blur", () => validateField(input));
      input.addEventListener("input", () => clearFieldError(input));
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

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
      const messageField = this.querySelector("textarea");

      let isValid = true;

      clearAllErrors(this);

      if (nameField && !validateName(nameField)) isValid = false;
      if (emailField && !validateEmail(emailField)) isValid = false;
      if (phoneField && phoneField.value.trim() && !validatePhone(phoneField))
        isValid = false;
      if (interestedField && !validateInterested(interestedField))
        isValid = false;
      if (
        groupSizeField &&
        groupSizeField.value.trim() &&
        !validateGroupSize(groupSizeField)
      )
        isValid = false;
      if (messageField && !validateMessage(messageField)) isValid = false;

      if (isValid) {
        showSuccess(this);
      } else {
        const firstError = this.querySelector(".field-error");
        if (firstError) {
          firstError.focus();
          firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    });
  });
});

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
  if (!value) return true;

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
  if (!value) return true;

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
  clearFieldError(field);

  field.classList.add("field-error");
  field.setAttribute("aria-invalid", "true");

  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.setAttribute("role", "alert");
  errorDiv.textContent = message;
  errorDiv.style.cssText = `
    color: #ff4444;
    font-size: 14px;
    margin-top: 5px;
    display: block;
  `;

  field.parentNode.insertBefore(errorDiv, field.nextSibling);
}

function clearFieldError(field) {
  field.classList.remove("field-error");
  field.removeAttribute("aria-invalid");
  field.style.borderColor = "";
  field.style.backgroundColor = "";

  let nextElement = field.nextElementSibling;
  while (nextElement && nextElement.classList.contains("error-message")) {
    const toRemove = nextElement;
    nextElement = nextElement.nextElementSibling;
    toRemove.remove();
  }
}

function clearAllErrors(form) {
  const errorFields = form.querySelectorAll(".field-error");
  errorFields.forEach((field) => {
    field.classList.remove("field-error");
    field.removeAttribute("aria-invalid");
    field.style.borderColor = "";
    field.style.backgroundColor = "";
  });

  form.querySelectorAll(".error-message").forEach((msg) => msg.remove());
  form.querySelectorAll(".success-message").forEach((msg) => msg.remove());
}

function showSuccess(form) {
  const successDiv = document.createElement("div");
  successDiv.className = "success-message";
  successDiv.setAttribute("role", "status");
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

  form.insertBefore(successDiv, form.firstChild);
  form.reset();
  successDiv.scrollIntoView({ behavior: "smooth", block: "center" });

  setTimeout(() => {
    if (successDiv.parentNode) {
      successDiv.remove();
    }
  }, 8000);
}
