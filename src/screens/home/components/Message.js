
//=========== React Native ==========//

import React from 'react'
import {
	View,
	Text,
	StyleSheet,
	Alert,
	AsyncStorage,
	ActivityIndicator,
	ScrollView
} from 'react-native'

//=============== Icons ================//

import Entypo from 'react-native-vector-icons/dist/Entypo';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

//======== React Native Elements ========//

import {
	Button, 
	Avatar,
	ListItem
} from 'react-native-elements'

//============= Firebase =============//

import firebase from '../../../Firebase'

//============= Components ==============//

import HeaderChat from './HeaderChat'


//============= Navigation ==============//

import { withNavigation } from 'react-navigation'


//============= User Login ==============//

import User from '../../../User'



class Message extends React.Component {

	constructor(props) {
		super(props);
	
		this.state = {
			users: [],
			isLoading: true,
		};
	}

	componentDidMount() {
		AsyncStorage.getItem('user', (err, result) => {
			if (result) {

				firebase.database().ref('users').on('child_added', (val) => {
					const users = val.val()
					users.uid = val.key;
					if (users.uid === result) {

						User.profile = users

					} else {

						this.setState((prevState) => {
							return {
								users: [...prevState.users, users],
								isLoading: false
							}
						})
					}
				})
			}
		})		

	}

	render() {
		return(
			<View>
				<HeaderChat title="Message" />
				<ScrollView>
				{
					this.state.isLoading ?
					<ActivityIndicator style={{top: 200}} size="large" color="#0FA391" />
					:
					this.state.users.map((data) => {
						return(

								<ListItem
									leftAvatar={{
								  		title: data.name[0],
								    	source: { uri: data.imageUrl === '' ? 'image' : data.imageUrl },
									}}
									title={data.name}
									chevron
									key={data.uid}
									containerStyle={{borderBottomWidth: 1, borderColor: '#f5f5f5'}}
									onPress={() => {
										this.props.navigation.navigate('PrivateChat', data)
								  }}
								/>
							
						)
					})
				}
				</ScrollView>
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
		backgroundColor: 'white',
		elevation: 2
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

export default withNavigation(Message);
//