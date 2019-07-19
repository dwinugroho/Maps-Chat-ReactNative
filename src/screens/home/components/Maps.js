
//=========== React Native ==========//

import React from 'react'
import {
	View,
	Text,
	StyleSheet,
	StatusBar,
	Dimensions,
	AsyncStorage,
	Image
} from 'react-native'

//============= Components ==============//

import Header from './Header'


//============== RN Maps ============//

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

//============= Firebase =============//

import firebase from '../../../Firebase'



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
	      	},
	      	users: []
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

	    AsyncStorage.getItem('user', (err, result) => {
        	if (result) {
        		let dbRef = firebase.database().ref('users');
		        dbRef.on('child_added', (val) => {
		            let person = val.val();
		            person.uid = val.key;

		            if (person.uid !== result) {
		                
		            	this.setState((prevState) => {
		                    return {
		                        users: [...prevState.users, person]
		                    }
		                });

		                // let pos = {
		                //     lat: person.region.latitude,
		                //     lng: person.region.longitude
		                // }

		                // Geocoder.geocodePosition(pos).then(res => {
		                //     firebase.database().ref('users/' + person.uid + '/location/city').set({
		                //         name: res[0].locality
		                //     })
		                // })
		                // .catch(error => alert(error))

		            }
		        })
        	}
        })

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
			        	title="Anda"
			          	coordinate={ this.state.region }
			    	/>
			    	{
                        this.state.users.map(data => (
                            <MapView.Marker
                                title={data.name}
                                coordinate={{
                                    latitude: data.region.latitude,
                                    longitude: data.region.longitude,
                                    latitudeDelta: 0.0043,
                                    longitudeDelta: 0.0034
                                }}>
                                
                            </MapView.Marker>
                        ))
                    }

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