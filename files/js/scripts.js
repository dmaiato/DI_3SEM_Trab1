
// coreeeeeeeeeeeeeeeeeeeeeees
const bgColorInput = document.getElementById('bgColor');
const borderColorInput = document.getElementById('borderColor');
const textColorInput = document.getElementById('textColor');

// caracteres
const textContentInput = document.getElementById('textContent');
const charCount = document.getElementById('charCount');
const signatureCount = document.getElementById('signatureCount')
const signatureInput = document.getElementById('signature');
const fontStyleInput = document.getElementById('fontStyle');
const maxChars = 500;
const maxSignatureChars = 20;

// imagem
const imgSizeInput = document.getElementById('imgSize');
const cardImageInput = document.getElementById('cardImageInput');
const removeImageButton = document.getElementById('removeImage');
let cardImageElement = false;

// cartão
const cardSignature = document.getElementById('cardSignature');
const card = document.getElementById('card');
const cardImg = document.getElementById('cardImg');
const cardText = document.getElementById('cardText');

function updateCard() {
  card.style.backgroundColor = bgColorInput.value;
  card.style.borderColor = borderColorInput.value;
  cardText.style.color = textColorInput.value;

  cardText.textContent = textContentInput.value || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, sequi molestiae ratione explicabo eum aliquid nisi deleniti corporis obcaecati consequuntur corrupti neque eaque quo sint ipsum nemo architecto doloremque repellat?';
  cardSignature.textContent = signatureInput.value || 'Fulano da Silva';
  cardSignature.style.color = textColorInput.value;

  cardText.style.fontFamily = fontStyleInput.value;
  cardSignature.style.fontFamily = fontStyleInput.value;

  cardImg.style.width = imgSizeInput.value + '%';
  cardImg.style.objectPosition = 'center'
  card.style.margin = 'auto';
}

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      if (!cardImageElement) {
        cardImg.src = e.target.result;
        cardImageElement = true;
      }
      cardImg.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function removeImage() {
  if (cardImageElement) {
    cardImageElement = false;
    cardImageInput.value = '';
    cardImg.src = '';
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
cardImageInput.addEventListener('change', handleImageUpload);
imgSizeInput.addEventListener('input', updateCard)
removeImageButton.addEventListener('click', removeImage);
