import React, { Component } from "react";
import loadingTransp from "./../images/loadingTransp.gif";
import areas from "../data/areas.json";

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

  onChange(event) {
    this.setState({ input: event.target.value })
  }

  render() {
    return (
      this.state.areas.length > 0 && (
        <fragment>
          <h1 className="titleText">Stockport Image Archive</h1>
          <form onSubmit={this.searchTitle} className="textCentered">
            <table>
              <tr><th>Keywork search</th><th>Search depth</th><th>Locations</th><th></th><th></th></tr>
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
                    <option value="">All locations</option>
                    {this.state.areas.map(dd => (
                      <option key={dd.ID} value={dd.ID}>
                        {dd.Area1}
                      </option>
                    ))}
                  </select>

                </td>
                <td>
                  {this.props.isLoading ? (
                    <img src={loadingTransp} alt={"loading"} width="35" height="35" />
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
                <td>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <button
                    className="albumButton"
                    onClick={(e) => {
                      e.preventDefault()
                      this.props.displayAlbums()
                    }}
                  >
                    Show/Hide albums
                </button>

                </td>
              </tr>
            </table>
          </form>
          <h2 className="titleText">{this.props.NoResults}</h2>
        </fragment>
      )
    );
  }
}
export default Searchbox;
