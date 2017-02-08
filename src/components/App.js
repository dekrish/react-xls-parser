import React, { Component } from 'react';
import './App.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import OverAllSummary from './overallSummary/overallSummary';
import XlsAnalysisAction from '../actions/xlsAnalysisAction';
import $ from 'jquery';

class App extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    let xlf = $('#xlf');
    xlf.on('change', XlsAnalysisAction.getOverAllSummary);

  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>React XLS Analyser using Flux design pattern</h2>
          <p><input type="file" name="xlfile" id="xlf" accept=".xls,.xlsx"/></p>
        </div>
        <Tabs selectedIndex={0}>
          <TabList>
            <Tab>Overall Summary</Tab>
          </TabList>
          <TabPanel>
            <OverAllSummary />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
}

export default App;
