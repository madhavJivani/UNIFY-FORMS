const form = document.getElementById('userForm');
const errorDiv = document.getElementById('formError');
const resultTable = document.getElementById('resultTable');

// Utility function to escape HTML special characters
function sanitize(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function validateAge(age) {
    const num = Number(age);
    return !isNaN(num) && num >= 1 && num <= 150;
}

function validateTelephone(telephone) {
    const telPattern = /^[0-9]{7,15}$/;  // Only digits
    return telPattern.test(telephone);
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener('reset', () => {
    errorDiv.textContent = '';
    resultTable.innerHTML = '';
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    errorDiv.textContent = '';
    // Gather form data
    const name = form.name.value.trim();
    const age = form.age.value.trim();
    const gender = form.gender.value;
    const country = form.country.value;
    const techStack = Array.from(form.querySelectorAll('input[name="techStack"]:checked')).map(cb => cb.value);
    const address = form.address.value.trim();
    const telephone = form.telephone.value.trim();
    const email = form.email.value.trim();

    // Validation
    if (!name || !age || !gender || !country || techStack.length === 0 || !address || !telephone || !email) {
        errorDiv.textContent = 'Please fill all the fields and select at least one technology.';
        return;
    }
    if (!validateAge(age)) {
        errorDiv.textContent = 'Please enter a valid age (1-150).';
        return;
    }
    if (!validateTelephone(telephone)) {
        errorDiv.textContent = 'Please enter a valid telephone number (7-15 digits, digits only).';
        return;
    }
    if (!validateEmail(email)) {
        errorDiv.textContent = 'Please enter a valid email address.';
        return;
    }

    // If all validations pass, show data in table (sanitize all user input)
    resultTable.innerHTML = `
        <div class="text-green-700 font-semibold mb-2">Form submitted successfully!</div>
        <h2 class="text-2xl font-bold mb-4">Submitted Data</h2>
        <table class="min-w-full bg-white border border-gray-300 rounded">
            <tbody>
                <tr><th class="border px-4 py-2 text-left">Name</th><td class="border px-4 py-2">${sanitize(name)}</td></tr>
                <tr><th class="border px-4 py-2 text-left">Age</th><td class="border px-4 py-2">${sanitize(age)}</td></tr>
                <tr><th class="border px-4 py-2 text-left">Gender</th><td class="border px-4 py-2">${sanitize(gender)}</td></tr>
                <tr><th class="border px-4 py-2 text-left">Country</th><td class="border px-4 py-2">${sanitize(country)}</td></tr>
                <tr><th class="border px-4 py-2 text-left">Technological Stack</th><td class="border px-4 py-2">${techStack.map(sanitize).join(', ')}</td></tr>
                <tr><th class="border px-4 py-2 text-left">Address</th><td class="border px-4 py-2 whitespace-pre-line">${sanitize(address)}</td></tr>
                <tr><th class="border px-4 py-2 text-left">Telephone</th><td class="border px-4 py-2">${sanitize(telephone)}</td></tr>
                <tr><th class="border px-4 py-2 text-left">Email</th><td class="border px-4 py-2">${sanitize(email)}</td></tr>
            </tbody>
        </table>
    `;
    // Reset after a short delay (1.5s)
    setTimeout(() => form.reset(), 1500);
});
