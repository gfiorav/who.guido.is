window.onload = function () {
    background_video            = document.getElementById('background-video');
    background_video.src        = 'src/video/back' + (Math.floor(Math.random() *3) +1) +'.mp4';

    map_pid = -1;

    disposables = document.getElementsByName('disposables');

    tab_order = ['work', 'apps', 'places', 'share'];
    places  = [
        'Buenos Aires, Argentina',
        'La Pampa, Argentina',
        'Rome, Italy',
        'Venice, Italy',
        'Milan, Italy',
        'Lugano, Switzerland',
        'Frankfurt, Germany',
        'Paris, France',
        'Poitiers, France',
        'Oporto, Portugal',
        'Lagos, Portugal',
        'Barcelona, Spain',
        'Madrid, Spain (I live here!)'
        ];

    aux_places = new Array();
    aux_places = places.slice(0);

    current_section             = 'home';

    registerEventListeners();


}

function registerEventListeners () {
    /* buttons */
    work_button = document.getElementById('work-button');
    work_button.onclick = function () {
        loadSection('work');
    };

    apps_button = document.getElementById('apps-button');
    apps_button.onclick = function () {
        loadSection('apps');
    };

    places_button = document.getElementById('places-button');
    places_button.onclick = function () {
        loadSection('places');
    };

    share_button = document.getElementById('share-button');
    share_button.onclick = function () {
        loadSection('share');
    };

    close_buttons = {};
    close_buttons = document.getElementsByName('close-button');
    for(var b = 0; b < close_buttons.length; b++) {
        close_buttons[b].onclick = function () {
            loadSection('home');
        }
    }

    twitter_button = document.getElementById('twitter');
    twitter_button.onclick = function () {
        window.open('https://www.twitter.com/gfioravantti');
    }

    linkedin_button = document.getElementById('linkedin');
    linkedin_button.onclick = function () {
        window.open('https://linkedin.com/pub/guido-fioravantti-rassat/66/b19/425');
    }

    github_button = document.getElementById('github');
    github_button.onclick = function () {
        window.open('https://github.com/gfiorav');
    }

    facebook_button = document.getElementById('facebook');
    facebook_button.onclick = function () {
        window.open('https://www.facebook.com/guido.fioravantti');
    }

}

function loadSection (section) {
    if(section == current_section)
        section = 'home'

    var previous_section = current_section;
    var prev_index  = tab_order.indexOf(current_section) +1;

    switch ( section ) {
        case 'home':
        current_section = section;
        break;
        break;

        case 'work':
        var index       = 1; 
        current_section = section;
        break;

        case 'apps':
        var index = 2;
        current_section = section;
        break;

        case 'places':
        var index = 3;
        current_section = section;

        initializeMap();
        break;
        
        case 'share':
        var index = 4;
        current_section = section;
        break;

        default:
        if(current_section != 'home') {
            console.log('404: Section not found');
            console.log('\tAction -> Reverting to fallback');
            loadSection('home');
        }
        else {
            console.log('Error: Infinite Loop detected!');
            console.log('\tAction -> Nothing. Try reloading :S');
        }
        return;
        break;

    }

    if(previous_section == 'home') {
        document.getElementById(section + '-section').className = 'content-wrapper-fromup';
    } 
    else if (section == 'home') {
        document.getElementById(previous_section + '-section').className = 'content-wrapper-todown';
    }
    else {

        var in_animation, out_animation;
        if(prev_index < index) {
            in_animation    = '-fromright';
            out_animation   = '-toleft';
        }
        else {
            in_animation    = '-fromleft';
            out_animation   = '-toright';
        }

        document.getElementById(previous_section + '-section').className = 'content-wrapper' + out_animation;
        document.getElementById(section + '-section').className = 'content-wrapper' + in_animation;
    }
    console.log('Section loaded: ' +current_section);
    console.log('\tStatus: nominal');
}

function initializeMap() {
    if(map_pid == -1) {
      geocoder = new google.maps.Geocoder();
      var latlng = new google.maps.LatLng(40.416, -3.703);

      var mapOptions = {
        zoom: 5,
        center: latlng,
        disableDefaultUI: true }
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);


        map_pid = setInterval(codeAddress, 3500);


        places_subtitle = document.getElementById('places-subtitle');
    }
}

function codeAddress() {
    if(aux_places.length == 0) {
        clearInterval(map_pid);
        aux_places = places.slice();
        places_subtitle.innerHTML = 'One of my goals is to fill the whole map!'
        map.setZoom(1);
        return;
    }

    var address = aux_places.splice(0, 1)[0];

    geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.panTo(results[0].geometry.location);

      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });

      places_subtitle.innerHTML = 'I\'ve been to ' + address;
  } 
  else {
      console.log('Error loading place');
      console.log('\tReason: ' + status);
  }});
}
