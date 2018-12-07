import React, { Component } from "react";

class ShowUsers extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
    };
  }


  render() {
    return (
        <section>
           {this.props.user}
        </section>
      )
  }
}
export default ShowUsers;
