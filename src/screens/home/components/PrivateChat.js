import React from 'react'
import {
	View,
	Text,
	StyleSheet,
	KeyboardAvoidingView,
	TextInput,
	FlatList,
	ActivityIndicator
} from 'react-native'

import {
	Button, Avatar
} from 'react-native-elements'

//=============== Icons ================//

import Entypo from 'react-native-vector-icons/dist/Entypo';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

//============== Firebase =============//

import firebase from '../../../Firebase'

import User from '../../../User'

import moment from 'moment'


class PrivateChat extends React.Component {

	constructor(props) {
		super(props);
	
		this.state = {
			person: {
				name : this.props.navigation.state.params.name,
				uid: this.props.navigation.state.params.uid,
			},
			textMessage: '',
			messagesList: [],
			isLoading: true,
		};
	}

	textMessage = (value) => {
		this.setState({
			textMessage: value
		})
	}

	componentWillMount() {
		firebase.database().ref('message').child(User.profile.uid).child(this.state.person.uid).on('child_added', (result) => {
			this.setState((prevState) => {
				return {
					messagesList: [result.val(), ...prevState.messagesList],
				}
			})
			this.setState({
				isLoading: false,
			})

		})


	}

	sendMessage = async () => {
		if (this.state.textMessage.length > 0) {

			let msgId = firebase.database().ref('messages').child(User.profile.uid).child(this.state.person.uid).push().key;
			let updates = {};
			let message = {
				message: this.state.textMessage,
				time: firebase.database.ServerValue.TIMESTAMP,
				from: User.profile.uid
			}
			updates['message/' + User.profile.uid + '/' + this.state.person.uid + '/' + msgId] = message;
			updates['message/' + this.state.person.uid + '/' + User.profile.uid + '/' + msgId] = message;

			firebase.database().ref().update(updates);
			this.setState({
				textMessage: '',
			})
		}
	}


	_renderItem = ({item}) => {
		return(
			<View style={{
				maxWidth: '80%',
				alignSelf: item.from===User.profile.uid ? 'flex-end' : 'flex-start',
				backgroundColor: item.from===User.profile.uid ? '#00D4AA' : 'white',
				borderRadius: 10,
				borderTopRightRadius: item.from===User.profile.uid ? 0 : 10,
				borderTopLeftRadius: item.from===User.profile.uid ? 10 : 0,
				marginVertical: 10,
				
			}}>
				<Text style={{
					color: 'black', 
					padding: 10, 
					paddingBottom: 1,
					fontSize: 16,
					marginLeft: item.from===User.profile.uid ? 10 : 0,
					marginRight: item.from===User.profile.uid ? 0 : 10,
				}}>
					{item.message}

				</Text>
				<Text style={{
					color: 'grey', 
					fontSize: 12,
					paddingHorizontal: 10, 
					alignSelf: 'flex-end',
					paddingVertical: 5,
				}}>
					{moment(item.time).format('DD MMM h:mm')}
				</Text>
				
			</View>
		)
	}


  	render() {
    	return (
    		<View style={styles.parentBody}>

    			<View style={styles.parentHeader}>
					<Button 
						buttonStyle={{backgroundColor: 'rgba(0,0,0,0)'}}
						onPress={() => {this.props.navigation.goBack()}}
						icon={
						    <Entypo
						      name="chevron-left"
						      size={25}
						      color="grey"
						    />
						}
					/>
					<View style={styles.textWrap}>

						<Text style={styles.headerText}>{this.props.navigation.state.params.name}</Text>
					</View>

				</View>

				<View  style={{flex: 1, justifyContent: 'flex-end'}}>

					<View style={styles.containerChat}>

						{
							this.state.isLoading ? 

							<ActivityIndicator style={{
								position: 'absolute',
								justifyContent: 'center',
								alignSelf: 'center',
								height: '100%'
							}} size="large" color="#0FA391" />
							
							:
							
							<FlatList
								inverted
								style={styles.chat}
								data={this.state.messagesList}
								renderItem={this._renderItem}
								keyExtractor={(item, index) => index.toString()}
							/>

						}

					</View>

					<View style={{flexDirection: 'row', padding: 10,paddingBottom: 15, backgroundColor: 'white'}}>
						<TextInput 
							style={styles.textInput} 
							placeholder="enter your text here..."
							value={this.state.textMessage} 
							onChangeText={this.textMessage}
						/>
						<Button 
							buttonStyle={{backgroundColor: 'rgba(0,0,0,0)'}}
							icon={
							    <Ionicons
							      name="md-send"
							      size={25}
							      color="#0FA391"
							    />
							}
							onPress={() => this.sendMessage()}
						/>
					</View>
				</View>

    		</View>
    	)
  	}
}

export default PrivateChat

const styles = StyleSheet.create({
	parentBody: {
		flex: 1,
		backgroundColor: '#ededed'
	},
	parentHeader: {
		flexDirection: 'row',
		height: 80,
		alignItems: 'center',
		backgroundColor: 'white',
		paddingTop: 20,
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
	textInput: {
		borderWidth: 1,
		borderColor: '#ededed',
		flex: 1,
		backgroundColor: '#f5f5f5',
		borderRadius: 15,
		paddingVertical: 1,
		paddingHorizontal: 25
	},
	containerChat: {
		flex: 1,
	}, 
	chat: {
		zIndex: -999,
		paddingHorizontal: 20,
		flex: 1,
	},
	
})