import React, { Component } from "react";
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
      Images: DogData,
      areas: [],
      FirstImage: 0,
      LastImage: 6,
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
    var goFwdNumber = parseInt(this.state.DisplayCount)
    var lastImage = this.state.LastImage - parseInt(goFwdNumber)
    var firstImage = parseInt(this.state.FirstImage) - parseInt(goFwdNumber)
    this.setState({
      FirstImage: firstImage,
      LastImage: lastImage
    });
  }

  goForward() {
    var goFwdNumber = parseInt(this.state.DisplayCount)
    var lastImage = this.state.LastImage + parseInt(goFwdNumber)
    var firstImage = parseInt(this.state.FirstImage) + parseInt(goFwdNumber)
    this.setState({
      FirstImage: firstImage,
      LastImage: lastImage
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
              <p>Search term: '{this.state.searchTerm}'.
              Showing images '{this.state.FirstImage + 1}' to '{this.state.LastImage > this.state.Images.length ? this.state.Images.length : this.state.LastImage}' of found {this.state.Images.length} images.
              </p>
            </section>
            <Results images={this.state.Images} showSimilarImages={this.showSimilarImages} TotalImageCount={this.state.Images.length} DisplayCount={this.state.DisplayCount} FirstImage={this.state.FirstImage} LastImage={this.state.LastImage > this.state.Images.length ? this.state.Images.length : this.state.LastImage} goForward={this.goForward} goBack={this.goBack} showImage={this.state.showImage} />
          </div>
        )}

        <section class="box album">Albums</section>
      </div>
    )
  }
}

export default App;
