var mapOpen = document.querySelector(".js-open-map");
// var mapOpenFooter = document.querySelector(".footer-contacts__link");
var mapPopup = document.querySelector(".modal-content-map");
var mapClose = document.querySelector(".modal-map__close");

mapOpen.addEventListener('click', function(event) {
	event.preventDefault();
	mapPopup.classList.add("modal-map-show");
});

// mapOpenFooter.addEventListener('click', function(event) {
// 	event.preventDefault();
// 	mapPopup.classList.add("modal-map-show");
// });

mapClose.addEventListener('click', function(event) {
	event.preventDefault();
	mapPopup.classList.remove("modal-map-show");
});

window.addEventListener('keydown', function() {
	if (event.keyCode === 27) {
		if (mapPopup.classList.contains("modal-map-show")) {
			mapPopup.classList.remove("modal-map-show");
		}
	}
});
