// Set the min attribute of the date picker to today's date
function setMinDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date-picker').setAttribute('min', today);
}

// Call setMinDate when the page loads
document.addEventListener('DOMContentLoaded', setMinDate);

// Function to switch tabs
function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');

    // Show or hide the back button and volume button based on the active tab
    document.getElementById('back-button').classList.toggle('hidden', tabId !== 'tab2');
    document.getElementById('volume-button').classList.toggle('hidden', tabId !== 'tab2');
}

// Function to start the countdown
function startCountdown() {
    // Get input values
    const title = document.getElementById('title-input').value.trim();
    const date = document.getElementById('date-picker').value;
    const time = document.getElementById('time-picker').value;

    // Check if all fields are filled
    if (!title || !date || !time) {
        alert("Please fill in all the fields.");
        return;
    }

    // Create target date from inputs
    const targetDate = new Date(`${date}T${time}`);

    // Update event details section
    const eventTitleElement = document.getElementById('event-title');
    eventTitleElement.textContent = title || 'Event Countdown';

    // Show countdown tab
    showTab('tab2');

    // Function to update the countdown display
    function updateCountdown() {
        const now = new Date();
        const remainingTime = targetDate - now;

        if (remainingTime <= 0) {
            document.getElementById('countdown').innerHTML = "<h2>Countdown finished!</h2>";
            playAlarm();
            clearInterval(intervalId); // Stop the countdown
            return;
        }

        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    // Update countdown immediately
    updateCountdown();

    // Update countdown every second
    const intervalId = setInterval(updateCountdown, 1000);
}

// Function to go back to the details tab
function goBack() {
    showTab('tab1');
}

// Function to toggle volume
function toggleVolume() {
    const volumeButton = document.getElementById('volume-button');
    const alarmSound = document.getElementById('alarm-sound');
    if (volumeButton.textContent === '🔊') {
        volumeButton.textContent = '🔇';
        alarmSound.muted = true; // Mute sound
    } else {
        volumeButton.textContent = '🔊';
        alarmSound.muted = false; // Unmute sound
    }
}

// Function to play alarm sound
function playAlarm() {
    const alarmSound = document.getElementById('alarm-sound');
    alarmSound.play().catch(error => {
        console.error('Failed to play alarm sound:', error);
    });
}

// Check if the audio file is loaded successfully
const alarmSound = document.getElementById('alarm-sound');
alarmSound.addEventListener('canplaythrough', () => {
    console.log('Alarm sound loaded successfully');
}, false);

alarmSound.addEventListener('error', () => {
    console.error('Failed to load alarm sound');
}, false);

// Attach event listeners
document.getElementById('start-button').addEventListener('click', startCountdown);
document.getElementById('back-button').addEventListener('click', goBack);
document.getElementById('volume-button').addEventListener('click', toggleVolume);

// Ensure user interaction with the page
document.body.addEventListener('click', (event) => {
    // Check if the click is not on an input element
    if (!event.target.matches('input')) {
        const alarmSound = document.getElementById('alarm-sound');
        if (alarmSound.paused) {
            alarmSound.play().catch(error => {
                console.error('Failed to play alarm sound:', error);
            });
        }
    }
}, { once: true });
