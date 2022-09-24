import React, { Component } from 'react';
import { FlatList, Text, View, TouchableOpacity, Alert  } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import Loading from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { SwipeListView } from 'react-native-swipe-list-view';
// redux
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
  return {
    story: state.story,
    favorites: state.favorites
  }
};
import { deleteFavorite } from "../redux/ActionCreators";
const mapDispatchToProps = (dispatch) => ({
  deleteFavorite: (storyId) => dispatch(deleteFavorite(storyId)),
});
class Favorites extends Component {
  render() {
    if (this.props.story.isLoading) {
      return (<Loading />);
    } else if (this.props.story.errMess) {
      return (<Text>{this.props.story.errMess}</Text>);
    } else {
      const story = this.props.story.story.filter((story) => this.props.favorites.some((el) => el === story.id));
      return (
        // <FlatList data={story}
        //   renderItem={({ item, index }) => this.renderMenuItem(item, index)}
        //   keyExtractor={(item) => item.id.toString()} />
        <SwipeListView data={story}
        renderItem={({ item, index }) => this.renderMenuItem(item, index)}
        renderHiddenItem={({ item, index }) => this.renderHiddenItem(item, index)}
        keyExtractor={(item) => item.id.toString()}
        rightOpenValue={-100} />
      );
    }
  }
  renderMenuItem(item, index) {
    const { navigate } = this.props.navigation;
    return (
      <ListItem key={index} onPress={() => navigate('Dishdetail', { storyId: item.id })}>
        <Avatar source={{ uri: baseUrl + item.image }} />
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          
        </ListItem.Content>
      </ListItem>
    );
  }
  renderHiddenItem(item, index) {
    return (
      <View style={{ alignItems: 'center', backgroundColor: '#DDD', flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 15 }}>
        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 0, bottom: 0, right: 0, width: 100, backgroundColor: 'red' }}
          onPress={() => {
            Alert.alert(
              'Delete Favorite?',
              'Are you sure you wish to delete this favorite dish: ' + item.name + '?',
              [
                { text: 'Cancel', onPress: () => { /* nothing */ } },
                { text: 'OK', onPress: () => this.props.deleteFavorite(item.id) }
              ]
            );
          }}>
          <Text style={{ color: '#FFF' }}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(Favorites);