import React, { Component } from "react";
import { connect } from "react-redux";
import fetchAccounts from './actions/fetchAccounts'
// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import Home from "./content/Home";
class App extends Component {
  componentDidMount() {
    this.props.fetchAccounts({type: 'FETCH_ACCOUNTS', payload: {name: 'food_trucks'}})
  }
  render() {
    return <div className="App">asdasdasdasd</div>;
  }

  // mapStateToProps = (state) => {
  //   return {
  //     accounts: state.accounts
  //   }
  // }
 }
export default connect(null, {fetchAccounts})(App);
