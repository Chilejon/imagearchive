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
      <section className="bigImageBorder">
        <p>{this.props.title}</p>
        <p>{this.props.description}</p>
        <p>
          {this.props.AccessionNo} : {this.props.area} : {this.props.classno}
        </p>
        <p>{this.props.dateofimage}</p>
        <img
          src={imgSrc + this.props.AccessionNo + ".jpg"}
          text={this.props.title}
        />
      </section>
    );
  }
}
export default FullDetails;
