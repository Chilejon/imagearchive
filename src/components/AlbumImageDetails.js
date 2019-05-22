import React, { Component } from "react";

const imgSrc =
  "https://interactive.stockport.gov.uk/stockportimagearchive/SIA/thumbnails/";

class AlbumImageDetails extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      ImageDetails: {}
    };
  }

  render() {
    var imgSrcConfirmed = imgSrc + this.props.photograph + ".jpg";
    return (
      <div className="box" onClick={() => {
        this.props.showImage(
          this.props.photograph
        );
      }}>
        <img src={imgSrcConfirmed} text={this.props.caption} width="100"
        />
        <p className="smallText">{this.props.caption}</p>
      </div>
    );
  }
}
export default AlbumImageDetails;
