function getCurrentDateTime() {
	const now = new Date();
	const date = now.toLocaleDateString('fr-FR');
	const time = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
	const year = now.getFullYear();
	return { date, time, year };
}
    
function sanitizeInput(input) {
	const div = document.createElement('div');
	div.textContent = input;
	return div.innerHTML;
}
    
emailjs.init("ZotnN_p6aFKlITwQ0");

document.getElementById("contact-form").addEventListener("submit", function(event) {
	event.preventDefault();

	const formData = new FormData(this);
	const firstName = formData.get("firstname");
	const lastName = formData.get("lastname");
	const email = formData.get("email");
	const subject = formData.get("subject");
	const message = formData.get("message");

	const sanitizedFirstName = sanitizeInput(firstName);
	const sanitizedLastName = sanitizeInput(lastName);
	const sanitizedEmail = sanitizeInput(email);
	const sanitizedSubject = sanitizeInput(subject);
	const sanitizedMessage = sanitizeInput(message);

	const { date, time, year } = getCurrentDateTime();

	const discordUrl = "https://discord.gg/hZSCM6jB";
	const githubUrl = "https://github.com/slouowzee";
	const instagramUrl = "https://www.instagram.com/gael_shuna/";
	const twitterUrl = "https://x.com/IGa_l_lI";

	emailjs.send("service_6ai8tw7", "template_6jwpn8l", {
	firstName: sanitizedFirstName,
	lastName: sanitizedLastName,
	email: sanitizedEmail,
	subject: sanitizedSubject,
	message: sanitizedMessage,
	date: date,
	time: time,
	year: year,
	discordUrl: discordUrl,
	githubUrl: githubUrl,
	instagramUrl: instagramUrl,
	twitterUrl: twitterUrl
	}).then(function(response) {
		const successMessage = window.i18n ? window.i18n.translate('contact_success_alert') : "Message envoyé avec succès!";
		alert(successMessage);
		console.log("Réponse EmailJS: ", response);
	}, function(error) {
		const errorMessage = window.i18n ? window.i18n.translate('contact_error_alert') : "Erreur lors de l'envoi du message.";
		alert(errorMessage);
		console.log("Erreur EmailJS: ", error);
	});
});