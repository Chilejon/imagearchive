import React, { Component } from "react";

const imgSrc = "http://interactive.stockport.gov.uk/stockportimagearchive/SIA/";

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
    return (
       <section className="box bigImage">
       <section className="imagePicture">
        <img
          src={imgSrc + this.props.AccessionNo + ".jpg"}
          text={this.props.title}
        />
        </section>
        <section className="imageText">
        <h2>Full details</h2>
        <p>{this.props.title}</p>
        <p>{this.props.description}</p>
        <p>
          AccessionNo: {this.props.AccessionNo}
          </p>
          <p>  Area: {this.props.area} </p>
          <p>Class: {this.props.classno}
        </p>
        <p>Date: {this.props.dateofimage}</p>

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
