import React, { Component } from "react";
import helpers from "../utils/checkImage"

const imgSrc =
  "https://interactive.stockport.gov.uk/stockportimagearchive/SIA/thumbnails/";

class AlbumDetails extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    var imgSrcConfirmed = imgSrc + helpers.helper1(this.props.AccessionNo);
    return (
      <section className="box">

        <img src={imgSrcConfirmed} text={this.props.title} width="100%" 
        onClick={() => {
          this.props.showAlbums(
            this.props.albumidno,
            this.props.title
          );
        }}
        />
        <span onClick={() => {
          this.props.showAlbums(
            this.props.albumidno,
            this.props.title
          );
        }}>{this.props.title}
        </span>
      </section>
    );
  }
}
export default AlbumDetails;
