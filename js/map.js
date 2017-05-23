$(function(){
	setTimeout(function(){
		initMyMap();
	}, 1000);
});
function initMap() {
	var uluru = {lat: 55.703845, lng: 37.767974},
		markerImage = './img/map-marker.png',
		map = new google.maps.Map(document.getElementById('map'), {
			zoom: 17,
			center: uluru,
			scrollwheel: false
		}),
		marker = new google.maps.Marker({
			position: uluru,
			icon: markerImage,
			map: map,
			title: 'A Customized InfoWindow Marker'
		});

	var  infoBubble = new InfoBubble({
		maxWidth: 300
	});

	var div = document.createElement('DIV');
	div.innerHTML = 'Hello';

	infoBubble.addTab('Tab 1', div);
	infoBubble.addTab('Tab 2', "<B>This is tab 2</B>");

	google.maps.event.addListener(marker, 'click', function() {
		if (!infoBubble.isOpen()) {
			infoBubble.open(map, marker);
		}
	});
}

function initMyMap() {
	//add map, the type of map
	var mapOptions = {
		scrollwheel: false,
		zoom: 15,
		draggable: true,
		animation: google.maps.Animation.DROP,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		center: new google.maps.LatLng(55.73561599, 37.79974937), // area location
	};
	var mapElement = document.getElementById('map');
	var map = new google.maps.Map(mapElement, mapOptions);

	marker = new google.maps.Marker({
		position: new google.maps.LatLng(55.73561599, 37.79974937),
		map: map,
		icon: {
			url: './img/map-marker.png',
			scaledSize: new google.maps.Size(209, 39)
		}
	});

	//add locations
	var locations = [
		['London office', 55.7292871,37.8292723,'./img/type-1@2x.png', 'text', '<p>vdfvdfvd</p>'],
		['Sausalito', 55.72880378, 37.80867293,'./img/type-2@2x.png', 'text', '<p>vdfvdfvd</p>'],
		['Sacramento', 55.73199357, 37.78996184,'./img/type-3@2x.png', 'text', '<p>vdfvdfvd</p>'],
		['Soledad', 55.73967497, 37.80026436,'./img/type-4@2x.png', 'text', '<p>vdfvdfvd</p>'],
		['Shingletown', 55.73841867, 37.81262398,'./img/type-5@2x.png', 'text', '<p>vdfvdfvd</p>'],
		['Shingletown', 55.73986825, 37.78326988,'./img/type-6@2x.png', 'text', '<p>vdfvdfvd</p>']
	];
	//declare marker call it 'i'
	var marker, i;
	//declare infowindow
	var infowindow = new google.maps.InfoWindow();

	var infoBubbles = [];


	//add marker to each locations
	for (i = 0; i < locations.length; i++) {
		var image = {
			url: locations[i][3],
			scaledSize: new google.maps.Size(42, 42),
			// origin: new google.maps.Point(0, 0),
			// anchor: new google.maps.Point(75, 40),
		};

		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations[i][1], locations[i][2]),
			map: map,
			icon: image
		});

		infoBubbles.push(new InfoBubble({maxWidth: 600}));


		infoBubbles[i].addTab('Местоположение', locations[i][4]);
		infoBubbles[i].addTab('Как добраться', locations[i][5]);

		// click function to marker, pops up infowindow
		google.maps.event.addListener(marker, 'click', (function(marker, i) {
			return function() {

				if (!infoBubbles[i].isOpen()) {
					infoBubbles[i].open(map, marker);
				}
			};
		})(marker, i));
	}
}

/*function initialize() {
	//add map, the type of map
	var mapOptions = {
		zoom: 5,
		draggable: true,
		animation: google.maps.Animation.DROP,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		center: new google.maps.LatLng(51.4964302,-0.1331412), // area location
		styles:[{"stylers":[{"saturation":-100},{"gamma":1}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"poi.place_of_worship","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"simplified"}]},{"featureType":"water","stylers":[{"visibility":"on"},{"saturation":50},{"gamma":0},{"hue":"#50a5d1"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"color":"#333333"}]},{"featureType":"road.local","elementType":"labels.text","stylers":[{"weight":0.5},{"color":"#333333"}]},{"featureType":"transit.station","elementType":"labels.icon","stylers":[{"gamma":1},{"saturation":50}]}]
	};
	var mapElement = document.getElementById('map');
	var map = new google.maps.Map(mapElement, mapOptions);

	//add locations
	var locations = [
		['London office', 51.4964302,-0.1331412,'http://labs.google.com/ridefinder/images/mm_20_red.png'],
		['Sausalito', 37.8590937, -122.4852507,'http://labs.google.com/ridefinder/images/mm_20_red.png'],
		['Sacramento', 38.5815719, -121.4943996,'http://labs.google.com/ridefinder/images/mm_20_green.png'],
		['Soledad', 36.424687, -121.3263187,'http://labs.google.com/ridefinder/images/mm_20_blue.png'],
		['Shingletown', 40.4923784, -121.8891586,'http://labs.google.com/ridefinder/images/mm_20_yellow.png']
	];
	//declare marker call it 'i'
	var marker, i;
	//declare infowindow
	var infowindow = new google.maps.InfoWindow();
	//add marker to each locations
	for (i = 0; i < locations.length; i++) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations[i][1], locations[i][2]),
			map: map,
			icon: locations[i][3]
		});
		//click function to marker, pops up infowindow
		google.maps.event.addListener(marker, 'click', (function(marker, i) {
			return function() {
				infowindow.setContent(locations[i][0]);
				infowindow.open(map, marker);
			}
		})(marker, i));
	}
}
google.maps.event.addDomListener(window, 'load', initialize);
*/
function map_initialize(){
	var myLatlng = new google.maps.LatLng(37.286172, -121.80929);

	var markerImage = './img/map-marker.png';


	var mapOptions = {
		center: new google.maps.LatLng(37.286172, -121.80929),
		zoom: 8,
		icon: markerImage,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById("map"),
		mapOptions);


	var marker = new google.maps.Marker({
		position: myLatlng,
		map: map,
		icon: markerImage,
		title: 'A Customized InfoWindow Marker'
	});

	var  infoBubble = new InfoBubble({
		maxWidth: 300
	});

	var div = document.createElement('DIV');
	div.innerHTML = 'Hello';

	infoBubble.addTab('Tab 1', div);
	infoBubble.addTab('Tab 2', "<B>This is tab 2</B>");

	google.maps.event.addListener(marker, 'click', function() {
		if (!infoBubble.isOpen()) {
			infoBubble.open(map, marker);
		}
	});
}
