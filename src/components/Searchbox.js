import React, { Component } from "react";
import loading from "./../images/smLoading.gif";
import areas from "../data/areas.json";

const getAreas = "http://interactive.stockport.gov.uk/siarestapi/v1/Getareas";

class Searchbox extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: "",
      areas: areas,
      input: ''
    };
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    // if (this.state.areas.length === 0) {
    //   fetch(getAreas)
    //     .then(response => response.json())
    //     .then(json => {
    //       //console.log(json);
    //       this.setState({
    //         areas: json
    //       });
    //     });
    // }
  }

  onChange(event) {
    this.setState({ input: event.target.value })
  }

  render() {
    //console.log(this.state.areas);
    return (
      this.state.areas.length > 0 && (
        <form onSubmit={this.searchTitle}>
          <table>
            <tr><th>Search term</th><th>fields</th><th>Area</th><th></th></tr>
            <tr>
              <td>          <input
                id="title"
                ref={title => (this.title = title)}
                required
                size="16"
                value={this.state.input}
                onChange={this.onChange}
              />
              </td>
              <td>
                <select id="searchWhat" ref={input => (this.searchWhat = input)}>
                  {this.props.searchWhat.map(dd => (
                    <option key={dd.id} value={dd.id}>
                      {dd.value}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <select id="Areas" ref={input => (this.area = input)}>
                  <option value="">All</option>
                  {this.state.areas.map(dd => (
                    <option key={dd.ID} value={dd.ID}>
                      {dd.Area1}
                    </option>
                  ))}
                </select>

              </td>
              {/* <td>
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

              </td> */}
              <td>
                {this.props.isLoading ? (
                  <span className="loading"><img src={loading} alt={"loading"} width="20" height="20" /></span>
                ) : (
                    <button
                      className="Button"
                      onClick={(e) => {
                        e.preventDefault()
                        this.setState({ input: '' })
                        this.props.search(
                          this.title.value,
                          this.area.value,
                          this.searchWhat.value
                        );
                      }}
                    >
                      Search
            </button>
                  )}

              </td>
            </tr>

          </table>

        </form>
      )
    );
  }
}
export default Searchbox;
