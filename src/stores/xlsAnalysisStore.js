import alt from '../alt';
import xlsAnalysisAction from '../actions/xlsAnalysisAction';
import Constants from "../constants/constants";

class XlsAnalysisStore {
  constructor() {
    //These are the state variables in alt flux implementation
    this.overallSummary = [];
    this.totalNew = 0;
    this.totalOpen = 0;
    this.totalClosed = 0;
    this.totalCancelled = 0;
    this.totalRetest = 0;
    this.totalReturned_Rejected = 0;
    this.totalScheduled_Delivered = 0;
    this.overallStatusData = [];//To be used for Status Pie chart display in OverAllSummary tab panel
    //bind our action handlers to our actions
    this.bindListeners({
      handleOverallSummarySuccess: xlsAnalysisAction.fetchOverAllStatusSuccess,
      handleOverallSummaryFailure: xlsAnalysisAction.fetchOverAllStatusFailure
    });
  }

  handleOverallSummarySuccess(overallSummary) {//actionHandlers
    this.resetCounter();
    let sheet1Data = overallSummary["Sheet1"];
    if(sheet1Data){
      console.log("handleUpdateOverallSummary success "+overallSummary["Sheet1"].length);
      for (let i in sheet1Data){
        if(sheet1Data[i] && sheet1Data[i].Status){
          switch(sheet1Data[i].Status){
            case Constants.NEW:
              this.totalNew++;
              break;
            case Constants.OPEN_IN_ANALYSIS:
              this.totalOpen++;
              break;
            case Constants.CLOSED:
              this.totalClosed++;
              break;
            case Constants.CANCELLED:
              this.totalCancelled++;
              break;
            case Constants.RETURNED_REJECTED:
              this.totalReturned_Rejected++;
              break;
            case Constants.RETEST:
              this.totalRetest++;
              break;
            case Constants.SCHEDULED_DELIVERED:
              this.totalScheduled_Delivered++;
              break;
            default:
              //no op
          }

          //console.log(JSON.stringify(sheet1Data[i].Status));

        }
      }

      this.overallStatusData.push({ [Constants.NEW] : this.totalNew});
      this.overallStatusData.push({ [Constants.CANCELLED] : this.totalCancelled});
      this.overallStatusData.push({ [Constants.CLOSED] : this.totalClosed});
      this.overallStatusData.push({ [Constants.SCHEDULED_DELIVERED] : this.totalScheduled_Delivered});
      this.overallStatusData.push({ [Constants.RETEST] : this.totalRetest});
      this.overallStatusData.push({ [Constants.RETURNED_REJECTED] : this.totalReturned_Rejected});
      this.overallStatusData.push({ [Constants.OPEN_IN_ANALYSIS] : this.totalOpen});


      console.log("this.overallStatusData "+JSON.stringify(this.overallStatusData));

    }
    this.overallSummary = overallSummary;
    //Stores automatically emit a change event (this.emitChange) when an action is dispatched through the store and the action handler ends. In order to suppress the change event you can return false from the action handler.
  }
    
  resetCounter(){
    this.overallSummary = [];
    this.totalNew = 0;
    this.totalOpen = 0;
    this.totalClosed = 0;
    this.totalCancelled = 0;
    this.totalRetest = 0;
    this.totalReturned_Rejected = 0;
    this.totalScheduled_Delivered = 0;
    this.overallStatusData = [];
  }

  handleOverallSummaryFailure(error) {//actionHandlers
    console.log("handleUpdateOverallSummary error "+error);
    this.overallSummary = error;
    //Stores automatically emit a change event (this.emitChange) when an action is dispatched through the store and the action handler ends. In order to suppress the change event you can return false from the action handler.
  }
}

module.exports = alt.createStore(XlsAnalysisStore, 'XlsAnalysisStore');