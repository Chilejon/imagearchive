import React, { Component } from "react";
import AddUser from "./components/AddUser";
import ShowUsers from "./components/ShowUsers";

import "./css/imagearchive.css";



class Randomiser extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      Users: [],
      SpentUsers: [],
      ChosenOne: ''
    };
    this.addUser = this.addUser.bind(this);
    this.ChooseOne =  this.ChooseOne.bind(this)
    this.RackEmUp = this.RackEmUp.bind(this)
  }

  addUser(user) {
    var newArray = this.state.Users.slice();
    newArray.push({user: user})
    this.setState({Users: newArray});
  }

  ChooseOne() {
    var randint = Math.floor(Math.random() * this.state.Users.length);
    //var rndNumber = Math.floor(Math.random() * (this.state.Users.length - 0+1)) + 0;
    this.setState({ChosenOne: this.state.Users[randint].user});
    var chsnne = this.state.Users[randint].user
    this.state.Users.splice(randint, 1);

    var newArray = this.state.SpentUsers.slice();
    newArray.push({user: chsnne})
    this.setState({SpentUsers: newArray});
  }

  RackEmUp() {
    var newArray = this.state.SpentUsers.slice();
    this.setState({Users: newArray,
      SpentUsers: []
    });

  }

  render() {
    return (
      <div>
        <section>
          Add user <AddUser addUser={this.addUser} />
        </section>
        <section>
          <h2>Added Users</h2>
          {this.state.Users.map(user => (
          <section>
             <ShowUsers
              user={user.user}
            />
          </section>
        ))}
        </section>
        <section>
          <h2>The chosen one</h2>
          <button onClick={this.ChooseOne}>Choose one</button>
          <h3>{this.state.ChosenOne !== '' &&
          <ShowUsers user={this.state.ChosenOne}/>
          }</h3>
        </section>
        <section>
          <h2>Spent Users</h2>
          {this.state.SpentUsers.map(user => (
          <section>
             <ShowUsers
              user={user.user}
            />
          </section>
        ))}

        <button onClick={this.RackEmUp}>Rack 'em up</button>
        </section>

        </div>
    );
  }
}

export default Randomiser;
