
(function() {

	'use strict';

	////////////////////
	// FAQ TOGGLES
	////////////////////

	Array
		.from(document.getElementsByClassName('question'))
		.forEach(function (question) {
			question.addEventListener('click', (function() {

				var parentClasses = question.parentElement.classList;

				if (parentClasses.contains('expanded'))
					parentClasses.remove('expanded');
				else
					parentClasses.add('expanded');

			}).bind(this));
		});

	////////////////////
	// SECTION TOGGLES
	////////////////////

	var sections = ['register', 'faq', 'speakers', 'sponsors'];

	function hideAllSections() {
		// Hide main content sections
		document.querySelectorAll('.main > section.expanded').forEach(function(element) {
			element.classList.remove('expanded');
		});

		// Reset buttons to default view
		document.querySelectorAll('.controls li.expanded').forEach(function(element) {
			element.classList.remove('expanded');
		});
	}

	function router() {
		// The bit after the # (e.g. url == #faq --> section == faq)
		var currentSection = location.hash.slice(1);
		
		document.body.classList.remove('section-expanded');

		if (sections.indexOf(currentSection) >= 0) {
			hideAllSections();
			document.body.classList.add('section-expanded');

			// Reveal current section
			document.getElementById(currentSection)
					.classList.add('expanded');

			// Change appearance of buttons
			document.getElementById(currentSection+"-buttons")
					.classList.add('expanded');

			// Switch compact button for this section to a back button

		} else if (!currentSection.length) {
			// Navigated to /# or /, hide all sections
			hideAllSections();
		}
	}

	// Call the router on page start, and whenever the URL hash changes
	window.addEventListener('hashchange', router);
	router();

	////////////////////
	// COUNTDOWN
	////////////////////

	var launchDate = new Date('Sep 16 2017');
	var remainingMessage = " DAYS REMAINING";
	var launchMessage = "";

	/* Handles timezone conversions */
	function updateCountdown(countdownElement) {
		var localDate = new Date();
		var utc = localDate.getTime() + (localDate.getTimezoneOffset() * 60000);
		var edtNow = new Date(utc + (3600000*(-4)));

		var millisecondsPerDay = 24 * 60 * 60 * 1000;
		var numberDays = Math.round((launchDate - edtNow) / millisecondsPerDay);

		if (numberDays > 0) {
			countdownElement.innerHTML = numberDays + remainingMessage;
		}
		else {
			countdownElement.innerHTML = launchMessage;
		}
	}

	Array
		.from(document.getElementsByClassName('days'))
		.forEach(updateCountdown);

})();
