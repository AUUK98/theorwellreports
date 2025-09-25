document.addEventListener("DOMContentLoaded", function() {
	const messages = [
		"Welcome to The Orwell Reports",
		"Loading the Truth..."
	];

	const typingSpeed = 37; // milliseconds per character
	const pauseTime = 800; // pause before deleting
	let i = 0; // character index
	let msgIndex = 0; // current message index
	let deleting = false; // are we deleting?

	const line = document.getElementById("line1");

	function type() {
		if (msgIndex >= messages.length) {
			// All messages done → redirect
			window.location.href = "home.html";
			return;
		}

		const currentMsg = messages[msgIndex];

		if (!deleting) {
			// Typing
			line.innerHTML = currentMsg.substring(0, i) + '<span class="cursor">█</span>';
			i++;
			if (i > currentMsg.length) {
				// Finished typing, pause then delete
				deleting = true;
				setTimeout(type, pauseTime);
				return;
			}
		} else {
			// Deleting
			line.innerHTML = currentMsg.substring(0, i) + '<span class="cursor">█</span>';
			i--;
			if (i < 0) {
				// Move to next message
				deleting = false;
				msgIndex++;
			}
		}

		setTimeout(type, typingSpeed);
	}

	type();
});