import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Container, Content, Text} from 'native-base';
import {connect} from 'react-redux';

class ListObservationsView extends Component {
  static navigationOptions = {
    title: 'Bird observations',
  };

  render() {
    return (
      <Container style={styles.dummy}>
        <Content padder>
          <Text>{this.props.observations.length}</Text>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  dummy: {
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

export default connect(mapStateToProps)(ListObservationsView);
