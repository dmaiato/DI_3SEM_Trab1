const bgColorInput = document.getElementById('bgColor');
const borderColorInput = document.getElementById('borderColor');
const textContentInput = document.getElementById('textContent');
const charCount = document.getElementById('charCount');
const signatureCount = document.getElementById('signatureCount')
const textColorInput = document.getElementById('textColor');
const signatureInput = document.getElementById('signature');
const fontStyleInput = document.getElementById('fontStyle');
const cardWidthInput = document.getElementById('cardWidth');
const cardPositionInput = document.getElementById('cardPosition');
const cardImageInput = document.getElementById('cardImage');
const removeImageButton = document.getElementById('removeImage');
let cardImageElement = null;
const maxChars = 500;
const maxSignatureChars = 20;

const cardSignature = document.getElementById('cardSignature');
const card = document.getElementById('card');
const row = document.getElementById('row');
const cardText = document.getElementById('cardText');

function updateCard() {
  card.style.backgroundColor = bgColorInput.value;
  card.style.borderColor = borderColorInput.value;
  cardText.style.color = textColorInput.value;

  cardText.textContent = textContentInput.value;
  cardSignature.textContent = signatureInput.value;
  cardSignature.style.color = textColorInput.value;

  cardText.style.fontFamily = fontStyleInput.value;
  cardSignature.style.fontFamily = fontStyleInput.value;

  card.style.width = cardWidthInput.value + 'px';
  card.style.margin = 'auto';
}

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      if (!cardImageElement) {
        cardImageElement = document.createElement('img');
        card.appendChild(cardImageElement);
      }
      cardImageElement.src = e.target.result;
      cardImageElement.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
}

function removeImage() {
  if (cardImageElement) {
    card.removeChild(cardImageElement);
    cardImageElement = null;
    cardImageInput.value = '';
    cardText.style.display = showTextInput.checked ? 'block' : 'none';
  }
}

function updateCharCount() {
  let remainingTextChars = maxChars - textContentInput.value.length;
  let remainingSignatureChars = maxSignatureChars - signatureInput.value.length;
  
  remainingTextChars = Math.max(0, remainingTextChars);
  remainingSignatureChars = Math.max(0, remainingSignatureChars);

  charCount.textContent = `${remainingTextChars} caracteres`;
  signatureCount.textContent = `${remainingSignatureChars} caracteres`;
  
  if (textContentInput.value.length > maxChars) {
    textContentInput.value = textContentInput.value.substring(0, maxChars);
  }
  
  if (signatureInput.value.length > maxSignatureChars) {
    signatureInput.value = signatureInput.value.substring(0, maxSignatureChars);
  }
}

bgColorInput.addEventListener('input', updateCard);
borderColorInput.addEventListener('input', updateCard);
textContentInput.addEventListener('input', () => {
  updateCard();
  updateCharCount();
});

textColorInput.addEventListener('input', updateCard);
signatureInput.addEventListener('input', () => {
  updateCard();
  updateCharCount();
});

fontStyleInput.addEventListener('change', updateCard);
cardWidthInput.addEventListener('input', updateCard);
cardImageInput.addEventListener('change', handleImageUpload);
removeImageButton.addEventListener('click', removeImage);

updateCard();
updateCharCount();