
//=========== React Native ==========//

import React from 'react'
import {
	View,
	Text,
	StyleSheet,
	StatusBar,
	Dimensions,
	AsyncStorage,
	Image,
	Button,
	TouchableOpacity,
	FlatList
} from 'react-native'

//============= Components ==============//

import Header from './Header'


//============== RN Maps ============//

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

//============= Firebase =============//

import firebase from '../../../Firebase'


import User from '../../../User'


import Modal from 'react-native-modalbox';

import {
	Avatar
} from 'react-native-elements'

//============= Navigation ==============//

import { withNavigation } from 'react-navigation'



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
	      	users: [],
    	};
	}

	componentDidMount() {

	    AsyncStorage.getItem('user', (err, result) => {
        	if (result) {

        		// setInterval(() => {

        		// 	this._getDataFriends(result)

        		// }, 30000)

        		this._getDataFriends(result)


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

			        	this._updateLocation(result, position.coords)
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
        })

	}

	componentWillUpdate() {

		AsyncStorage.getItem('user', (err, result) => {

			firebase.database().ref('users/' + result ).update({
	        	region: {
	        		latitude: this.state.region.latitude,
	        		longitude: this.state.region.longitude
	        	}
	        })

		})

	}



	_getDataFriends = (uid) => {

		let dbRef = firebase.database().ref('users');
        dbRef.on('child_added', (val) => {
            let person = val.val();
            person.uid = val.key;

            if (person.uid !== uid) {
                
            	this.setState((prevState) => {
                    return {
                        users: [...prevState.users, person]
                    }
                });

            }
        })
	}


	_updateLocation = (uid, location) => {

		firebase.database().ref('users/' + uid ).update({
        	region: {
        		latitude: location.latitude,
        		longitude: location.longitude
        	}
        })
	}

	_renderInfo = (data) => {
		return(
			<Text>
				{data.name}
			</Text>
		)
	}

	_trackFriends = async (item) => {
		await _mapView.animateToRegion({
			latitude: item.location.latitude,
			longitude: item.location.longitude,
			latitudeDelta: LATITUDE_DELTA,
		  	longitudeDelta: LONGITUDE_DELTA
		})

		this.props.navigation.closeDrawer()
	}



	componentWillUnmount() {
	    navigator.geolocation.clearWatch(this.watchID);
	}



	render () {

		return (
			<React.Fragment>
				<MapView
					ref={(MapView) => {_mapView = MapView}}
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

		    	<View style={{
		    		backgroundColor: 'white',
		    		width: '100%',
		    		zIndex: 999,
		    		position: 'absolute',
		    		bottom: 0
		    	}}>
		    		<FlatList
		    			data={this.state.users}
		    			horizontal={true}
		    			keyExtractor={(item) => {item.uid.toString()}}
		    			renderItem={({item}) => {
		    				return(
		    					<TouchableOpacity style={{
		    						margin: 10,
		    						alignItems: 'center',

		    					}}
		    					onPress={() => _mapView.animateToRegion({
									latitude: item.region.latitude,
									longitude: item.region.longitude,
									latitudeDelta: LATITUDE_DELTA,
								  	longitudeDelta: LONGITUDE_DELTA
								})}
		    					onLongPress={() => {
		    						this.props.navigation.navigate('PrivateChat', item)
		    					}}
		    					>
		    						<Avatar
										size={30}
										rounded
										title={item.name[0]}
										source={{uri: item.imageUrl}}
										onPress={() => console.log("Works!")}
										activeOpacity={0.7}
										onPress={() => _mapView.animateToRegion({
											latitude: item.region.latitude,
											longitude: item.region.longitude,
											latitudeDelta: LATITUDE_DELTA,
										  	longitudeDelta: LONGITUDE_DELTA
										})}
										onLongPress={() => {
				    						this.props.navigation.navigate('PrivateChat', item)
				    					}}
									/>
									<Text>
										{item.name}
									</Text>
		    					</TouchableOpacity>
		    				)
		    			}}
		    		/>
		    	</View>

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

export default withNavigation(Maps)