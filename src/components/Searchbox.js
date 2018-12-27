import React, { Component } from "react";
import loading from "./../images/smLoading.gif";

const getAreas = "http://interactive.stockport.gov.uk/siarestapi/v1/Getareas";

class Searchbox extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: "",
      areas: []
    };
  }

  componentDidMount() {
    if (this.state.areas.length === 0) {
      fetch(getAreas)
        .then(response => response.json())
        .then(json => {
          console.log(json);
          this.setState({
            areas: json
          });
        });
    }
  }

  render() {
    console.log(this.state.areas);
    return (
      this.state.areas.length > 0 && (
        <form onSubmit={this.searchTitle}>
          <input
            id="title"
            ref={title => (this.title = title)}
            required
            size="16"
          />
          <select id="searchWhat" ref={input => (this.searchWhat = input)}>
            {this.props.searchWhat.map(dd => (
              <option key={dd.id} value={dd.id}>
                {dd.value}
              </option>
            ))}
          </select>
          <select id="Areas" ref={input => (this.area = input)}>
            {this.state.areas.map(dd => (
              <option key={dd.ID} value={dd.ID}>
                {dd.Area1}
              </option>
            ))}
          </select>
          <select
            id="PaginationSize"
            ref={input => (this.PaginationSize = input)}
          >
            <option key="5" value="5">
              5
            </option>
            <option key="10" value="10">
              10
            </option>
            <option key="20" value="20">
              20
            </option>
          </select>

          {this.state.isLoading ? (
            <img src={loading} alt={"loading"} width="20" height="20" />
          ) : (
            //<button className="showMoreButton" type="submit">
            //  search
            //</button>
            <button
              className="showMoreButton"
              onClick={e => {
                e.preventDefault();
                this.props.search(
                  this.title.value,
                  this.area.value,
                  this.PaginationSize.value,
                  this.searchWhat.value
                );
              }}
            >
              Search
            </button>
          )}
        </form>
      )
    );
  }
}
export default Searchbox;
