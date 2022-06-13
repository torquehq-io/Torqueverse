import React from "react";
import ClassNames from "classnames";
import "../../styles/base/LikeCounter.css";

class LikeButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      liked: false,
      disliked: false,
      initLike: 10,
      initDislike: 25
    }

    this.onLikeClick = this.onLikeClick.bind(this);
    this.onDisLikeClick = this.onDisLikeClick.bind(this);

  }

  onLikeClick() {
    if(!this.state.disliked) {
      this.setState({
        liked: !this.state.liked
      });
    } else {
      this.setState({
        liked: true,
        disliked: false
      });
    }
  }

   onDisLikeClick() {
    if(!this.state.liked) {
      this.setState({
        disliked: !this.state.disliked
      });
    } else {
      this.setState({
        liked: false,
        disliked: true
      });
    }
  }

  render() {
    const classLikeButton = ClassNames({
      "like-button": true,
      "liked": this.state.liked
    });

  
    return (
      <div>
        <span className={classLikeButton}
        onClick={this.onLikeClick}>
        <a href="#" class="likes space-x-3">
          <i class="ri-heart-3-fill"></i>
          <span class="txt_sm">
            {this.state.liked ? this.state.initLike + 1 : this.state.initLike}
          </span>
        </a>
        </span>
      
      </div>  
    );
  }

}

export default LikeButton;