import XLSParser from '../api/xlsParser';
import alt from '../alt';

class XlsAnalysisAction {
    constructor() {
        // put auto generate actions here
    }

    handleDashboardTabSelection(selectedTabIndex,prevTabIndex){
      console.log("selected tab index "+selectedTabIndex);
      switch(selectedTabIndex){
        case 0:
         this.getOverAllSummary();
         break;
        default:
         //no op
      }
    }

    getOverAllSummary(fileSelectionEvent){
      console.log("getOverAllSummary");
      if(fileSelectionEvent){
        let files = fileSelectionEvent.target.files;
    	  let file = files[0];
        let xlsParser = new XLSParser();
        xlsParser.fetchOverAllStatus(file)
        .then((function(jsonObj){//SUCCESS PARSING XLS
          this.fetchOverAllStatusSuccess(jsonObj);
        }).bind(this))
        .catch((function(error){//FAILURE PARSING XLS
          this.fetchOverAllStatusFailure(error);
        }).bind(this));
      }else{
        let overAllSummary = "NO DATA";
        //tell all stores about NO DATA for overall summary
        //This is the DISPATCH -- no need to use this.dispatch as given in alt documentation, as its deprecated
        return this.fetchOverAllStatusFailure(overAllSummary);
      }

    }

    fetchOverAllStatusSuccess(jsonObj){
      //tell all stores about JSON Object parsed from XLS
      //This is the DISPATCH -- no need to use this.dispatch as given in alt documentation, as its deprecated
      return jsonObj;
    }

    fetchOverAllStatusFailure(error){
      //tell all stores about XLS Parse failure
      //This is the DISPATCH -- no need to use this.dispatch as given in alt documentation, as its deprecated
      return error;
    }

}
export default (alt.createActions(XlsAnalysisAction));