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
const GetPhotosByClassNo = "http://interactive.stockport.gov.uk/siarestapi/v1/GetPhotosByClassNo/?id=";


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
    this.showImage = this.showImage.bind(this);
    this.showSimilarImages = this.showSimilarImages.bind(this);
    this.goBack = this.goBack.bind(this);
    this.goForward = this.goForward.bind(this);
  }

  search(searchTerm, area, paginationSize, searchWhat) {
    //alert(searchTerm + " " + area + " " + paginationSize);
    this.setState({
      Images: [],
      isLoading: true,
      DisplayCount: paginationSize.value,
      searchTerm: '',
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
    //alert("api" + apiLink);
    apiLink = GetPhotosSearchTitle + searchTerm;
    var apiLink = "";
    switch (searchWhat) {
      case "all":
        apiLink = GetPhotosSearchAll + searchTerm;
        break;
      case "title":
        apiLink = GetPhotosSearchTitle + searchTerm;
        break;
      case "allarea":
        apiLink = GetPhotosByTermAndArea + searchTerm + "&area=" + area;
        break;
    }
    //alert(apiLink);
    fetch(apiLink)
      .then(response => response.json())
      .then(json => {
        //alert(json);
        this.setState({
          Images: json,
          searchTerm: searchTerm,
          isLoading: false
        });
      });

      //console.log("here " + apiLink)
  }

  showImage(AccessionNo, title, description, area, dateofimage, classno) {
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
    window.scrollTo(0, 0);
  }

  showSimilarImages(classno) {
    this.setState({
      Images: [],
      isLoading: true,
      DisplayCount: 10,
      imageDetails: {
        title: "",
        description: "",
        area: "",
        classno: "",
        dateofimage: "",
        AccessionNo: ""
      },
      searchTerm: ''
    });
    var apiLink = "";
    apiLink = GetPhotosByClassNo + classno;
    //alert(apiLink)
    fetch(apiLink)
      .then(response => response.json())
      .then(json => {
        //alert(json);
        this.setState({
          Images: json,
          searchTerm: classno,
          isLoading:false
        });
      });
  }

  goBack() {
    var tempValue = this.state.DisplayMissCount;
    var tempValue2 = this.state.DisplayCount;
    this.setState({
      DisplayMissCount: tempValue - tempValue2
    });
  }

  goForward() {
    var tempValue = this.state.DisplayMissCount;
    var tempValue2 = this.state.DisplayCount;
    this.setState({
      DisplayMissCount: tempValue + tempValue2
    });
  }

  render() {
    if (this.state.Images !== null) {
      //var imagesDisplayedCount = 1;
      //var imagesInTotal = 0;
      //alert(this.state.DisplayMissCount )
      //imagesInTotal = imagesInTotal + 1;
      var images = this.state.Images.map(Images => {
    //    if (imagesInTotal > this.state.DisplayMissCount) {
    //      if (imagesDisplayedCount <= this.state.DisplayCount) {
    //        imagesDisplayedCount = imagesDisplayedCount + 1;
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
      )}
      //}
     else {
    }
    {
    //  console.log(this.state.isLoading);
    }

    

    return (
      <div className="wrapper">
        <div className="box header">
          <Searchbox searchWhat={this.state.searchWhat} search={this.search} isLoading={this.state.isLoading} />
        </div>
        <div className="box content">
        {this.state.Images.length !== 0 && (
        <div><h2>Search results</h2>
        <h3>Found {this.state.Images.length} images</h3>
        <h3>{this.state.searchTerm}</h3>
        </div>
        )}
         {images}
         </div>
        <div className="box content2">
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
          )}
        </div>
        <div class="box footer">Albums</div>
      </div>
    );
  }
}

export default App;
