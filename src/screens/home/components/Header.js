
//=========== React Native ==========//

import React from 'react'
import {
	View,
	Text,
	StyleSheet,
	Alert,
	AsyncStorage
} from 'react-native'

//=============== Icons ================//

import Entypo from 'react-native-vector-icons/dist/Entypo';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

//======== React Native Elements ========//

import {
	Button, Avatar
} from 'react-native-elements'

//============= User Login ==============//

import User from '../../../User'




class HomeHeader extends React.Component {

	logout = async () => {
    	await AsyncStorage.clear()

    	User.profile = null

    	this.props.navigation.navigate('Auth')
    }


	render() {
		return(
			<View style={styles.parentHeader}>
				<Avatar
				  rounded
				  icon={{name: 'user', type: 'font-awesome'}}
				  source={{uri: User.profile == null ? 'image' : User.profile.imageUrl}}
				  onPress={() => {
						this.props.navigation.navigate('Profile', User.profile)
				  }}
				  activeOpacity={0.7}
				  containerStyle={styles.profile}
				/>
				<View style={styles.textWrap} >
					<Text 
						style={styles.headerText}
						onPress={() => {
							this.props.navigation.navigate('Profile', User.profile)
						}}
					>
						{User.profile === null ? 'Profile Name' : User.profile.name}
					</Text>
				</View>
				<Button 
					buttonStyle={{backgroundColor: 'rgba(0,0,0,0)'}}
					icon={
					    <Ionicons
					      name="md-exit"
					      size={25}
					      color="grey"
					    />
					}
					onPress={() => {
						Alert.alert(
				            "Logout",
				            "Are you sure want to leave?",
				            [
				                {
				                    text: "NO", onPress: () => {
				                        
				                    }
				                },
				                {
				                    text: "YES", onPress: () => {
				                        
				                        this.logout()
				                    }
				                }
				            ],
				            { cancelable: false }
				        )
					}}
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	parentHeader: {
		flexDirection: 'row',
		height: 80,
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingTop: 20,
		backgroundColor: 'rgba(0,0,0,0.0)'
	},
	textWrap: {
		flex: 1,
		alignItems: 'flex-start'
	},
	headerText: {
		fontSize: 18,
		fontWeight: 'bold',
		left: 20,

	},
})

export default HomeHeader;