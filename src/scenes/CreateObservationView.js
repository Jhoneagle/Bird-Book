import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import GetLocation from 'react-native-get-location';
import {
  Container,
  Content,
  Text,
  Button,
  Form,
  Item,
  Label,
  Input,
  Picker,
  Icon,
  Textarea,
} from 'native-base';
import {connect} from 'react-redux';
import {createObservation} from '../reducers/ObservationsReducer';

class CreateObservationView extends Component {
  static navigationOptions = {
    title: 'New observation',
  };

  constructor(props) {
    super(props);
    this.state = {
      species: '',
      rarity: 'Common',
      notes: '',
    };
  }

  onValueChange(value: string) {
    this.setState({
      rarity: value,
    });
  }

  create = () => {
    return () => {
      var regex = /^[a-zA-Z]+(?:[\s.]+[a-zA-Z]+)*$/g;

      if (!regex.test(this.state.species)) {
        alert("Species' do have a name you know...");
        return;
      }

      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 5000,
      })
        .then(location => {
          const object = {
            species: this.state.species,
            rarity: this.state.rarity,
            notes: this.state.notes,
            timestamp: new Date(),
            latitude: location.latitude,
            longitude: location.longitude,
          };

          this.props.createObservation(object);
          this.props.navigation.goBack();
        })
        .catch(error => {
          const {code, message} = error;
          console.warn(code, message);
        });
    };
  };

  cancel = () => {
    return () => {
      this.props.navigation.goBack();
    };
  };

  render() {
    return (
      <Container>
        <Content padder>
          <Form>
            <Item floatingLabel>
              <Label>Species' name</Label>
              <Input
                onChangeText={value => {
                  this.setState({species: value});
                }}
                value={this.state.species}
              />
            </Item>
            <Item floatingLabel>
              <Label>Notes</Label>
              <Input
                numberOfLines={5}
                multiline={true}
                bordered
                style={styles.notes_form}
                onChangeText={value => {
                  this.setState({notes: value});
                }}
                value={this.state.notes}
              />
            </Item>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={styles.picker}
                placeholder="Select rarity: "
                placeholderStyle={styles.picker_placeholder}
                placeholderIconColor="#007aff"
                selectedValue={this.state.rarity}
                onValueChange={this.onValueChange.bind(this)}>
                <Picker.Item label="Common" value="Common" />
                <Picker.Item label="Rare" value="Rare" />
                <Picker.Item label="Extremely rare" value="Extremely rare" />
              </Picker>
            </Item>
          </Form>
          <Button full success style={styles.submit} onPress={this.create()}>
            <Text>Create</Text>
          </Button>
          <Button full danger style={styles.submit} onPress={this.cancel()}>
            <Text>Cancel</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  picker: {
    width: undefined,
    margin: 5,
  },
  picker_placeholder: {
    color: '#bfc6ea',
  },
  submit: {
    margin: 5,
  },
  notes_form: {
    textAlignVertical: 'top',
    height: 200,
  },
});

export default connect(
  null,
  {createObservation},
)(CreateObservationView);
