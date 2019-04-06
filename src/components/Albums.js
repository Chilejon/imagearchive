import React, { Component } from "react";
import AlbumDetails from "./AlbumDetails";

class Albums extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  render() {
    console.log(this.props.Albums)
    var Albums = this.props.Albums.map(Albums => {
      if (Albums.status === 'Live') {

        return (

          <AlbumDetails AccessionNo={Albums.albumcover} title={Albums.albumtitle} />
          // <p>{Albums.albumtitle}</p>
        );
      }
    })

    return (
      <p>
        {Albums}
      </p>
    )
  }
}
export default Albums;
