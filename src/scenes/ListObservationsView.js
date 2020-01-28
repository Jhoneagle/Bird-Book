import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationEvents} from 'react-navigation';
import {Container, Content, Text, Button} from 'native-base';
import {SwipeListView} from 'react-native-swipe-list-view';
import {connect} from 'react-redux';
import {shortObservations} from '../reducers/ObservationsReducer';

class ListObservationsView extends Component {
  static navigationOptions = {
    title: 'Bird observations',
    shortBy: 'time',
  };

  render() {
    return (
      <Container style={styles.container}>
        <NavigationEvents
          onDidFocus={() => this.shortObservations(this.state.shortBy)}
        />

        <Content padder>
          <Button
            transparent
            style={styles.navigationButton}
            onPress={() => {
              this.props.navigation.navigate('NewObservation');
            }}>
            <Text>+</Text>
          </Button>

          <SwipeListView
            data={this.props.observations}
            renderItem={(data, rowMap) => (
              <View style={styles.container}>
                <Text>I am {data.species} in a SwipeListView</Text>
              </View>
            )}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  navigationButton: {
    alignSelf: 'center',
    margin: 30,
  },
  container: {
    alignSelf: 'center',
    margin: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  return {
    observations: state.observations,
  };
};

export default connect(
  mapStateToProps,
  {shortObservations},
)(ListObservationsView);
