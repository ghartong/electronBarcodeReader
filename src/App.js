import React, { Component } from 'react';
import './App.css';
import https from 'https'

class App extends Component {
  constructor() {
    super()
    this.state = {
      result_text: '',
      iframe_src: ''
    }
  }

  handleChange(e) {
    const that = this
    let targetVal = e.target.value.replace(/[^\d]/g, '')
    console.log(targetVal)
    if (targetVal.length === 6) {
      //alert('You entered: ' + e.target.value)
      //const url = 'https://oh.moriapp.com/mori/check_status?gl_number=' + + e.target.value
      const url = 'https://ancient-badlands-23297.herokuapp.com/member/' + targetVal
      
      fetch(url)
      .then(response => {
        if (response.status !== 200) {
          const data = 'Looks like there was a problem. Status Code: ' + response.status;
          const result_text = data
          that.setState({result_text})
        }
  
        // Examine the text in the response
        response.json().then(function(data) {
          console.log(data);
          const member = JSON.parse(data)
          const result_text = `<label>Name:</label> ${member.member_name}<br /><label>Status:</label> ${member.member_status}`
          that.setState({result_text})
        });
      })
      .catch(function(err) {
        const data = 'Fetch Error :-S' + err;
        const result_text = data
        that.setState({result_text})
      })
  
      e.target.value = ''
    } else if (e.target.value.length > 0) {
      const result_text = '...processing'
      that.setState({result_text})
    }
  }

  render() {
    this.handleChange = this.handleChange.bind(this)

    return (
      <div className="App">
        <header className="App-header">
          <img src="assets/png/victory.png_128x128.png" className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Victory Lodge</h1>
        </header>
        <p className="App-intro">
          To get started, enter your Membership Number below.
        </p>
        <p>
          <input type="text" onChange={this.handleChange} />
        </p>
        <p className="results" dangerouslySetInnerHTML={{__html: this.state.result_text}} />
      </div>
    );
  }
}

export default App;
