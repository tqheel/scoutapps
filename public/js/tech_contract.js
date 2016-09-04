'use strict';
function hideElements (elementsToHide) {
	for (var i = 0; i < elementsToHide.length; i++) {
		$('#' + elementsToHide[i]).hide();
	}
}

function appendUrlWithStep (element) {
	$(this).attr('href', function() {
		return this.href = '/contract#' + element.id;
	});
}

$(document).ready(function() {
	var sectionsToHide = ['step1'];
	hideElements(sectionsToHide);
	$('#btnStep1').click(function(el) {
		el.preventDefault();
		console.log('step 1 clicked');
		$('#overview').hide();
		$('#step1').show();
		appendUrlWithStep(el);
	});
});

