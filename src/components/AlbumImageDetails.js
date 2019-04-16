import React, { Component } from "react";

const imgSrc =
  "http://interactive.stockport.gov.uk/stockportimagearchive/SIA/thumbnails/";

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
          this.props.AccessionNo,
          this.props.title,
          this.props.description,
          this.props.area,
          this.props.dateofimage,
          this.props.classno
        );
      }}>
        <img src={imgSrcConfirmed} text={this.props.caption} width="100"
        />
        <p>{this.props.caption}</p>
      </div>
    );
  }
}
export default AlbumImageDetails;
