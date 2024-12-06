// script.js
const textInput = document.getElementById('text-input');
const fontSelect = document.getElementById('font-select');
const fontSize = document.getElementById('font-size');
const fontSizeValue = document.getElementById('font-size-value');
const lineHeight = document.getElementById('line-height');
const lineHeightValue = document.getElementById('line-height-value');
const letterSpacing = document.getElementById('letter-spacing');
const letterSpacingValue = document.getElementById('letter-spacing-value');
const preview = document.getElementById('preview');
const themeToggle = document.getElementById('theme-toggle');
const customFontInput = document.getElementById('custom-font');
const exportImageButton = document.getElementById('export-image');
const googleFontInput = document.getElementById('google-font-url');
const addGoogleFontButton = document.getElementById('add-google-font');

// Add Google Font dynamically
addGoogleFontButton.addEventListener('click', () => {
  const fontURL = googleFontInput.value.trim();
  if (fontURL) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = fontURL;
    document.head.appendChild(link);

    // Extract the font name from the URL
    const fontName = fontURL.match(/family=([^&:]*)/)[1].replace(/\+/g, ' ');
    fontSelect.innerHTML += `<option value="'${fontName}', sans-serif">${fontName}</option>`;
    googleFontInput.value = ''; // Clear the input
  }
});


// Update preview text
textInput.addEventListener('input', () => {
  preview.textContent = textInput.value;    
});

// Update font family
fontSelect.addEventListener('change', () => {
  preview.style.fontFamily = fontSelect.value;
});

// Update font size
fontSize.addEventListener('input', () => {
  const size = `${fontSize.value}px`;
  fontSizeValue.textContent = size;
  preview.style.fontSize = size;
});

// Update line height
lineHeight.addEventListener('input', () => {
  const height = lineHeight.value;
  lineHeightValue.textContent = height;
  preview.style.lineHeight = height;
});

// Update letter spacing
letterSpacing.addEventListener('input', () => {
  const spacing = `${letterSpacing.value}px`;
  letterSpacingValue.textContent = spacing;
  preview.style.letterSpacing = spacing;
});

// Toggle dark/light mode
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// Handle custom font upload
customFontInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const fontFace = new FontFace('CustomFont', `url(${e.target.result})`);
      fontFace.load().then(() => {
        document.fonts.add(fontFace);
        fontSelect.innerHTML += '<option value="CustomFont">Custom Font</option>';
        fontSelect.value = 'CustomFont';
        preview.style.fontFamily = 'CustomFont';
      });
    };
    reader.readAsDataURL(file);
  }
});

// Export preview as an image
exportImageButton.addEventListener('click', () => {
  html2canvas(preview).then((canvas) => {
    const link = document.createElement('a');
    link.download = 'font-preview.png';
    link.href = canvas.toDataURL();
    link.click();
  });
});
