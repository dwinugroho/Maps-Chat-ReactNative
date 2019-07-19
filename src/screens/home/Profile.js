import React from 'react'
import {
	View,
	Text,
	StatusBar,
	StyleSheet,
	Image
} from 'react-native'

//=============== Icons ================//

import Entypo from 'react-native-vector-icons/dist/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';


//======== React Native Elements ========//

import {
	Button,
	Avatar
} from 'react-native-elements'


class Profile extends React.Component {


	render () {
		return(
			<View style={styles.parentBody}>
				<View style={styles.headerContainer}>
					<Button 
						buttonStyle={{backgroundColor: 'rgba(0,0,0,0)'}}
						icon={
						    <Entypo
						      name="chevron-left"
						      size={30}
						      color="black"
						    />
						}
						onPress={() => {
							this.props.navigation.goBack()
						}}
					/>
				</View>

				<View style={styles.imageWrap}>
					<Image
						style={styles.welcomeImage}
						source={require('../../assets/undraw/undraw_secure_data_0rwp.png')}
					/>
				</View>

				<View style={{
					padding: 25,
					borderRadius: 200,
					backgroundColor: 'rgba(0,0,0,0.1)',
					alignSelf: 'center'
				}}>
					<View style={{
						padding: 30,
						backgroundColor: 'rgba(0,0,0,0.2)',
						borderRadius: 200
					}}>
						<Avatar
							size={150}
							rounded
							title={this.props.navigation.state.params.name[0]}
							source={{ uri: this.props.navigation.state.params.imageUrl }}
						/>
					</View>
				</View>

				<View style={{marginHorizontal: 30, marginTop: 30}}>
					<Text  style={{
						backgroundColor: '#00D4AA',
						alignSelf: 'flex-start',
						paddingHorizontal: 35,
						paddingVertical: 10,
						borderRadius: 50,
						borderBottomLeftRadius: 0,
						color: 'white',
						fontSize: 17,
						fontWeight: 'bold',
						left: 2,

					}}>
						Hello I'm
					</Text>
					<Text
					style={{
						fontSize: 60,
						color: 'black',
						marginTop: 10
					}}>
						{this.props.navigation.state.params.name.toUpperCase()}
					</Text>
					<View style={{flexDirection: 'row', marginLeft: 2, marginTop: 10}}>

						<MaterialCommunityIcons name="email" size={17} />
						<Text
						style={{
							fontSize: 20,
							fontWeight: 'bold',
							marginLeft: 10,
							bottom: 4,
						}}
						>
							{this.props.navigation.state.params.email}
						</Text>

					</View>
				</View>
				
			</View>
		)
	}
}

export default Profile

const styles = StyleSheet.create({
	parentBody: {
		backgroundColor: 'white'
	},
	headerContainer: {
		height: 100,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 25,
		backgroundColor: 'rgba(0,0,0,0.0)'
	},
	profileContainer: {
		//backgroundColor: 'rgba(0,0,0,0.0)',
		backgroundColor: 'red'
	},
	imageWrap: {
		zIndex: -999,
		alignItems: 'flex-start',
		position: 'absolute'
	},
	welcomeImage: {
		width: 550,
		resizeMode: 'contain',
		paddingVertical: 0,
		top: -300,
		right: -50,
		transform: [{ rotate: '-220deg' }]
	},
})