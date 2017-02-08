import React, { Component } from 'react';
import { render } from 'react-dom';
import XlsAnalysisStore from '../../stores/xlsAnalysisStore';
import XlsAnalysisAction from '../../actions/xlsAnalysisAction';
import './style.css';
import $ from 'jquery';
import PieChartComponent from '../d3charts/pieChartComponent';


class OverAllSummary extends Component{
  constructor(props){
    super(props);
    this.state ={
      summaryData : XlsAnalysisStore.getState().overallSummary, //Every alt store has a method which returns its state
      summaryStatusData : XlsAnalysisStore.getState().overallStatusData,
      overallStatusData : []
    }
    this.onChangeHandler = this.onChange.bind(this);
  }

  componentWillMount(){
    XlsAnalysisStore.listen(this.onChangeHandler);
  }

  componentWillUnmount(){
    XlsAnalysisStore.unlisten(this.onChangeHandler);
    $("body").css({overflow:"auto"});
  }

  componentDidMount(){
    $("body").css({overflow:"hidden"});
    $("#react-tabs-1").css({overflow:"auto",height:"600px"});
  }

  onChange(newState){
    this.state.summaryData = [];//Resetting the data
    console.log("onChange "+JSON.stringify(newState.overallStatusData));
    this.setState({
      summaryData: newState.overallSummary,
      summaryStatusData : newState.overallStatusData
    });
  }

  render(){
    return (

      <div className="scrollit">
      <div className="div-table">
          <div className="div-table-row">
                <div className="div-table-col">
                  <PieChartComponent id="1" summaryStatusData={this.state.summaryStatusData}/>
                </div>
          </div>
      </div>
      </div>
    );
  }
}

export default OverAllSummary;
