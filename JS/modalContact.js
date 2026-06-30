document.addEventListener('DOMContentLoaded', () => {
  const demoModal = document.getElementById('demoModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalForm = document.getElementById('modalContactForm');
  const modalOutput = document.getElementById('modal_output');
  const phoneInput = document.querySelector("#modal_mobileInput");

  // Get all book a demo buttons
  const bookDemoBtns = document.querySelectorAll('.button-float');

  // Load intlTelInput if library is available
  let iti = null;
  if (window.intlTelInput) {
    iti = window.intlTelInput(phoneInput, {
      initialCountry: "in",
      preferredCountries: ["in", "us", "gb"],
      separateDialCode: true,
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
      formatOnDisplay: false,
      autoFormat: false,
      nationalMode: false
    });

    // Update label position on focus/blur for mobile field with intlTelInput flag
    phoneInput.addEventListener('focus', () => {
      const label = document.getElementById('modal_mobileLabel');
      const flagContainer = demoModal.querySelector('.iti__selected-country');
      if (flagContainer && label) {
        const width = flagContainer.offsetWidth;
        label.style.left = (width + 13) + 'px';
        label.style.top = '-5px';
        label.style.fontSize = '0.85rem';
        label.style.color = '#1ce783';
      }
    });

    phoneInput.addEventListener('blur', () => {
      if (!phoneInput.value) {
        const label = document.getElementById('modal_mobileLabel');
        const flagContainer = demoModal.querySelector('.iti__selected-country');
        if (flagContainer && label) {
          const width = flagContainer.offsetWidth;
          label.style.left = (width + 13) + 'px';
          label.style.top = '50%';
          label.style.transform = 'translateY(-50%)';
          label.style.fontSize = '0.95rem';
          label.style.color = 'rgba(255, 255, 255, 0.6)';
        }
      }
    });

    // Set initial position
    setTimeout(() => {
      const label = document.getElementById('modal_mobileLabel');
      const flagContainer = demoModal.querySelector('.iti__selected-country');
      if (flagContainer && label) {
        const width = flagContainer.offsetWidth;
        label.style.left = (width + 13) + 'px';
      }
    }, 200);
  }

  // Open modal function
  const openModal = (e) => {
    e.preventDefault();
    demoModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Disable scroll on body
    
    // Adjust mobile label spacing once visible
    if (iti) {
      setTimeout(() => {
        const label = document.getElementById('modal_mobileLabel');
        const flagContainer = demoModal.querySelector('.iti__selected-country');
        if (flagContainer && label) {
          const width = flagContainer.offsetWidth;
          label.style.left = (width + 13) + 'px';
        }
      }, 50);
    }
  };

  // Close modal function
  const closeModal = () => {
    demoModal.classList.remove('active');
    document.body.style.overflow = ''; // Enable scroll
    modalForm.reset();
    if (iti) {
      iti.setNumber('');
    }
    modalOutput.style.display = 'none';
  };

  // Bind click event to all Book a Demo buttons
  bookDemoBtns.forEach(btn => {
    // Only bind if it has the contactus.html href or is a float button
    if (btn.getAttribute('href') && btn.getAttribute('href').includes('contactus.html')) {
      btn.addEventListener('click', openModal);
    }
  });

  // Bind close events
  closeModalBtn.addEventListener('click', closeModal);
  demoModal.addEventListener('click', (e) => {
    if (e.target === demoModal) {
      closeModal();
    }
  });

  // Phone number numeric inputs restrictor
  let isProcessing = false;
  const cleanInput = () => {
    if (isProcessing) return;
    isProcessing = true;
    const start = phoneInput.selectionStart;
    const end = phoneInput.selectionEnd;
    const oldValue = phoneInput.value;
    const newValue = oldValue.replace(/\D/g, '');
    if (oldValue !== newValue) {
      phoneInput.value = newValue;
      const diff = oldValue.length - newValue.length;
      phoneInput.setSelectionRange(
        Math.max(0, start - diff),
        Math.max(0, end - diff)
      );
    }
    isProcessing = false;
  };

  phoneInput.addEventListener('input', cleanInput);

  // Form submission handler
  modalForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (iti && !iti.isValidNumber()) {
      modalOutput.className = 'full-row error-msg';
      modalOutput.textContent = 'Please enter a valid phone number';
      modalOutput.style.display = 'block';
      return;
    }

    modalOutput.className = 'full-row success-msg';
    modalOutput.textContent = 'Thank you! Your demo booking request has been sent successfully.';
    modalOutput.style.display = 'block';

    setTimeout(() => {
      closeModal();
    }, 2500);
  });
});
