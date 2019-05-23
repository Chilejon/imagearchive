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
    //console.log(this.props);

    var imgSrcConfirmed = imgSrc + this.props.AccessionNo + ".jpg";
    imgSrcConfirmed = helpers.checkImageExists(imgSrc + this.props.AccessionNo + ".jpg");

    var nextImage
    if(this.props.nextImage !== undefined)
    {
      nextImage = <button className="ShowBigRight"
      onClick={() => {
        this.props.nextImage(
          this.props.AccessionNo
        );
      }}>
      Next &gt; </button>
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
      &lt; Prev </button>
    }

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
          &nbsp;&nbsp;&nbsp;
          {(nextImage === null) ? null : nextImage }
          
          <h2>{this.props.title}</h2>
          <h3>{this.props.description}</h3>
          
          <p>Accession no: <strong>{this.props.AccessionNo}</strong></p>
          <p>Area: <strong>{areaText}</strong> </p>
          <p>Class: <strong>{this.props.classno}</strong></p>
          <p>Date: <strong>{this.props.dateofimage}</strong></p>
          <p>Photographer: <strong>{this.props.Photographer}</strong></p>
          <p>Available to buy: <strong>{this.props.availabletobuy} </strong>  
          {this.props.availabletobuy === 'Y' && <a href="http://old.stockport.gov.uk/sia/buynoworderaprint/" target="_blank">Order a print</a>}
          </p>
          
          
          <button
            className="ShowBig"
            onClick={() => {
              this.props.showSimilarImages(
                this.props.classno
              );
            }}
          >Show similar images</button>
        </section>
      </section>
    );
  }
}
export default FullDetails;
