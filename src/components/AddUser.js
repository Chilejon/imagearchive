import React, { Component } from "react";

class AddUser extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
        input: ''
    };
    this.onChange = this.onChange.bind(this)
  }


  onChange(event)
  {
        this.setState({input: event.target.value})
  }


  render() {
    return (
        <form>
          <label>Username:</label>
          <input
            id="user"
            ref={user => (this.user = user)}
            required
            size="50"
            value={this.state.input}
            onChange={this.onChange}
          />
            <button
              onClick={(e) => {
                e.preventDefault()
                this.setState({input: ''})
                this.props.addUser(
                  this.user.value
                );
              }
            }
            >
              Add user
            </button>
        </form>
      )
  }
}
export default AddUser;
