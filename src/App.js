import React, { Component } from "react";
import ImageDetails from "./components/ImageDetails";
import FullDetails from "./components/FullDetails";
import Searchbox from "./components/Searchbox";
//import { Column, Row } from "simple-flexbox";
//import loading from "./images/smLoading.gif";
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
      Images: [{
        AccessionNo: "13986 ",
        Media: 1,
        Format: 1,
        Photographer: "A. Henshall ",
        StorageArea: 1,
        availabletobuy: "Y",
        incopyright: "N",
        area: 45,
        title: "Pineapple Inn, Town Centre. ",
        classno: "S/J 72 ",
        description: "The Pineapple Inn, Heaton Lane, corner of Astley Street. Regent House in the background. ",
        dateofimage: "1979:December 1979. ",
        dateentered: "24/09/2008",
        staffid: "William Rogerson. ",
        viewcount: 198,
        idno: 2577
      },
      {
        AccessionNo: "40110 ",
        Media: 1,
        Format: 1,
        Photographer: "Unknown: from Mr. Robinson's album ",
        StorageArea: 1,
        availabletobuy: "Y",
        incopyright: "N",
        area: 34,
        title: "Pineapple Inn, Marple, 1884 ",
        classno: "S/82 C73 ",
        description: "Pineapple Inn on Church Lane, Marple in 1884. It was rebuilt in the 1890's fronting on to Market St, Marple ",
        dateofimage: "1884:1884 ",
        dateentered: "12/12/2008",
        staffid: "david atkinson ",
        viewcount: 39,
        idno: 5423
      },
      {
        AccessionNo: "31205 ",
        Media: 1,
        Format: 1,
        Photographer: "R. Henshall ",
        StorageArea: 1,
        availabletobuy: "Y",
        incopyright: "N",
        area: 14,
        title: "Pineapple Public House ",
        classno: "S/09 J72 ",
        description: "Pineapple Public House, Castle Street. ",
        dateofimage: "1979: ",
        dateentered: "24/02/2009",
        staffid: "Bernard Hayes ",
        viewcount: 111,
        idno: 7246
      },
      {
        AccessionNo: "50251 ",
        Media: 1,
        Format: 1,
        Photographer: "Mr. B. Thomas ",
        StorageArea: 1,
        availabletobuy: "Y",
        incopyright: "N",
        area: 34,
        title: "Market Street, Marple. ",
        classno: "S/82 J72 ",
        description: "Market Street showing the 'Pineapple Inn' public house on junction with Church Lane. ",
        dateofimage: "2007:Feb 2007 ",
        dateentered: "14/12/2009",
        staffid: "david atkinson ",
        viewcount: 3,
        idno: 14662
      },
      {
        AccessionNo: "36649 ",
        Media: 1,
        Format: 1,
        Photographer: "N S Roberts ",
        StorageArea: 1,
        availabletobuy: "Y",
        incopyright: "N",
        area: 45,
        title: "Stockport Plaza from the air. ",
        classno: "S/A 67 ",
        description: "Aerial view of Mersey Square with the Stockport Plaza Cinema facing. Behind the Plaza and to its right is the Essoldo Cinema with St Petersgate and the library beyond. The diagonal road from bottom left is the A6, Wellington Road North/South. In the centre is Mersey Square with its old fire station. The River Mersey passes under Wellington Bridge, then the bear pit and Mersey Bridge to emerge into the town centre. The diagonal road from bottom right is Heaton Lane with the lower white building the Pineapple pub. On the corner of Heaton Lane/Wellington Road is the George pub. ",
        dateofimage: "1939:23/08/1939 ",
        dateentered: "17/05/2010",
        staffid: "stephen shaw ",
        viewcount: 201,
        idno: 18249
      },
      {
        AccessionNo: "41394 ",
        Media: 1,
        Format: 1,
        Photographer: "Borough Surveyor ",
        StorageArea: 1,
        availabletobuy: "Y",
        incopyright: "N",
        area: 45,
        title: "Aerial view of railway viaduct ",
        classno: "S/A 67 ",
        description: "Aerial view looking south along the railway viaduct, with Stockport Edgeley station at top. In the centre flowing from left to right is the River Mersey. From bottom to top on the left is the A6, Wellington Road North/South. The A6 crosses the river by Wellington Bridge. The library is at the top of the picture. The Plaza cinema is not yet built. Another railway line passes under the viaduct at the bottom leading to Tiviot Dale station off image to the left. The George and the Pineapple can be seen on Heaton Lane. ",
        dateofimage: "1931:c1931 ",
        dateentered: "04/06/2010",
        staffid: "stephen shaw ",
        viewcount: 268,
        idno: 22054
      },
      {
        AccessionNo: "33577 ",
        Media: 1,
        Format: 1,
        Photographer: "Unknown ",
        StorageArea: 1,
        availabletobuy: "Y",
        incopyright: "N",
        area: 52,
        title: "Pineapple Inn, Woodley ",
        classno: "S/39 J77 ",
        description: "Pineapple Inn, 144 Hyde Road, Woodley showing a 2 pence trade token as used at the Pineapple Inn, date unknown. ",
        dateofimage: ":date unknown ",
        dateentered: "29/10/2010",
        staffid: "david atkinson ",
        viewcount: 52,
        idno: 26348
      },
      {
        AccessionNo: "33578 ",
        Media: 1,
        Format: 1,
        Photographer: "Unknown ",
        StorageArea: 1,
        availabletobuy: "Y",
        incopyright: "N",
        area: 52,
        title: "Pineapple Inn, Woodley. ",
        classno: "S/39 J72 ",
        description: "Pineapple Inn, 144 Hyde Road, Woodley, a 2 pence trade token as used at the Pineapple Inn, date unknown. ",
        dateofimage: ":date unknown ",
        dateentered: "29/10/2010",
        staffid: "david atkinson ",
        viewcount: 44,
        idno: 26349
      },
      {
        AccessionNo: "53212 ",
        Media: 1,
        Format: 1,
        Photographer: "Stephen Shaw ",
        StorageArea: 1,
        availabletobuy: "Y",
        incopyright: "N",
        area: 27,
        title: "Pineapple Inn ",
        classno: "S/J 72 ",
        description: "'Commercial Room' at the Pineapple Inn, Heaton Lane. ",
        dateofimage: "2010:May 2010 ",
        dateentered: "21/02/2011",
        staffid: "robert.durrant ",
        viewcount: 36,
        idno: 29678
      },
      {
        AccessionNo: "53211 ",
        Media: 1,
        Format: 1,
        Photographer: "Stephen Shaw ",
        StorageArea: 1,
        availabletobuy: "Y",
        incopyright: "N",
        area: 27,
        title: "Pineapple Inn ",
        classno: "S/J 72 ",
        description: "Pineapple Inn, Heaton Lane with railway viaduct at rear. ",
        dateofimage: "2010:May 2010 ",
        dateentered: "21/02/2011",
        staffid: "robert.durrant ",
        viewcount: 31,
        idno: 29679
      },
      {
        AccessionNo: "53210 ",
        Media: 1,
        Format: 1,
        Photographer: "Stephen Shaw ",
        StorageArea: 1,
        availabletobuy: "Y",
        incopyright: "N",
        area: 27,
        title: "Pineapple Inn ",
        classno: "S/J 72 ",
        description: "Pineapple Inn, Heaton Lane, Stockport. ",
        dateofimage: "2010:April 2010 ",
        dateentered: "21/02/2011",
        staffid: "robert.durrant ",
        viewcount: 26,
        idno: 29692
      },
      {
        AccessionNo: "31146 ",
        Media: 1,
        Format: 1,
        Photographer: "Not given ",
        StorageArea: 1,
        availabletobuy: "Y",
        incopyright: "N",
        area: 45,
        title: "Prince's Street ",
        classno: "S/C 73 ",
        description: "The Touchstone public house (under the fish and chips sign) and shops on Prince's Street near its junction with Wellington Road North, beyond the Touchstone. These properties, some already acquired, were demolished to make way for a new Debenham's store. The Pineapple Inn on Heaton Lane is visible before the railway viaduct, and the clock tower, seen above the shops, is part of the Stockport Corporation Transport Department's head office. ",
        dateofimage: ":No date ",
        dateentered: "08/04/2011",
        staffid: "Phillip Edwards ",
        viewcount: 28,
        idno: 30800
      },
      {
        AccessionNo: "53310 ",
        Media: 2,
        Format: 2,
        Photographer: "Stephen Shaw ",
        StorageArea: 1,
        availabletobuy: "Y",
        incopyright: "N",
        area: 45,
        title: "The Pineapple ",
        classno: "S/J 72 ",
        description: "The Pineapple, Heaton Lane ",
        dateofimage: "2010:May 2010 ",
        dateentered: "18/05/2011",
        staffid: "Yasir ",
        viewcount: 35,
        idno: 32099
      },
      {
        AccessionNo: "53673 ",
        Media: 1,
        Format: 1,
        Photographer: "Mr Henshall: donated by Mr J. Henshall ",
        StorageArea: 1,
        availabletobuy: "Y",
        incopyright: "N",
        area: 45,
        title: "Pineapple Inn Public House ",
        classno: "S/J 72 ",
        description: "Pineapple Inn, Heaton Lane, Stockport ",
        dateofimage: "1979: ",
        dateentered: "22/06/2012",
        staffid: "Kay ",
        viewcount: 46,
        idno: 36380
      }],
      areas: [],
      DisplayMissCount: 0,
      DisplayCount: 4,
      imageDetails: {
        title: "",
        description: "",
        area: "",
        classno: "",
        dateofimage: "",
        AccessionNo: ""
      },
      searchTerm: "pineapple",
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
    var tempValue = this.state.DisplayMissCount;
    var tempValue2 = this.state.DisplayCount;
    this.setState({
      DisplayMissCount: tempValue - tempValue2
    });
    alert("sdsdsd");
  }

  goForward() {
    var tempValue = this.state.DisplayMissCount;

    var tempValue2 = this.state.DisplayCount;
    var tempValue3 = this.state.Images
    this.setState({
      DisplayMissCount: tempValue + 4,
      DisplayMissCountEnd: tempValue + 4 + 4
    });
//    this.forceUpdate();
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
            <Results images={this.state.Images} DisplayMissCount={this.state.DisplayMissCount} DisplayMissCountEnd={this.state.DisplayMissCount + 4} goForward={this.goForward} showImage={this.state.showImage} />
          </div>
        )}



        <section class="box album">Albums</section>
      </div>
    )
  }
}

export default App;
