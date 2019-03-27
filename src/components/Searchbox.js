import React, { Component } from "react";
import loading from "./../images/smLoading.gif";

const getAreas = "http://interactive.stockport.gov.uk/siarestapi/v1/Getareas";

class Searchbox extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isLoading: "",
      areas: [{
        IDOLD: 1,
        Area1: "Adswood ",
        ID: 1
      },
      {
        IDOLD: 2,
        Area1: "Bosden ",
        ID: 2
      },
      {
        IDOLD: 3,
        Area1: "Bramhall ",
        ID: 3
      },
      {
        IDOLD: 4,
        Area1: "Bredbury ",
        ID: 4
      },
      {
        IDOLD: 5,
        Area1: "Brinksway ",
        ID: 5
      },
      {
        IDOLD: 6,
        Area1: "Brinnington ",
        ID: 6
      },
      {
        IDOLD: 7,
        Area1: "Cale Green ",
        ID: 7
      },
      {
        IDOLD: 8,
        Area1: "Cheadle ",
        ID: 8
      },
      {
        IDOLD: 9,
        Area1: "Cheadle Heath ",
        ID: 9
      },
      {
        IDOLD: 10,
        Area1: "Cheadle Hulme ",
        ID: 10
      },
      {
        IDOLD: 11,
        Area1: "Compstall ",
        ID: 11
      },
      {
        IDOLD: 12,
        Area1: "Davenport ",
        ID: 12
      },
      {
        IDOLD: 13,
        Area1: "Disley ",
        ID: 13
      },
      {
        IDOLD: 14,
        Area1: "Edgeley ",
        ID: 14
      },
      {
        IDOLD: 15,
        Area1: "Gatley ",
        ID: 15
      },
      {
        IDOLD: 16,
        Area1: "Gee Cross ",
        ID: 16
      },
      {
        IDOLD: 17,
        Area1: "Great Moor ",
        ID: 17
      },
      {
        IDOLD: 18,
        Area1: "Greave ",
        ID: 18
      },
      {
        IDOLD: 19,
        Area1: "Handforth ",
        ID: 19
      },
      {
        IDOLD: 20,
        Area1: "Hatherlow ",
        ID: 20
      },
      {
        IDOLD: 21,
        Area1: "Hawk Green ",
        ID: 21
      },
      {
        IDOLD: 22,
        Area1: "Hazel Grove ",
        ID: 22
      },
      {
        IDOLD: 23,
        Area1: "Heald Green ",
        ID: 23
      },
      {
        IDOLD: 24,
        Area1: "Heaton Chapel ",
        ID: 24
      },
      {
        IDOLD: 25,
        Area1: "Heaton Mersey ",
        ID: 25
      },
      {
        IDOLD: 26,
        Area1: "Heaton Moor ",
        ID: 26
      },
      {
        IDOLD: 27,
        Area1: "Heaton Norris ",
        ID: 27
      },
      {
        IDOLD: 28,
        Area1: "Heaviley ",
        ID: 28
      },
      {
        IDOLD: 29,
        Area1: "High Lane ",
        ID: 29
      },
      {
        IDOLD: 30,
        Area1: "Lancashire Hill ",
        ID: 30
      },
      {
        IDOLD: 31,
        Area1: "Little Moor ",
        ID: 31
      },
      {
        IDOLD: 32,
        Area1: "Ludworth ",
        ID: 32
      },
      {
        IDOLD: 33,
        Area1: "Lyme ",
        ID: 33
      },
      {
        IDOLD: 34,
        Area1: "Marple ",
        ID: 34
      },
      {
        IDOLD: 35,
        Area1: "Marple Bridge ",
        ID: 35
      },
      {
        IDOLD: 36,
        Area1: "Mellor ",
        ID: 36
      },
      {
        IDOLD: 37,
        Area1: "Norbury ",
        ID: 37
      },
      {
        IDOLD: 38,
        Area1: "Norris Bank ",
        ID: 38
      },
      {
        IDOLD: 39,
        Area1: "Offerton ",
        ID: 39
      },
      {
        IDOLD: 40,
        Area1: "Portwood ",
        ID: 40
      },
      {
        IDOLD: 41,
        Area1: "Poynton ",
        ID: 41
      },
      {
        IDOLD: 42,
        Area1: "Reddish ",
        ID: 42
      },
      {
        IDOLD: 43,
        Area1: "Romiley ",
        ID: 43
      },
      {
        IDOLD: 44,
        Area1: "Rose Hill ",
        ID: 44
      },
      {
        IDOLD: 45,
        Area1: "Strines ",
        ID: 47
      },
      {
        IDOLD: 46,
        Area1: "Torkington ",
        ID: 46
      },
      {
        IDOLD: 47,
        Area1: "Town Centre ",
        ID: 45
      },
      {
        IDOLD: 48,
        Area1: "Werneth ",
        ID: 48
      },
      {
        IDOLD: 49,
        Area1: "Windlehurst ",
        ID: 49
      },
      {
        IDOLD: 50,
        Area1: "Woodbank ",
        ID: 50
      },
      {
        IDOLD: 51,
        Area1: "Woodford ",
        ID: 51
      },
      {
        IDOLD: 52,
        Area1: "Woodley ",
        ID: 52
      },
      {
        IDOLD: 53,
        Area1: "Woodsmoor ",
        ID: 53
      },
      {
        IDOLD: 55,
        Area1: "Cheshire/Other ",
        ID: 54
      }],
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
            <tr><th>Search term</th><th>fields</th><th>Area</th><th>Pagination</th><th></th></tr>
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
              <td>
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

              </td>
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
                          this.PaginationSize.value,
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
