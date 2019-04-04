import React, { Component } from "react";
import ImageDetails from "./ImageDetails";

class Albums extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }



  render() {
    console.log(this.props.Albums)
    // var Albums = this.props.Albums.map(Albums => {
    //   return (
    //     <p></p>
    //   );
    // }
    // )

    return (
      // {this.props.Albums}
      <p>sa</p>
    )
  }
}
export default Albums;
