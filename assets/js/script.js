'use strict';

// Get PROLIFIC_PID from the URL
const urlParams = new URLSearchParams(window.location.search);
const PROLIFIC_PID = urlParams.get('PROLIFIC_PID');

// Save PROLIFIC_PID to local storage
localStorage.setItem('PROLIFIC_PID', PROLIFIC_PID);