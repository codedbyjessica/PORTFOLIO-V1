var portfolio =[]
var currentNav = {}; 

/////Smooth Scroll
currentNav.smoothScroll = function () {
	$("a").click(function() {
		//replace the first forward slash (/) in the pathname for the current location
		//compare it to the link that's been clicked
		//check link matches current domain
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			// Assign the variable target, with the hash of the link that's been clicked (i.e. #hash)
			var target = $(this.hash);
			// check if element exists (with target.length)
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				//animation
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 500);
				return false;
			}
		}
	});
};

// select all links in header
var navItems = $('.navSideBar a');
// empty array to store hrefs (ids)
var navHrefs = [];

for (var i = 0; i < navItems.length; i++) {
	// select href
	currentNav.href = $(navItems[i]).attr('href');
	// push into array
	navHrefs.push(currentNav.href);
}
console.log(navHrefs);

currentNav.colorChange = function () {
	//when scrolling
	$(window).on('scroll', function () {
		// get position of the window from top of page
		currentNav.windowPosition = $(window).scrollTop();
		// get height of window
		currentNav.windowHeight = $(window).height();
		// get height of document page
		currentNav.docHeight = $(document).height();
		// make nav a current when href matches section id (when specific section is top of pg)
		for (var i = 0; i < navHrefs.length; i++) {
			var sectionId = navHrefs[i];
			// get position of each section from top of page
			currentNav.sectionPosition = $(sectionId).offset().top;
			//but like, not realllyyy top of page
			currentNav.sectionPosition -= 100;
			// get height of each section
			currentNav.sectionHeight = $(sectionId).height();

			// if top of window is within each section, set that section as current
			if (currentNav.windowPosition >= currentNav.sectionPosition && currentNav.windowPosition < currentNav.sectionPosition + currentNav.sectionHeight) {
				$(`a[href="${sectionId}"]`).addClass('current');
			} else {
				$(`a[href="${sectionId}"]`).removeClass('current');
			} 
		}; 
	});
};

portfolio.init = function () {
	currentNav.colorChange();
	currentNav.smoothScroll();
};

$(function () {
	portfolio.init();
});