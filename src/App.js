import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {
  
  state = {manager: '', players: [], balance: '', value: ''};

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({manager, players, balance})
  }

  onSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({message: 'Waiting on transaction success...'});
    await lottery.methods.enter().send({from: accounts[0], value: web3.utils.toWei('0.01', 'ether')});
    this.setState({message: 'You have been entered!'});
  }

  render() {
    web3.eth.getAccounts()
    .then(console.log());

    return (
      <div>
        <h2> Lottery Contract </h2>
        <p> 
          This contract is managed by {this.state.manager}
          There are currently {this.state.players.length} entries.
          Current pot: {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>

        <hr />
        <form onSubmit={this.onSubmit}> 
          <h4>Try your luck?</h4>
          <div>
            <label>Press to enter .01 ether</label>
            <button> Enter </button>
          </div>
        </form>
        <hr />
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
