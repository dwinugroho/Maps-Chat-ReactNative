
//=========== React Native ==========//

import React from 'react'
import {
	View,
	Text,
	StyleSheet
} from 'react-native'

//=============== Icons ================//

import Entypo from 'react-native-vector-icons/dist/Entypo';

//======== React Native Elements ========//

import {
	Button
} from 'react-native-elements'




class AuthHeader extends React.Component {
	render() {
		return(
			<View style={styles.parentHeader}>
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
		height: 100,
		alignItems: 'center',
		paddingHorizontal: 20,
	},
	textWrap: {
		flex: 1,
		alignItems: 'flex-end'
	},
	headerText: {
		fontSize: 18,
		fontWeight: 'bold',
		right: 20
	}
})

export default AuthHeader;