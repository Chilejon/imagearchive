import React, { Component } from "react";
import ImageDetails from "./ImageDetails";

class Results extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }

  render() {
    var images = this.props.images.slice(0, 2).map(Images => {
      return (
        <ImageDetails
          title={Images.title}
          AccessionNo={Images.AccessionNo.trim()}
          description={Images.description.trim()}
          area={Images.area}
          dateofimage={Images.dateofimage.trim()}
          classno={Images.classno.trim()}
          getImage={this.getImage}
          showImage={this.showImage}
        />
      );
    }
    )
    return (
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
    );
  }
}
export default Results;
