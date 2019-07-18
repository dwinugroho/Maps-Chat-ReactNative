
//=========== React Native ==========//

import React from 'react'
import {
	View,
	Text,
	StyleSheet,
	StatusBar,
	Dimensions
} from 'react-native'

//============= Components ==============//

import Header from './Header'


//============== RN Maps ============//

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

let { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;



class Maps extends React.Component {

	constructor(props) {
		super(props);
	
		this.state = {
	    	region: {
	    		latitude: LATITUDE,
	        	longitude: LONGITUDE,
	        	latitudeDelta: LATITUDE_DELTA,
	        	longitudeDelta: LONGITUDE_DELTA,
	      	}
    	};
	}

	componentDidMount() {
	    navigator.geolocation.getCurrentPosition(
	      position => {
	        this.setState({
	          region: {
	            latitude: position.coords.latitude,
	            longitude: position.coords.longitude,
	            latitudeDelta: LATITUDE_DELTA,
	            longitudeDelta: LONGITUDE_DELTA,
	          }
	        });
	      },
	    (error) => console.log(error.message),
	    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
	    );
	    this.watchID = navigator.geolocation.watchPosition(
	      position => {
	        this.setState({
	          region: {
	            latitude: position.coords.latitude,
	            longitude: position.coords.longitude,
	            latitudeDelta: LATITUDE_DELTA,
	            longitudeDelta: LONGITUDE_DELTA,
	          }
	        });
	      }
	    );
 	}

	  componentWillUnmount() {
	    navigator.geolocation.clearWatch(this.watchID);
	  }

	render () {
		return (
			<React.Fragment>
				<MapView
			        provider={ PROVIDER_GOOGLE }
			        style={ styles.container }
			        showsUserLocation={ true }
			        region={ this.state.region }
			    >
			        <MapView.Marker
			          coordinate={ this.state.region }
			    />
		    </MapView>
			</React.Fragment>
		)
	}
}

const styles = StyleSheet.create({
	container: {
	    height: '100%',
	    width: '100%',
	    zIndex: 999,
	}
})

export default Maps