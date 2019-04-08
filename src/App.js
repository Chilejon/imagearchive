import React, { Component } from "react";
import Searchbox from "./components/Searchbox";
//import { Column, Row } from "simple-flexbox";
//import loading from "./images/smLoading.gif";
import DogData from "./data/dog.json"
import sd71 from "./data/sd71.json"
import AlbumsData from "./data/albums.json"
// import "./css/imagearchive.css";
import "./css/grid.css";
import Results from "./components/Results";
import Albums from "./components/Albums"

//const getAreas = "http://interactive.stockport.gov.uk/siarestapi/v1/Getareas";

//const API3 =
//  "http://interactive.stockport.gov.uk/siarestapi/v1/GetPhotosByID?id=3";
const GetPhotosSearchTitle =
  "http://interactive.stockport.gov.uk/siarestapi/v1/GetPhotosByTitle/?term=";
//const GetPhotoByID =
//  "http://interactive.stockport.gov.uk/siarestapi/v1/GetPhotosByID?id=";
const GetPhotosSearchAll =
  "http://interactive.stockport.gov.uk/siarestapi/v1/GetPhotosByTerm?term=";
const GetPhotosByTermAndArea =
  "http://interactive.stockport.gov.uk/siarestapi/v1/GetPhotosByTermArea/?term=";
const GetPhotosByClassNo = "http://interactive.stockport.gov.uk/siarestapi/v1/GetPhotosByClassNo/?id=";


class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      Images: DogData,
      Albums: AlbumsData,
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

  }

  showSimilarImages(classno) {
    this.setState({
      Images: [],
      isLoading: true,
      DisplayCount: 6,
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
    //temp while not cors working
    this.setState({
      Images: sd71,
      searchTerm: classno,
      isLoading: false
    })
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
    return (
      <div className="wrapper">




        <header class="box searchBox">
          <Searchbox searchWhat={this.state.searchWhat} search={this.search} isLoading={this.state.isLoading} />
        </header>

        {this.state.Images.length !== 0 && (
<div>
          <section className="box searchString" >
            <p>Search term: '{this.state.searchTerm}'.
              Showing images '{this.state.FirstImage + 1}' to '{this.state.LastImage > this.state.Images.length ? this.state.Images.length : this.state.LastImage}' of found {this.state.Images.length} images.
              </p>
          </section>


            <Results images={this.state.Images} showSimilarImages={this.showSimilarImages} TotalImageCount={this.state.Images.length} DisplayCount={this.state.DisplayCount} FirstImage={this.state.FirstImage} LastImage={this.state.LastImage > this.state.Images.length ? this.state.Images.length : this.state.LastImage} goForward={this.goForward} goBack={this.goBack} showImage={this.state.showImage} />


          {/* <section class="box fullDetails">
            Full details
        </section> */}
        </div>
        )}

        <footer class="box albums">
          <Albums Albums={this.state.Albums} />
        </footer>
      </div>

    )
  }
}

export default App;
