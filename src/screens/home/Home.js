
//=========== React Native ==========//

import React from 'react'
import {
	View,
	Text,
	StyleSheet,
	StatusBar,
  Dimensions,
  AsyncStorage
} from 'react-native'

//=============== Icons ================//

import Entypo from 'react-native-vector-icons/dist/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Foundation from 'react-native-vector-icons/dist/Foundation';


//============ Components ===========//

import Header from './components/Header'
import Maps from './components/Maps'
import Message from './components/Message'


//======= React Native Tab View =======//

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

//============= Firebase =============//

import firebase from '../../Firebase'

//============= Save data ==============//

import User from '../../User'



class Home extends React.Component {

    constructor(props) {
      super(props);
    
      this.state = {
          index: 0,
          routes: [
            { 
              key: 'first', 
              title: 'Maps', 
              icon: 'google-maps',
            },
            { 
              key: 'second', 
              title: 'Message',
              icon: 'message-text-outline',
            },
          ],
          friends: []
        }
    }

    componentDidMount() {

      StatusBar.setHidden(false);

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

                    friends: [...prevState.friends, users]

                  }

              })

            }
          })
        }
      })    

    }

  	render () {

  		return (
  			<View style={styles.parentBody}>
  				<Header title="Dwi Nugroho" navigation={this.props.navigation} />
  				<TabView
            tabBarPosition="bottom"
            navigationState={this.state}
            renderScene={SceneMap({
              first: Maps,
              second: Message,
            })}
            onIndexChange={index => this.setState({ index })}
            initialLayout={{ width: Dimensions.get('window').width }}
            renderTabBar={props =>
              <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: '#0FA391' }}
                style={{ backgroundColor: 'white', height: 50 }}
                labelStyle={{color: 'black', fontSize: 0}}
                renderIcon={({ route, focused, color }) => (
                  <MaterialCommunityIcons
                    name={route.icon}
                    color={focused ? '#0FA391' : 'grey'}
                    size={20}
                  />
                )}
              />
            }
          />
  			</View>
  		)
  	}
}

const styles = StyleSheet.create({
	parentBody: {
		flex: 1,
		backgroundColor: 'white'
	}
})

export default Home;