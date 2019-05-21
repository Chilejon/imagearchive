import React, { Component } from "react";
import helpers from "../utils/checkImage"

const imgSrc =
  "https://interactive.stockport.gov.uk/stockportimagearchive/SIA/thumbnails/";

class ImageDetails extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      ImageDetails: {}
    };
  }

  render() {
    var imgSrcConfirmed = imgSrc + this.props.AccessionNo + ".jpg";
    imgSrcConfirmed = helpers.checkImageExists(imgSrc + this.props.AccessionNo + ".jpg");

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

        <img src={imgSrcConfirmed} text={this.props.title} width="100%"


        />
        {/* <button
          className="ShowBig"
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
        >
          Show more
        </button> */}
        <p>{this.props.title}</p>
      </div>
    );
  }
}
export default ImageDetails;
