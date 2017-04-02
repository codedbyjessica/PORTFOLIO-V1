var portfolio =[]
var myNav = {}; 

/////Smooth Scroll
myNav.smoothScroll = function () {
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


myNav.colorChange = function(){
	$(window).on("scroll", function(){
		myNav.navPosition = $("body").scrollTop();
		myNav.navHeight = $(".navTop").height();

		if(myNav.navPosition > myNav.navHeight){
			$(".navTop").removeClass("navTopAtTop");
		}else{
			$(".navTop").addClass("navTopAtTop");
		}
	})

}

var navItems = $('.navTop a');
// gotta store link hrefs
var navLinks = [];

for (var i = 0; i < navItems.length; i++) {
	// select link refs and push into array
	myNav.href = $(navItems[i]).attr('href');
	navLinks.push(myNav.href);
}

myNav.itemColorChange = function () {
	//when scrolling
	$(window).on('scroll', function () {
		// get position of the window from top of page
		myNav.windowPosition = $(window).scrollTop();
		// get height of window
		myNav.windowHeight = $(window).height();
		// get height of document page
		myNav.docHeight = $(document).height();
		// make nav a current when href matches section id (when specific section is top of pg)
		for (var i = 0; i < navLinks.length; i++) {
			var sectionId = navLinks[i];
			// get position of each section from top of page
			myNav.sectionPosition = $(sectionId).offset().top;
			//but like, not realllyyy top of page
			myNav.sectionPosition -= 100;
			// get height of each section
			myNav.sectionHeight = $(sectionId).height();

			// if top of window is within each section, set that section as current
			if (myNav.windowPosition >= myNav.sectionPosition && myNav.windowPosition < myNav.sectionPosition + myNav.sectionHeight) {
				$(`a[href="${sectionId}"]`).addClass('current');
			} else {
				$(`a[href="${sectionId}"]`).removeClass('current');
			} 
		}; 
	});
};

portfolio.init = function () {
	myNav.colorChange();
	myNav.itemColorChange();
	myNav.smoothScroll();
};

$(function () {
	portfolio.init();
});

new WOW().init();