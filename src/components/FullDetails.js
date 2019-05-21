import React, { Component } from "react"
import helpers from "../utils/checkImage"

const imgSrc = "https://interactive.stockport.gov.uk/stockportimagearchive/SIA/";

class FullDetails extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      title: this.props.title,
      description: this.props.description,
      area: this.props.area,
      AccessionNo: this.props.AccessionNo,
      classno: this.props.classno,
      dateofimage: this.dateofimage
    };
  }

  render() {
    console.log(this.props);

    var imgSrcConfirmed = imgSrc + this.props.AccessionNo + ".jpg";
    imgSrcConfirmed = helpers.checkImageExists(imgSrc + this.props.AccessionNo + ".jpg");

    var nextImage
    if(this.props.nextImage !== undefined)
    {
      nextImage = <button className="ShowBig"
      onClick={() => {
        this.props.nextImage(
          this.props.AccessionNo
        );
      }}>
      Next </button>
    }

    var prevImage
    
    if(this.props.prevImage !== undefined)
    {
      prevImage = <button className="ShowBig"
      onClick={() => {
        this.props.prevImage(
          this.props.AccessionNo
        );
      }}>
      Prev </button>
    }

    console.log(this.props.allAreas)
    var allAreas = this.props.allAreas
    var areaText = "not found"

    allAreas.forEach(area => {
      if (area.ID === this.props.area)
      {
        areaText = area.Area1
      }      
    });
  
    return (
      <section className="box fullDetails">
        <section className="box imagePicture">
          <img
            src={imgSrcConfirmed}
            text={this.props.title}
          />
        </section>
        <section className="box">
          
          {(prevImage === null) ? null : prevImage }
          {(nextImage === null) ? null : nextImage }
          
          <h2>{this.props.title}</h2>
          <h3>{this.props.description}</h3>
          <p>Accession no: <strong>{this.props.AccessionNo}</strong></p>
          <p>Area: <strong>{areaText}</strong> </p>
          <p>Class: <strong>{this.props.classno}</strong></p>
          <p>Date: <strong>{this.props.dateofimage}</strong></p>

          <button
            className="ShowBig"
            onClick={() => {
              this.props.showSimilarImages(
                this.props.classno
              );
            }}
          >Similar images</button>
        </section>
      </section>
    );
  }
}
export default FullDetails;
