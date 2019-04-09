import React, { Component } from "react";

const imgSrc =
  "http://interactive.stockport.gov.uk/stockportimagearchive/SIA/thumbnails/";

class ImageDetails extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      ImageDetails: {}
    };
    this.checkImageExists = this.checkImageExists.bind(this);
  }

  checkImageExists(image_url) {
    var http = new XMLHttpRequest();

    http.open("HEAD", image_url, false);
    http.send();

    if (http.status === 404) {
      return "http://www.wellesleysocietyofartists.org/wp-content/uploads/2015/11/image-not-found.jpg";
    } else {
      return image_url;
    }
  }

  render() {
    var imgSrcConfirmed = imgSrc + this.props.AccessionNo + ".jpg";
    return (
      // <section className="results">
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
       
        <img src={imgSrcConfirmed} text={this.props.title} width="100" 

        
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
      // </section>
    );
  }
}
export default ImageDetails;
