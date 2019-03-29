import React, { Component } from "react";
import ImageDetails from "./ImageDetails";
import FullDetails from "./FullDetails"

class Results extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      imageDetails: {
        AccessionNo: "13986 ",
        Media: 1,
        Format: 1,
        Photographer: "A. Henshall ",
        StorageArea: 1,
        availabletobuy: "Y",
        incopyright: "N",
        area: 45,
        title: "",
        classno: "S/J 72 ",
        description: "The Pineapple Inn, Heaton Lane, corner of Astley Street. Regent House in the background. ",
        dateofimage: "1979:December 1979. ",
        dateentered: "24/09/2008",
        staffid: "William Rogerson. ",
        viewcount: 198,
        idno: 2577
      }
    };

    this.showImage = this.showImage.bind(this);
  }


  showImage(AccessionNo, title, description, area, dateofimage, classno) {
    console.log(AccessionNo + " " + title)
    this.setState({
      imageDetails: {
        AccessionNo: AccessionNo,
        title: title,
        description: description,
        area: area,
        classno: classno,
        dateofimage: dateofimage
      }
    });
    // window.scrollTo(0, 0);
  }

  render() {
    
    var images = this.props.images.slice(this.props.DisplayMissCount, this.props.DisplayMissCountEnd).map(Images => {
      return (
        <ImageDetails
          title={Images.title}
          AccessionNo={Images.AccessionNo.trim()}
          description={Images.description.trim()}
          area={Images.area}
          dateofimage={Images.dateofimage.trim()}
          classno={Images.classno.trim()}
          getImage={this.getImage}
//          showImage={this.props.showImage}
          showImage={this.showImage}
        />
      );
    }
    )
    return (
      <div>
        <section className="box results">
          <button
            className="Button"
            onClick={() => {
              this.props.goForward();
            }}
          >
            &gt;
             </button>
          {images}
        </section>
        <section>
          {this.state.imageDetails.title !== "" && (
            <FullDetails
              title={this.state.imageDetails.title}
              description={this.state.imageDetails.description}
              area={this.state.imageDetails.area}
              AccessionNo={this.state.imageDetails.AccessionNo.trim()}
              classno={this.state.imageDetails.classno}
              dateofimage={this.state.imageDetails.dateofimage}
              showSimilarImages={this.showSimilarImages}
            />
          )
          }
        </section>

      </div>
    );
  }
}
export default Results;
