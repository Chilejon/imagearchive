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
          <AlbumDetails AccessionNo={Albums.albumcover} title={Albums.albumtitle} albumidno={Albums.albumidno} showAlbums={this.props.showAlbums} />
        );
      }
    })

    return (
      <section className="box searchResults">
        {Albums}
      </section>
    )
  }
}
export default Albums;
