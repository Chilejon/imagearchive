import React, { Component } from "react";
import AlbumImageDetails from "./AlbumImageDetails";
import FullDetails from "./FullDetails"

const GetPhotoByID = "http://interactive.stockport.gov.uk/siarestapi/v1/GetPhotosByID?id=";

class AlbumResults extends Component {
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
    // this.nextImage = this.nextImage.bind(this);
    // this.prevImage = this.prevImage.bind(this);
  }

  showImage(photograph) {
    //alert(searchTerm + " " + area + " " + paginationSize);
    this.setState({
      imageDetails: {
        title: "",
        description: "",
        area: "",
        classno: "",
        dateofimage: "",
        AccessionNo: ""
      }
    });
    var apiLink = "";
    apiLink = GetPhotoByID + photograph;
    fetch(apiLink)
      .then(response => response.json())
      .then(json => {
        if (json !== null) {
          this.setState({
            imageDetails: json,
            searchTerm: photograph,
            isLoading: false
          });
        }
        else {
          this.setState({
            Images: [],
            searchTerm: photograph,
            isLoading: false
          })
        };
      }
      )
  }

  render() {
    //alert(this.props.images)
    var images = this.props.images.map(Images => {
      return (
        <AlbumImageDetails
          caption={Images.caption}
          photograph={Images.photograph.trim()}
          // description={Images.description.trim()}
          // area={Images.area}
          // dateofimage={Images.dateofimage.trim()}
          // classno={Images.classno.trim()}
          // getImage={this.getImage}
          showImage={this.showImage}
        />
      );
    }
    )
    console.log(this.props.title)
    return (
      <div>
        {/* {(images === '') ? '' : } */}
        {images !== '' && (
          
          <section className="box searchResults">
          
          <h2>{this.props.title}</h2> 
            {images}
          </section>
        )}

        <section>
          {this.state.imageDetails.title !== "" && (
            <FullDetails
              title={this.state.imageDetails.title}
              description={this.state.imageDetails.description}
              area={this.state.imageDetails.area}
              AccessionNo={this.state.imageDetails.AccessionNo.trim()}
              classno={this.state.imageDetails.classno}
              dateofimage={this.state.imageDetails.dateofimage}
              showSimilarImages={this.props.showSimilarImages}
            />
          )
          }
        </section>

      </div>
    );
  }
}
export default AlbumResults;
