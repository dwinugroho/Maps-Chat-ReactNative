
//=========== React Native ==========//

import React, { Component } from 'react'
import {
	View, 
	Text,
	Image,
	StyleSheet,
	StatusBar,
	TextInput,
	ActivityIndicator,
	AsyncStorage
} from 'react-native'

//======= React Native Elements =======//

import { 
	Input,
	Button,
	Avatar
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


//============= Firebase =============//

import firebase from '../../../Firebase'


//============= Components ===========//

import Header from '../components/Header'


class Register extends Component {

	constructor(props) {
		super(props);
	
		this.state = {
			email: this.props.navigation.state.params.email,
			uid: this.props.navigation.state.params.uid,
			name: '',
			imageUrl: '',
			nameValidate: '',
			isLoading: false,
		};
	}



	componentDidMount() {
       StatusBar.setHidden(false);
    }

    nameChange = (value) => {
    	this.setState({
    		name: value,
    		nameValidate: ''
    	})
    }

    imageUrlChange = (value) => {
    	this.setState({
    		imageUrl: value,
    	})
    }


    registerHandle = async () => {

        	if (this.state.name === ''){

               	this.setState({

               		nameValidate: 'Must be filled!'
               	})
           	} else {
           		
           		const { name, password, email, imageUrl, uid } = this.state

           		this.setState({
           			isLoading: true,
           		})

           		await firebase.database().ref('users/' + uid).set({
           			name: name,
           			email: email,
           			imageUrl: imageUrl
           		})

           		await AsyncStorage.setItem('user', uid)

				AsyncStorage.getItem('user', (error, result) => {

					if (result) {

						this.setState({
							email: '',
							password: '',
							isLoading: false
						})

						this.props.navigation.navigate('App')
					}
				})
           		

           	}
    }

	render() {
		return(
			<View style={styles.parentView}>
				<Header title="Sign Up" navigation={this.props.navigation} />
				<View style={styles.imageWrap}>
					<Image
						style={styles.welcomeImage}
						source={require('../../../assets/undraw/undraw_secure_data_0rwp.png')}
					/>
				</View>

				{
					this.state.isLoading ? 
					<View style={{
						position: 'absolute',
						justifyContent: 'center',
						alignSelf: 'center',
						width: '100%',
						height: '100%',
						zIndex: 999,
						backgroundColor: 'white'
					}}>
						<ActivityIndicator size="large" color="#0FA391" />
					</View>
					:
					<View />
				}

				<View style={{
					width: '100%',
					alignItems: 'center',
					top: -80
				}}>

					<Avatar
						size={150}
						rounded
						title={this.state.name !== '' ? this.state.name[0] : '...'}
						source={{ uri: this.state.imageUrl !== '' ? this.state.imageUrl : 'image' }}
					/>

					<Text style={{
						top: 20,
						fontSize: 20,
						fontWeight: 'bold'
					}}>	
						{
							this.state.name !== '' ? this.state.name : 'Profile Name' 
						}
					</Text>

				</View>
				<View style={styles.bottomComponent}>
					<View style={styles.form}>
						<Text style={styles.titleInput}>
							Full Name
						</Text>
						<TextInput 
							placeholder="Full Name" 
							style={styles.textInput} 
							value={this.state.name}
							onChangeText={this.nameChange}

						/>
						<Text style={{color: 'red', top: 5, left: 10}}>{this.state.nameValidate}</Text>
					</View>
					<View style={styles.form}>
						<Text style={styles.titleInput}>
							Profile Picture - url
						</Text>
						<TextInput 
							placeholder="enter url here..." 
							style={styles.textInput} 
							value={this.state.imageUrl}
							onChangeText={this.imageUrlChange}
						/>
					</View>
					<View style={styles.buttonWrap}>
						<Button
							buttonStyle={styles.loginButton}
							title="Sign Up"
							onPress={() => {
								this.registerHandle()
							}}
						/>
					</View>
				</View>

			</View>
		)
	}
}

const styles = StyleSheet.create({
	parentView: {
		flex: 1,
		backgroundColor: 'white'
	},
	bottomComponent: {
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		marginHorizontal: 40,
		top: -50
	},
	imageWrap: {
		flex: 1,
		zIndex: -999,
		alignItems: 'flex-start'
	},
	welcomeImage: {
		width: 550,
		resizeMode: 'contain',
		paddingVertical: 0,
		top: -450,
		right: -50,
		transform: [{ rotate: '-220deg' }]
	},
	signUpButton: {
		backgroundColor: '#00D4AA',
		paddingHorizontal: 100,
		borderRadius: 5,
		borderWidth: 4,
		borderColor: '#00D4AA'
	},
	titleSignUpButton: {
		color: 'white',
	},
	signInButton: {
		backgroundColor: 'rgba(0,0,0,0.0)',
		paddingHorizontal: 142,
		borderRadius: 5,
		borderWidth: 2,
		borderColor: '#00D4AA',
		marginTop: 15
	},
	titleSignInButton: {
		color: '#00D4AA',
	},
	form: {
		width: '100%',
		marginVertical: 10
	},
	titleInput: {
		fontSize: 18,
		marginLeft: 10,
		marginBottom: 10,

	},
	textInput: {
		backgroundColor: '#f5f5f5',
		borderBottomRightRadius: 10,
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
		paddingHorizontal: 20,
		borderWidth: 1,
		borderColor: '#ededed'
	},
	buttonWrap: {
		width: '100%',
		marginTop: 20
	},
	loginButton: {
		backgroundColor: '#0FA391',
		borderBottomRightRadius: 10,
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
		paddingVertical: 10
	}
})


export default Register;