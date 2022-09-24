import React, { Component } from "react";
import { View, Text, FlatList, PanResponder, Alert } from "react-native";
import { Card, Image, Icon } from "react-native-elements";
import { ScrollView } from "react-native-virtualized-view";
import { baseUrl } from "../shared/baseUrl";
import * as Animatable from "react-native-animatable";
// import Tts from 'react-native-tts';
class RenderComments extends Component {
  render() {
    const comments = this.props.comments;
    return (
      <Card>
        <Card.Title>Comments</Card.Title>
        <Card.Divider />
        <FlatList
          data={comments}
          renderItem={({ item, index }) => this.renderCommentItem(item, index)}
          keyExtractor={(item) => item.id.toString()}
        />
      </Card>
    );
  }
  renderCommentItem(item, index) {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
        <Text style={{ fontSize: 12 }}>
          {"-- " + item.author + ", " + item.date}{" "}
        </Text>
      </View>
    );
  }
}
class RenderDescripstion extends Component {
  render() {
    const story = this.props.story;
    if (story != null) {
      return (
        <Card>
          <Text style={{ margin: 10, textAlign: "center" }}>{story.description}</Text>
        </Card>
      );
    }
  }
}
// redux
import { connect } from "react-redux";
const mapStateToProps = (state) => {
  return {
    story: state.story,
    comments: state.comments,
    favorites: state.favorites,
  };
};
import { postFavorite } from "../redux/ActionCreators";
const mapDispatchToProps = (dispatch) => ({
  postFavorite: (storyId) => dispatch(postFavorite(storyId)),
});

class RenderDish extends Component {
  render() {
    // gesture
    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
      if (dx < -200) return true; // right to left
      return false;
    };
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => {
        return true;
      },
      onPanResponderEnd: (e, gestureState) => {
        if (recognizeDrag(gestureState)) {
          Alert.alert(
            "Add Favorite",
            "Are you sure you wish to add " + story.name + " to favorite?",
            [
              {
                text: "Cancel",
                onPress: () => {
                  /* nothing */
                },
              },
              {
                text: "OK",
                onPress: () => {
                  this.props.favorite
                    ? alert("Already favorite")
                    : this.props.onPressFavorite();
                },
              },
            ]
          );
        }
        return true;
      },
    });
    const story = this.props.story;
    // const handleVoice = () =>{
    //   Tts.speak(<Text>{story.description}</Text>)
    // }
    if (story != null) {
      return (
        <Card {...panResponder.panHandlers}>
          <Image
            source={{ uri: baseUrl + story.image }}
            style={{
              width: "100%",
              height: 100,
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card.FeaturedTitle>{story.name}</Card.FeaturedTitle>
          </Image>
          <View  style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Icon raised reverse type='font-awesome' color='#f50'
              name={this.props.favorite ? 'heart' : 'heart-o'}
              onPress={() => this.props.favorite ? alert('Already favorite') : this.props.onPressFavorite()} />
          <Icon raised reverse name='play' type='font-awesome' color='#adff2f'
            onPress={() => handleVoice()}  />
          <Icon raised reverse name='pencil' type='font-awesome' color='#0000ff'
              onPress={() => this.props.onPressComment()} />    
          </View>
        </Card>
      );
    }
    return <View />;
  }
}

class Dishdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // story: STORY,
      // comments: COMMENTS,
      // favorites: [],
    };
  }
  render() {
    const storyId = parseInt(this.props.route.params.storyId);
    const story = this.props.story.story[storyId];
    const comments = this.props.comments.comments.filter(
      (cmt) => cmt.storyId === storyId
    );
    const favorite = this.props.favorites.some((el) => el === storyId);
    return (
      <ScrollView>
        <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <RenderDish
            story={story}
            favorite={favorite}
            onPressFavorite={() => this.markFavorite(storyId)}
          />
        </Animatable.View>
        <RenderDescripstion story={story}/>
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
          <RenderComments comments={comments} />
        </Animatable.View>
      </ScrollView>
    );
  }
  markFavorite(storyId) {
    this.props.postFavorite(storyId);
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
