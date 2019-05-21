import React, { Component } from "react";
import AlbumImageDetails from "./AlbumImageDetails";
import FullDetails from "./FullDetails"

const GetPhotoByID = "https://interactive.stockport.gov.uk/siarestapi/v1/GetPhotosByAccNo?id=";

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

    // this.setState({
    //   imageDetails: {
    //     title: "",
    //     description: "",
    //     area: "",
    //     classno: "",
    //     dateofimage: "",
    //     AccessionNo: ""
    //   }
    // });
    var apiLink = "";
    apiLink = GetPhotoByID + photograph;
    console.log(apiLink);
    fetch(apiLink)
      .then(response => response.json())
      .then(json => {
        if (json !== null) {
          this.setState({
            imageDetails: json,
            searchTerm: photograph,
            isLoading: false
          },
            () => console.log(this.state))
        }
        // else {
        //   this.setState({
        //     imageDetails:
        //       {}
        //     ,
        //     searchTerm: photograph,
        //     isLoading: false
        //   },
        //     () => console.log(this.state))
        // };
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
          showImage={this.showImage}
        />
      );
    }
    )

    if (this.state.imageDetails.length > 0) {

      console.log(this.state.imageDetails[0].title)
    }

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
          {this.state.imageDetails.length > 0 && (
            <FullDetails
              title={this.state.imageDetails[0].title}
              description={this.state.imageDetails[0].description}
              area={this.state.imageDetails[0].area}
              AccessionNo={this.state.imageDetails[0].AccessionNo.trim()}
              classno={this.state.imageDetails[0].classno}
              dateofimage={this.state.imageDetails[0].dateofimage}
              showSimilarImages={this.props.showSimilarImages}
              allAreas={this.props.areas}
            />
          )
          }
        </section>

      </div>
    );
  }
}
export default AlbumResults;
