
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




class HeaderChat extends React.Component {

	render() {
		return(
			<View style={styles.parentHeader}>
				
				<View style={styles.textWrap}>
					<Text style={styles.headerText}>{this.props.title}</Text>
				</View>

			</View>
		)
	}
}

const styles = StyleSheet.create({
	parentHeader: {
		flexDirection: 'row',
		height: 30,
		alignItems: 'center',
		backgroundColor: 'white',
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

export default HeaderChat;