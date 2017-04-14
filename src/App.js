import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Output from './Components/Output';
import Select from './Components/Controls/Select';
import Text from './Components/Controls/Text';
import Footer from './Components/Footer';

class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
          paras: 4,
          html: true,
          text: ''
      }
  }

  componentWillMount() {
      this.getSampleText();
  }

  getSampleText() {
    axios.get('http://hipsterjesus.com/api?paras=' + this.state.paras + '&html=' + this.state.html)
        .then((response) => {
            this.setState( {text: response.data.text}, function() {
                console.log(this.state);
            })
        })
        .catch((err) => {
            console.log(err);
        })
  }

  showHtml(x) {
      this.setState({
          html: x
      }, this.getSampleText);
  }

  changeParas(number) {
        this.setState({
            paras: number
        }, this.getSampleText);
    }

  render() {
    return (
      <div className="App">
          <div className="container">
              <h1 className="text-center">ReactJs Sample Text Generator</h1>
              <hr/>
                <div className="sectionForm">
              <form className="form-inline">
                  <div className="form-group">
                      <label>Include HTML:</label>
                      <Select value={this.state.html} onChange={this.showHtml.bind(this)} />
                  </div>
              </form>

              <form className="form-inline">
                  <div className="form-group">
                      <label>Paragraphs:</label>
                      <Text value={this.state.paras} onChange={this.changeParas.bind(this)} />
                  </div>
              </form>
                </div>

              <Output value={this.state.text} />

              <Footer />
          </div>
      </div>
    );
  }
}

export default App;
/* http://joxi.ru/a2XnkvoTX86drg */