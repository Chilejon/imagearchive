import React, { Component } from "react";
import helpers from "../utils/checkImage"

const imgSrc =
  "http://interactive.stockport.gov.uk/stockportimagearchive/SIA/thumbnails/";

class AlbumDetails extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    var imgSrcConfirmed = imgSrc + helpers.helper1(this.props.AccessionNo);
    return (
      <section className="box">

        <img src={imgSrcConfirmed} text={this.props.title} width="100" 
        onClick={() => {
          this.props.showImage(
            this.props.AccessionNo,
            this.props.title,
            this.props.description,
            this.props.area,
            this.props.dateofimage,
            this.props.classno
          );
        }}
        />
        {this.props.title}
      </section>
    );
  }
}
export default AlbumDetails;
