
//=========== React Native ==========//

import React, { Component } from 'react'
import {
	View, 
	Text,
	Image,
	StyleSheet,
	StatusBar,
	TextInput,
	ActivityIndicator
} from 'react-native'

//======= React Native Elements =======//

import { 
	Input,
	Button
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
			email: '',
			password: '',
			confirmPassword: '',
			emailValidate: '',
			passwordValidate: '',
			confirmPasswordValidate: '',
			isLoading: false
		};
	}



	componentDidMount() {
       StatusBar.setHidden(true);
    }

    emailChange = (value) => {
    	this.setState({
    		email: value,
    		emailValidate: ''
    	})
    }

    passwordChange = (value) => {
    	this.setState({
    		password: value,
    		passwordValidate: ''
    	})
    }

    confirmPasswordChange = (value) => {
    	this.setState({
    		confirmPassword: value,
    		confirmPasswordValidate: ''
    	})
    }


    registerHandle = () => {
    	
    		if (this.state.confirmPassword !== this.state.password) {

           		this.setState({

           			confirmPasswordValidate: 'Password dont match!'
           		})

           	} else {

           		this.setState({
           			isLoading: true,
           		})

           		const { password, email } = this.state

           		firebase.auth().createUserWithEmailAndPassword(email, password)

					.then( async (result) => {

						this.props.navigation.navigate('NextRegister', {
							email: this.state.email,
							uid: result.user.uid
						})
					})


				    .catch( (error) => {
						  
						// Handle Errors here.

						const errorCode = error.code;
  						const errorMessage = error.message;

				  		if (errorCode == 'auth/weak-password') {
						    
						    this.setState({

				  				password: '',
				  				confirmPassword: '',
								isLoading: false,
								passwordValidate: errorMessage
							})
						} else {
						    
						    this.setState({

						    	email: '',
				  				password: '',
				  				confirmPassword: '',
								isLoading: false,
								emailValidate: errorMessage
							})
						}	

					});
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
				<View style={styles.bottomComponent}>
					<View style={styles.form}>
						<Text style={styles.titleInput}>
							Email
						</Text>
						<TextInput 
							placeholder="E - Mail" 
							style={styles.textInput} 
							value={this.state.email}
							onChangeText={this.emailChange}

						/>
						<Text style={{color: 'red', top: 5, left: 10}}>{this.state.emailValidate}</Text>
					</View>

					<View style={styles.form}>
						<Text style={styles.titleInput}>
							Password
						</Text>
						<TextInput 
							placeholder="Password" 
							secureTextEntry={true} 
							style={styles.textInput} 
							value={this.state.password}
							onChangeText={this.passwordChange}
						/>
						<Text style={{color: 'red', top: 5, left: 10}}>{this.state.passwordValidate}</Text>
					</View>
					<View style={styles.form}>
						<Text style={styles.titleInput}>
							Confirm Password
						</Text>
						<TextInput 
							placeholder="Confirm Password" 
							secureTextEntry={true} 
							style={styles.textInput}
							value={this.state.confirmPassword}
							onChangeText={this.confirmPasswordChange}
						/>
						<Text style={{color: 'red', top: 5, left: 10}}>{this.state.confirmPasswordValidate}</Text>
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