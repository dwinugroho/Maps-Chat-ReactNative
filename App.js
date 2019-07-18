import React from 'react'
import {
	View,
	StatusBar,
	YellowBox
} from 'react-native'

YellowBox.ignoreWarnings(['Warning: Async Storage has been extracted from react-native core']);

//========= Root Navigator =========//

import RootNavigator from './src/RootNavigator'

//============== FireBase ============//

import Firebase from './src/Firebase'


export default class App extends React.Component {

	componentDidMount() {
		Firebase.init()
	}

	render() {
		return(
			<View style={{flex: 1,}}>
				<StatusBar 
					translucent
		        	barStyle="dark-content"
		        	backgroundColor="rgba(0, 0, 0, 0.0)" 
		        />
				<RootNavigator />
			</View>
		)
	}
}