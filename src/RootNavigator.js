
//============ React Native ================//

import React from 'react'
import {
	ActivityIndicator,
	View,
	AsyncStorage
} from 'react-native'

//=========== React Navigation ============//

import { 
	createSwitchNavigator, 
	createStackNavigator,
	createAppContainer
} from 'react-navigation'


//============= Auth Screen ================//

import Welcome from './screens/welcome/Welcome'
import Login from './screens/auth/Login'
import Register from './screens/auth/register/Register'
import NextRegister from './screens/auth/register/NextRegister'

//============== App Screen ================//

import Home from './screens/home/Home'
import PrivateChat from './screens/home/components/PrivateChat'

 

class AuthLoadingScreen extends React.Component {

	componentDidMount () {
		AsyncStorage.getItem('user', (err, result) => {

			if (result) {

				this.props.navigation.navigate('App')
			} else {

				this.props.navigation.navigate('Auth')
			}
		})
	}

	render() {
		return (
			<View style={{
				flex: 1,
				justifyContent: 'center',
				AlignItems: 'center'
			}}>
				<ActivityIndicator size="large" color="#0FA391" />
			</View>
		)
	}
}


const AuthStack = createStackNavigator({
	Welcome: { screen: Welcome },
	Login: { screen: Login },
	Register: { screen: Register },
	NextRegister: { screen: NextRegister }
}, 
{
	headerMode: 'none',
	navigationOptions: {

        headerVisible: false,
    }
})

const AppStack = createStackNavigator({
	Home: { screen: Home },
	PrivateChat: { screen: PrivateChat }
}, 
{
	headerMode: 'none',
	navigationOptions: {

        headerVisible: false,
    }
})

const Switch = createSwitchNavigator({
	AuthLoading: AuthLoadingScreen,
	App: AppStack,
	Auth: AuthStack
},{

	initialRouteNma: 'AuthLoading',

})


export default createAppContainer(Switch)