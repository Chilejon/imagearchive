import React, { Component } from "react";
import ImageDetails from "./components/ImageDetails";
import FullDetails from "./components/FullDetails";
import Searchbox from "./components/Searchbox";
import { Column, Row } from "simple-flexbox";
import loading from "./images/smLoading.gif";
import "./css/imagearchive.css";

const getAreas = "http://interactive.stockport.gov.uk/siarestapi/v1/Getareas";

const API3 =
  "http://interactive.stockport.gov.uk/siarestapi/v1/GetPhotosByID?id=3";
const GetPhotosSearchTitle =
  "http://interactive.stockport.gov.uk/siarestapi/v1/GetPhotosByTitle/?term=";
const GetPhotoByID =
  "http://interactive.stockport.gov.uk/siarestapi/v1/GetPhotosByID?id=";
const GetPhotosSearchAll =
  "http://interactive.stockport.gov.uk/siarestapi/v1/GetPhotosByTerm?term=";
const GetPhotosByTermAndArea =
  "http://interactive.stockport.gov.uk/siarestapi/v1/GetPhotosByTermArea/?term=";
const GetPhotosByClassNo =
  "http://interactive.stockport.gov.uk/siarestapi/v1/GetPhotosByClassNo/?id=";

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      Images: [],
      areas: [],
      DisplayMissCount: 0,
      DisplayCount: 5,
      imageDetails: {
        title: "",
        description: "",
        area: "",
        classno: "",
        dateofimage: "",
        AccessionNo: ""
      },
      searchTerm: "",
      searchWhat: [
        { id: "title", value: "Title" },
        { id: "all", value: "All" },
        { id: "allarea", value: "All/Area" }
      ],
      isLoading: false
    };
    this.search = this.search.bind(this);
  }

  search(searchTerm, area, paginationSize) {
    //alert(searchTerm + " " + area + " " + paginationSize);
    this.setState({
      Images: [],
      isLoading: true,
      DisplayCount: paginationSize.value
    });
    var apiLink = "";
    //alert("api" + apiLink);
    apiLink = GetPhotosSearchTitle + searchTerm;
    // switch ("title") {
    //   case "all":
    //     apiLink = GetPhotosSearchAll + this.title.value;
    //     break;
    //   case "title":

    //     break;
    //   case "allarea":
    //     apiLink =
    //       GetPhotosByTermAndArea +
    //       this.title.value +
    //       "&area=" +
    //       this.Areas.value;
    //     break;
    // }
    //alert(apiLink);

    fetch(apiLink)
      .then(response => response.json())
      .then(json => {
        //alert(json);
        this.setState({
          Images: json
        });
      });

    // fetch(apiLink).then(response =>
    //   response.json().then(console.log(response))
    // );
    //      .then(console.log(response));
    // .then(json => {
    //   this.setState({
    //     Images: json,
    //     isLoading: false
    //   });

    //alert(response);
  }

  render() {
    if (this.state.Images !== null) {
      var imagesDisplayedCount = 1;
      var imagesInTotal = 0;
      var images = this.state.Images.map(Images => {
        imagesInTotal = imagesInTotal + 1;
        // if (imagesInTotal > this.state.DisplayMissCount) {
        //   if (imagesDisplayedCount <= this.state.DisplayCount) {
        //     imagesDisplayedCount = imagesDisplayedCount + 1;

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
        //          }
        //        }
      });
    } else {
    }
    {
      console.log(this.state.isLoading);
    }

    return (
      <div className="wrapper">
        <div className="box a">
          <div class="search-column">
            <Searchbox
              searchWhat={this.state.searchWhat}
              //areas={this.state.areas}
              search={this.search}
            />
          </div>
        </div>
        <div className="box b">{images}</div>
        <div className="box c">Full Picture</div>
      </div>
    );
  }
}

export default App;
