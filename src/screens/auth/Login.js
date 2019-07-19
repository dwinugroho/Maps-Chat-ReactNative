
//=========== React Native ==========//

import React, { Component } from 'react'
import {
	View, 
	Text,
	Image,
	StyleSheet,
	StatusBar,
	TextInput,
	AsyncStorage,
	ActivityIndicator
} from 'react-native'

//======= React Native Elements =======//

import { 
	Input,
	Button
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


//============= Firebase =============//

import firebase from '../../Firebase'


//============= Components ===========//

import Header from './components/Header'





class Login extends Component {

	constructor(props) {
		super(props);
	
		this.state = {
			isLoading: false,
			email: '',
			password: '',
			emailValidate: '',
			passwordValidate: ''
		};
	}



	componentDidMount() {
       StatusBar.setHidden(true);
    }


    emailChange = (value) => {
    	this.setState({
    		emailValidate: '',
    		email: value
    	})
    }

    passwordChange = (value) => {
    	this.setState({
    		passwordValidate: '',
    		password: value,
    	})
    }

    loginHandle = async () => {

    	this.setState({

			isLoading: true
		})

    	firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)

		.then( async (result) => {

			await AsyncStorage.setItem('user', result.user.uid)

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
		})


	    .catch( (error) => {
			  
			// Handle Errors here.

			const errorCode = error.code;

			const errorMessage = error.message;

	  		if (errorCode === 'auth/wrong-password') {

	  			this.setState({

	  				password: '',
					isLoading: false,
					passwordValidate: error.message
				})

	  		} else {

	  			this.setState({
	  				email: '',
	  				password: '',
					isLoading: false,
					emailValidate: error.message
				})

	  		}

	  		console.log(error);
		});


    }

	render() {
		return(
			<View style={styles.parentView}>
				<Header title="Sign In" navigation={this.props.navigation} />
				<View style={styles.bottomComponent}>
					<View style={styles.form}>
						<Text style={styles.titleInput}>
							Email
						</Text>
						<TextInput 
							placeholder="E - Mail" 
							value={this.state.email}
							onChangeText={this.emailChange}
							style={styles.textInput}  
						/>
						<Text style={{color: 'red', top: 5, left: 10}}>{this.state.emailValidate}</Text>
					</View>
					<View style={styles.form}>
						<Text style={styles.titleInput}>
							Password
						</Text>
						<TextInput 
							placeholder="Password"
							value={this.state.password} 
							onChangeText={this.passwordChange}
							secureTextEntry={true} 
							style={styles.textInput} 
						/>
						<Text style={{color: 'red', top: 5, left: 10}}>{this.state.passwordValidate}</Text>
					</View>
					<View style={styles.buttonWrap}>
						<Button
							onPress={this.loginHandle}
							buttonStyle={styles.loginButton}
							title="Sign In"
						/>
					</View>
				</View>
				{
					this.state.isLoading ? 
					<View style={{
						position: 'absolute',
						justifyContent: 'center',
						alignSelf: 'center',
						width: '100%',
						height: '100%',
						backgroundColor: 'white'
					}}>
						<ActivityIndicator size="large" color="#0FA391" />
					</View>
					:
					<View />
				}

				<View style={styles.imageWrap}>
					<Image
						style={styles.welcomeImage}
						source={require('../../assets/undraw/undraw_uploading_go67.png')}
					/>
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
		top: -230,
		left: -150
	},
	form: {
		width: '100%',
		marginVertical: 10
	},
	titleInput: {
		fontSize: 18,
		marginLeft: 10,
		marginBottom: 10
	},
	textInput: {
		borderBottomRightRadius: 10,
		borderTopLeftRadius: 10,
		borderBottomLeftRadius: 10,
		paddingHorizontal: 20,
		backgroundColor: '#f5f5f5',
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


export default Login;