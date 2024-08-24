// Your script here.
// Initialize the speech synthesis utterance object
const msg = new SpeechSynthesisUtterance();

// Get all voices available in the browser
function populateVoices() {
  voices = speechSynthesis.getVoices();
  voicesDropdown.innerHTML = voices
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

// Set the voice based on the dropdown selection
function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
  toggle(); // Restart the speech if already playing
}

// Toggle speech synthesis (start or stop)
function toggle(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg);
  }
}

// Set the rate and pitch for the speech
function setOption() {
  msg[this.name] = this.value;
  toggle(); // Restart the speech if already playing
}

// Populate voices when they are loaded and when the browser loads
speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));

// Start speech synthesis on button click
speakButton.addEventListener('click', toggle);

// Stop speech synthesis on button click
stopButton.addEventListener('click', () => toggle(false));

// Set the text content for speech synthesis
msg.text = document.querySelector('[name="text"]').value;

