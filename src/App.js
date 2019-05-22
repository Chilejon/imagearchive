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

//const API3 = "http://interactive.stockport.gov.uk/siarestapi/v1/GetPhotosByAccNo?id=3";
const GetPhotosSearchTitle =
  "https://interactive.stockport.gov.uk/siarestapi/v1/GetPhotosByTitle/?term=";
//const GetPhotoByID =
//  "http://interactive.stockport.gov.uk/siarestapi/v1/GetPhotosByID?id=";
const GetPhotosSearchAll =
  "https://interactive.stockport.gov.uk/siarestapi/v1/GetPhotosByTerm?term=";
const GetPhotosByTitleAndArea =
  "https://interactive.stockport.gov.uk/siarestapi/v1/GetPhotosByTitleArea/?term=";
const GetPhotosByTermAndArea =
  "https://interactive.stockport.gov.uk/siarestapi/v1/GetPhotosByTermArea/?term=";
const GetPhotosByClassNo = "https://interactive.stockport.gov.uk/siarestapi/v1/GetPhotosByClassNo/?id=";

const GetPhotosByAlbumNo = "https://interactive.stockport.gov.uk/siarestapi/v1/GetAlbumPhoto/?id="


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
      NoResults: '',
      imageDetails: {
        title: "",
        description: "",
        area: "",
        classno: "",
        dateofimage: "",
        AccessionNo: "",
        Photographer: ""
      },
      searchTerm: "dog",
      searchWhat: [
        { id: "title", value: "Title" },
        { id: "all", value: "All fields" }
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
    if (searchTerm.trim() !== "" && searchTerm.trim().length > 1) 
    {    
    this.setState({
      Images: [],
      isLoading: true,
      //DisplayCount: paginationSize.value,
      searchTerm: '',
      FirstImage: 0,
      LastImage: 6,
      DisplayCount: 6,
      NoResults: '',
      AlbumImages: [],
      AlbumTitle: '',
      ShowAlbums: false,
      imageDetails: {
        title: "",
        description: "",
        area: "",
        classno: "",
        dateofimage: "",
        AccessionNo: "",
        Photographer: ""
      }
    });
    var apiLink = "";
    //alert("api" + apiLink);
    apiLink = GetPhotosSearchTitle + searchTerm;
    var apiLink = "";
    switch (searchWhat) {
      case "all":
        if (area === '')
        {
          apiLink = GetPhotosSearchAll + searchTerm;
        }
        else
        {
          apiLink = GetPhotosByTermAndArea + searchTerm + "&area=" + area;
        }
        break;
      case "title":
        apiLink = GetPhotosSearchTitle + searchTerm;
        break;
    }

    if (area !== "" && searchTerm.trim() !== "") {
      apiLink = GetPhotosByTitleAndArea + searchTerm + "&area=" + area
    }

    //alert(apiLink);
    //console.log(apiLink)
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
            isLoading: false,
            NoResults: 'No results found for : ' + searchTerm
          })
        };
      }
      )
    }
    else {
      var NoResultsMessage
      if (searchTerm.trim().length < 2)
      {
        NoResultsMessage = ""
      }



      this.setState({
        Images: [],
        searchTerm: searchTerm,
        isLoading: false,
        NoResults: NoResultsMessage
      })
    };
  }

  showSimilarImages(classno) {
    this.setState({
      Images: [],
      isLoading: true,
      FirstImage: 0,
      LastImage: 6,
      DisplayCount: 6,
      imageDetails: {
        title: "",
        description: "",
        area: "",
        classno: "",
        dateofimage: "",
        AccessionNo: "",
        Photographer: ""
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
          FirstImage: 0,
          LastImage: 6,
          DisplayCount: 6,
          Images: json,
          searchTerm: "Class no: " + classno,
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
      ShowAlbums: showAlbumsState,
      imageDetails: {
        title: "",
        description: "",
        area: "",
        classno: "",
        dateofimage: "",
        AccessionNo: "",
        Photographer: ""
      },
      Images: [] 
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
        AccessionNo: "",
        Photographer: ""
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
          <Searchbox searchWhat={this.state.searchWhat} search={this.search} isLoading={this.state.isLoading} displayAlbums={this.displayAlbums} NoResults={this.state.NoResults}/>
        </header>

        {this.state.Images.length !== 0 && (
          <div>
            <section className="box searchString" >
              <div className="textCentered">Search term: '{this.state.searchTerm}'.
              Showing images '{this.state.FirstImage + 1}' to '{this.state.LastImage > this.state.Images.length ? this.state.Images.length : this.state.LastImage}' of {this.state.Images.length} images
              </div>
            </section>


            <Results images={this.state.Images} showSimilarImages={this.showSimilarImages} TotalImageCount={this.state.Images.length} DisplayCount={this.state.DisplayCount} FirstImage={this.state.FirstImage} LastImage={this.state.LastImage > this.state.Images.length ? this.state.Images.length : this.state.LastImage} goForward={this.goForward} goBack={this.goBack} showImage={this.state.showImage} areas={this.state.areas} />

          </div>
        )}

        {this.state.ShowAlbums && (
          <div>
            <section>
              <Albums Albums={this.state.Albums} showAlbums={this.showAlbums} />
            </section>
            <section>
              <AlbumResults images={this.state.AlbumImages} title={this.state.AlbumTitle} showImage={this.state.showImage} areas={this.state.areas} />
            </section>
          </div>
        )}
      </div>

    )
  }
}

export default App;
