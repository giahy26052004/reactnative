import { Dimensions, StatusBar, StyleSheet} from 'react-native'
import React from 'react'
import { SceneMap, TabView } from 'react-native-tab-view';
import FirstRoute from './ProfileTabs/FirstRoute';
import SecondRoute from './ProfileTabs/SecondRoute';

export default class Profile extends React.Component {
    state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Tài khoản' },
        { key: 'second', title: 'Đơn hàng' },
      ],
    };
  
    render() {
      return (
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            first: FirstRoute,
            second: SecondRoute,
          })}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get('window').width }}
          style={styles.container}
        />
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      marginTop: StatusBar.currentHeight,
    },
    scene: {
      flex: 1,
    },
  });