import React from 'react';
import {
  Text,
  View,
} from 'react-native';

import {GiftedChat} from 'react-native-gifted-chat';
import Backend from '../Backend';

class Chat extends React.Component {
    state = {
        messages: []
    }
    componentWillMount() {

  }
  render() {
    return (
      <GiftedChat
      messages={this.state.messages}
      onSend={(message) => {
          //send message to firebase
          Backend.sendMessage(message);
      }}
      user={{
          _id: Backend.getUid(),
          name: this.props.name,
      }}
      />
    );
  }
  componentDidMount() {
    Backend.loadMessages((message) => {
      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, message),
        };
      });
    });
  }
  componentWillUnmount() {
    Backend.closeChat();
  }
}

Chat.defaultProps = {
    name : 'John',
};

Chat.propTypes = {
    name : React.PropTypes.string,
};

export default Chat;