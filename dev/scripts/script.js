/////Smooth Scroll
$(function() {
	$("a").click(function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
		var target = $(this.hash);
		target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html,body').animate({
					scrollTop: target.offset().top
				}, 500);
				return false;
			}
		}
	});
});

// $(function() {
// 		window.onscroll = function () {
// 	  var headerPosition = document.getElementById("about").offsetTop;
// 	  var scrollPosition = document.getElementsByTagName("body")[0].scrollTop;
	  
// 	  if(scrollPosition >= headerPosition)
// 	  		console.log("working!")
// 		document.getElementById("fixedLogo").className = "";
// 	  else
// 		document.getElementById("fixedLogo").className = "displayNone";
// 	};
// });

// $(function() {
// 		window.onscroll = function () {
// 	  var headerPosition = $("header")[0].offsetTop;
// 	  var scrollPosition = $("body")[0].scrollTop;
// 	  console.log(scrollPosition,headerPosition);
	  
// 	  if(scrollPosition > headerPosition){
// 	  	$("#fixedLogo").removeClass("displayNone");
// 	  }else{
// 	  	$("#fixedLogo").addClass("displayNone");
// 	  }
		
// 	};
// });

var app =[]
var currentNav = {}; 
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

currentNav.scrollEffect = function () {
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
			//but like, not realllyyy top of page (that would be too late), when it hits around halfway
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

// currentNav.showLogo = function () {

// 	currentNav.windowWidth = window.innerWidth;

// 	if (currentNav.windowWidth <= 560) {
// 		$('#backToTop').hide();
// 	} else {
// 		if (currentNav.windowPosition >= $('#imADev').offset().top) {
// 			$('#backToTop').fadeIn();
// 			console.log($('#about').offset().top);
// 		} else {
// 			$('#backToTop').fadeOut();
// 		}
// 	}
// }; 

app.init = function () {
	currentNav.scrollEffect();
	// currentNav.showLogo();
	// $(window).on('resize', function () {
	// 	currentNav.showLogo();
	// });
	// $(window).on('scroll', function () {
	// 	currentNav.showLogo();
	// });
};

$(function () {
	app.init();
});