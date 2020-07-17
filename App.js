import React from 'react'
import { Text, SafeAreaView, StyleSheet } from 'react-native'
import Map from './components/Map'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import YelpService from'./services/yelp'



const deltas = {
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421
};

export default class App extends React.Component {
  state = {
    region: null,
    bobaShops: []
  };

  //unsafe is the new version of componentwillmount
  UNSAFE_componentWillMount() {
    this.getLocationAsync();
  }

  getBobaShops = async () => {
    const { latitude, longitude } = this.state.region;
    const userLocation = { latitude, longitude };
    const bobaShops = await YelpService.getBobaShops(userLocation);
    // sets state to all the boba shops fetched from yelp api near your location
    this.setState({ bobaShops });
  };


  // async gives a promise
  // await waits until promise is settled
  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted'){
      this.setState({
        errorMessage: 'Permission to access location was denied'
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      ...deltas
    };
    // set state and map view to wherever your current location is
    await this.setState({ region });
    await this.getBobaShops();
  }


  render() {
    const { region, bobaShops } = this.state;
    return (
      <SafeAreaView style={styles.container}>
      <Map
        region={region}
        places={bobaShops}
      />
      <Text> </Text>

    </SafeAreaView>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    width:'100%',
    height: '80%',
  }

});
