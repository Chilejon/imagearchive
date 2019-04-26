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
import AlbumResults from "./components/AlbumResults"
import areas from "./data/areas.json";
//const getAreas = "http://interactive.stockport.gov.uk/siarestapi/v1/Getareas";

//const API3 =
//  "http://interactive.stockport.gov.uk/siarestapi/v1/GetPhotosByID?id=3";
const GetPhotosSearchTitle =
  "http://interactive.stockport.gov.uk/siarestapi/v1/GetPhotosByTitle/?term=";
//const GetPhotoByID =
//  "http://interactive.stockport.gov.uk/siarestapi/v1/GetPhotosByID?id=";
const GetPhotosSearchAll =
  "http://interactive.stockport.gov.uk/siarestapi/v1/GetPhotosByTerm?term=";
const GetPhotosByTitleAndArea =
  "http://interactive.stockport.gov.uk/siarestapi/v1/GetPhotosByTitleArea/?term=";
const GetPhotosByClassNo = "http://interactive.stockport.gov.uk/siarestapi/v1/GetPhotosByClassNo/?id=";

const GetPhotosByAlbumNo = "http://interactive.stockport.gov.uk/siarestapi/v1/GetAlbumPhoto/?id="


class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      //Images: DogData,
      Images: [],
      Albums: AlbumsData,
      AlbumImages: [],
      AlbumTitle: '',
      ShowAlbums: false,
      areas: areas,
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
    this.showAlbums = this.showAlbums.bind(this);
    this.displayAlbums = this.displayAlbums.bind(this);
    this.goBack = this.goBack.bind(this);
    this.goForward = this.goForward.bind(this);
  }

  search(searchTerm, area, searchWhat) {
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
        apiLink = GetPhotosByTitleAndArea + searchTerm + "&area=" + area;
        break;
    }

    if (area !== "" && searchTerm.trim() !== "") {
      apiLink = GetPhotosByTitleAndArea + searchTerm + "&area=" + area
    }

    //alert(apiLink);
    fetch(apiLink)
      .then(response => response.json())
      .then(json => {
        //alert(json);
        if (json !== null) {
          this.setState({
            Images: json,
            searchTerm: searchTerm,
            isLoading: false
          });
        }
        else {
          this.setState({
            Images: [],
            searchTerm: searchTerm,
            isLoading: false
          })
        };
      }
      )
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

  displayAlbums() {
    
    var showAlbumsState = this.state.ShowAlbums
    showAlbumsState ? showAlbumsState = false : showAlbumsState = true
    this.setState({
      ShowAlbums: showAlbumsState 
    });
  }

  showAlbums(albumNo, albumTitle) {
    this.setState({
      AlbumImages: [],
      AlbumTitle: '',
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
    apiLink = GetPhotosByAlbumNo + albumNo;
    //temp while not cors working
    // this.setState({
    //   Images: sd71,
    //   searchTerm: albumNo,
    //   isLoading: false
    // })
    fetch(apiLink)
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({
          AlbumImages: json,
          searchTerm: albumNo,
          isLoading: false,
          AlbumTitle: albumTitle
        });
      });
  }


  render() {
    return (
      <div className="wrapper">
        <header class="box searchBox">
          <Searchbox searchWhat={this.state.searchWhat} search={this.search} isLoading={this.state.isLoading} displayAlbums={this.displayAlbums}/>
        </header>

        {this.state.Images.length !== 0 && (
          <div>
            <section className="box searchString" >
              <p>Search term: '{this.state.searchTerm}'.
              Showing images '{this.state.FirstImage + 1}' to '{this.state.LastImage > this.state.Images.length ? this.state.Images.length : this.state.LastImage}' of found {this.state.Images.length} images.
              </p>
            </section>


            <Results images={this.state.Images} showSimilarImages={this.showSimilarImages} TotalImageCount={this.state.Images.length} DisplayCount={this.state.DisplayCount} FirstImage={this.state.FirstImage} LastImage={this.state.LastImage > this.state.Images.length ? this.state.Images.length : this.state.LastImage} goForward={this.goForward} goBack={this.goBack} showImage={this.state.showImage} areas={this.state.areas} />


            {/* <section class="box fullDetails">
            Full details
        </section> */}
          </div>
        )}

        {this.state.ShowAlbums && (
          <div>
            <section>
              <Albums Albums={this.state.Albums} showAlbums={this.showAlbums} />
            </section>
            <section>
              <AlbumResults images={this.state.AlbumImages} title={this.state.AlbumTitle} showImage={this.state.showImage} />
            </section>
          </div>
        )}
      </div>

    )
  }
}

export default App;
