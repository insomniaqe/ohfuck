// Google Maps Init
function initMap() {
    var styles = [{"featureType":"administrative","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"saturation":-100},{"lightness":"50"},{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"lightness":"30"}]},{"featureType":"road.local","elementType":"all","stylers":[{"lightness":"40"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]},{"featureType":"water","elementType":"labels","stylers":[{"lightness":-25},{"saturation":-100}]}];
    // Create a new StyledMapType object, passing it an array of styles,
    // and the name to be displayed on the map type control.
    var styledMapType = new google.maps.StyledMapType(
        styles,
        {name: 'Styled Map'}
    );

    var mapWrapper = document.querySelector('.map');

    var coordinates = {
        lat: mapWrapper.getAttribute('data-lat') * 1,
        lng: mapWrapper.getAttribute('data-lng') * 1,
    }

    var markerIcon = '../img/icons/map-marker.svg';

    // Create a map object, and include the MapTypeId to add
    // to the map type control.
    var map = new google.maps.Map(mapWrapper, {
        center: coordinates,
        zoom: 14,
        disableDefaultUI: true,
        gestureHandling: 'cooperative'
    });

    var marker = new google.maps.Marker({
        position: coordinates,
        map: map,
        icon: markerIcon,
    });

    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');
}
// Google Maps Init end