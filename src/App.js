import React, { Component } from "react";
import ImageDetails from "./components/ImageDetails";
import FullDetails from "./components/FullDetails";
import Searchbox from "./components/Searchbox";
//import { Column, Row } from "simple-flexbox";
//import loading from "./images/smLoading.gif";
import DogData from "./data/dog.json"
import "./css/imagearchive.css";
import Results from "./components/Results";

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
      Images:DogData,
      areas: [],
      DisplayMissCount: 0,
      DisplayMissCountEnd: 6,
      DisplayCount: 6,
      imageDetails: {
        title: "",
        description: "",
        area: "",
        classno: "",
        dateofimage: "",
        AccessionNo: ""
      },
      searchTerm: "dog",
      searchWhat: [
        { id: "title", value: "Title" },
        { id: "all", value: "All" },
        { id: "allarea", value: "All/Area" }
      ],
      isLoading: false
    };
    this.search = this.search.bind(this);
    this.showSimilarImages = this.showSimilarImages.bind(this);
    this.goBack = this.goBack.bind(this);
    this.goForward = this.goForward.bind(this);
  }

  search(searchTerm, area, paginationSize, searchWhat) {
    //alert(searchTerm + " " + area + " " + paginationSize);
    this.setState({
      Images: [],
      isLoading: true,
      //DisplayCount: paginationSize.value,
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
          isLoading: false
        });
      });
  }

  goBack() {
    var tempValue = this.state.DisplayMissCount
    var endImage = 12

    this.setState({
      DisplayMissCount: tempValue - tempValue,
      DisplayMissCountEnd: endImage
    });
  }

  goForward() {
    var tempValue = this.state.DisplayMissCount
    var endImage = 12

    this.setState({
      DisplayMissCount: 6,
      DisplayMissCountEnd: endImage
    });
  }

  render() {
    // var images
    // if (this.state.Images !== null) {
    //   console.log("weeeee")
    //   console.log(images)
    //   //var imagesDisplayedCount = 1;
    //   //var imagesInTotal = 0;
    //   //alert(this.state.DisplayMissCount )
    //   //imagesInTotal = imagesInTotal + 1;
    //   //console.log(this.state.DisplayMissCount)
    //    images = this.state.Images.slice(this.state.DisplayMissCount, this.state.DisplayCount).map(Images => {
    //     console.log(images)
    //     //    if (imagesInTotal > this.state.DisplayMissCount) {
    //     //      if (imagesDisplayedCount <= this.state.DisplayCount) {
    //     //        imagesDisplayedCount = imagesDisplayedCount + 1;
    //     return (
    //       <ImageDetails
    //         title={Images.title}
    //         AccessionNo={Images.AccessionNo.trim()}
    //         description={Images.description.trim()}
    //         area={Images.area}
    //         dateofimage={Images.dateofimage.trim()}
    //         classno={Images.classno.trim()}
    //         getImage={this.getImage}
    //         showImage={this.showImage}
    //       />
    //     );
    //   }
    //   )
    // }
    //}
    // else {
    // }
    // {
    //  console.log(this.state.isLoading);


    return (
      <div className="wrapper">
        <section className="box search">
          <Searchbox searchWhat={this.state.searchWhat} search={this.search} isLoading={this.state.isLoading} />
        </section>
        {this.state.Images.length !== 0 && (
          <div>
            <section className="box resultsHeader" style={{ paddingTop: 10, paddingBottom: 50 }}>
              <p>Found {this.state.Images.length} images</p>
              <p>looked for '{this.state.searchTerm}'</p>
            </section>
            <Results images={this.state.Images} DisplayMissCount={this.state.DisplayMissCount} DisplayMissCountEnd={this.state.DisplayMissCountEnd} goForward={this.goForward} goBack={this.goBack} showImage={this.state.showImage} />
          </div>
        )}



        <section class="box album">Albums</section>
      </div>
    )
  }
}

export default App;
