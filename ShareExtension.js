import React from 'react';
import { View, Text, Button } from 'react-native';
import ShareExtension from 'react-native-share-extension';

class Share extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      value: ''
    };
  }

  async componentDidMount() {
    try {
      const { type, value } = await ShareExtension.data();
      this.setState({
        type,
        value
      });
    } catch(e) {
      console.log('Error:', e);
    }
  }

  onClose = () => {
    ShareExtension.close();
  }

  render() {
    return (
      <View>
        <Text>Type: {this.state.type}</Text>
        <Text>Value: {this.state.value}</Text>
        <Button title="Close" onPress={this.onClose} />
      </View>
    );
  }
}

export default Share;