$( function() {
	setTimeout(function(){
		$('.anim').addClass('in');
	}, 1000);

	new WOW().init();

	$(".nano").nanoScroller({
		alwaysVisible: true,
		preventPageScrolling: true,
		iOSNativeScrolling: true
	});

	// $('.house').jKit('parallax', { 'strength': '3', 'axis': 'both' });

	var gallery = $( '.gallery-slider' ).lightSlider({
		item: 1,
		controls: true,
		pager: false,
		prevHtml: '<i class="icon-left"></i>',
		nextHtml: '<i class="icon-right"></i>',
		adaptiveHeight: true,
		slideMargin: 0
	});
	$('.js-change-slide').on('click', 'li', function(e){
		$(this).closest('.js-change-slide').find('li').removeClass('active');
		$(this).addClass('active');
		gallery.goToSlide($(this).index()+1);
	});

	$('.selectpicker').selectpicker();


	$.validator.addMethod( "phoneUA", function( phone_number, element ) {
		return this.optional( element ) || /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test( phone_number );
		// return this.optional( element ) || /^\+ ?38 ?\([0-9]{3}\) ?[0-9]{3} ?[0-9]{2} ?[0-9]{2}$/.test( phone_number );
	}, "Перевір формат: + 38 (099) 123 34 45" );

	validate($('.js-enroll-to-watching-form'));
	validate($('.js-enroll-to-watching-form-footer'));
	validate($('.js-leave-application-form'));

	var $height_main = $("#section-intro").height(),
		$menu = $(".header");

	if ($(this).scrollTop() <= $height_main) {
		$menu.removeClass("default").addClass("fixed");
	}
	$(window).scroll(function(){
		if ( $(this).scrollTop() > $height_main - 1 && $menu.hasClass("default") ){
			$menu.removeClass("default").addClass("fixed");
		} else if($(this).scrollTop() <= $height_main - 1 && $menu.hasClass("fixed")) {
			$menu.removeClass("fixed").addClass("default");
		}
	});
	$(window).scroll(function(){
		if ( $(this).scrollTop() > 100 && $menu.hasClass("def") ){
			$menu.removeClass("def").addClass("fixed2");
		} else if($(this).scrollTop() <= 100 && $menu.hasClass("fixed2")) {
			$menu.removeClass("fixed2").addClass("def");
		}
	});
	$(".js-close-modal, .md-overlay").on('click', function() {
		$(".md-modal").removeClass('md-show');
	});

	var tableContent = $('#table-filter'),
		tableHeader = $('.table-header');
	// table filter
	$('.js-filter-table').on('click', function(e) {
		e.preventDefault();
		var floor = parseInt($("#floor").val()),
			priceFrom = parseInt($('.priceFrom').val()),
			priceTo = parseInt($('.priceTo').val()),
			squareFrom = parseInt($('.squareFrom').val()),
			squareTo = parseInt($('.squareTo').val()),
			noData = true,
			tableRow = tableContent.find('tbody').find('tr:not(.no-data)');

		$.each(tableRow, function(i, el){
			var tr = $(el),
				floorTD = tr.find('td[data-floor]'),
				squareTD = tr.find('td[data-square]'),
				priceTD = tr.find('td[data-price]'),
				floorVal = floorTD.attr('data-floor'),
				squareVal = squareTD.attr('data-square'),
				priceVal = priceTD.attr('data-price');

			if (
				floor !== 0 && floor == floorVal || floor == 0 ||
				!isNaN(squareFrom) && !isNaN(squareTo) && squareVal > squareFrom && squareVal < squareTo ||
				!isNaN(priceFrom) && !isNaN(priceTo) && priceVal > priceFrom && priceVal < priceTo
			) {
				tr.removeClass('hidden');
				noData = false;
			} else {
				tr.addClass('hidden');
			}
		});

		$(".nano").nanoScroller();
		if (noData) {
			tableContent.find('tbody > tr').addClass('hidden');
			tableHeader.find('tr.no-data').removeClass('hidden');
		} else {
			tableHeader.find('tr.no-data').addClass('hidden');
		}
	});

	$('.js-filter-reset').on('click', function(e) {
		e.preventDefault();
		tableContent.find('tr:not(.no-data)').removeClass('hidden');
		tableHeader.find('tr.no-data').addClass('hidden');
		$(".nano").nanoScroller();
	});

	$(document).on('keydown', '.js-numbers', function(e) {

		// Allow: backspace, delete, tab, escape, enter and .
		if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
			// Allow: Ctrl+A, Command+A
			(e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
			// Allow: home, end, left, right, down, up
			(e.keyCode >= 35 && e.keyCode <= 40)) {
			// let it happen, don't do anything
			return;
		}
		// Ensure that it is a number and stop the keypress
		if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
			e.preventDefault();
		}
	});
});
function validate(form) {
	$(form).validate({
		rules: {
			name: "required",
			phone: {
				required: true,
				phoneUA: true
			},
			email: {
				required: true,
				email: true
			}
		},
		submitHandler: function(form) {
			$.ajax({
				url: $(form).attr('action'),
				method: 'POST',
				data: $(form).serialize(),
				success: function() {
					$(form)[0].reset();
					$("#enrollToWatching").removeClass('md-show');
					$("#enrollToWatchingResponse").addClass('md-show');
				},
				error: function() {
					// Remove when ajax will work
					$(form)[0].reset();
					$("#enrollToWatching").removeClass('md-show');
					$("#enrollToWatchingResponse").addClass('md-show');
				}
			});
		}
	});
}
