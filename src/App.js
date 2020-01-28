import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {persistor, store} from './store';
import LoadingView from './scenes/LoadingView';
import CreateObservationView from './scenes/CreateObservationView';
import ListObservationsView from './scenes/ListObservationsView';

let RootNavigation = createStackNavigator(
  {
    Home: {
      screen: ListObservationsView,
    },
    NewObservation: {
      screen: CreateObservationView,
    },
  },
  {
    initialRouteName: 'Home',
  },
);

RootNavigation.navigationOptions = {
  headerStyle: {
    backgroundColor: '#f4511e',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

let Navigation = createAppContainer(RootNavigation);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingView />} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
