import XLSX from 'xlsx';

class QCExcelParser {
  constructor(){
    this.X = XLSX;

  }

  fetchOverAllStatus(file){
    const context = this;
    return (new Promise(function(resolve, reject) {
      // Do an async task and then...
      let reader = new FileReader();
   		//let name = file.name;
   		reader.onload = (function(e) {
          try{
       			let data = e.target.result;
            let wb;
      		  let arr = this.fixdata(data);
      			wb = this.X.read(btoa(arr), {type: 'base64'});
      			let jsonObj = this.process_wb(wb);
            if(jsonObj) {
          		resolve(jsonObj);
          	}
          	else {
          		reject('Unable to process excel file');
          	}
          }catch(e){
            reject('Unable to process excel file,'+e);
          }
   		}).bind(context);

      reader.readAsArrayBuffer(file);
    })
  );

  }

  fixdata(data) {
  	let o = "", l = 0, w = 10240;
  	for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
  	o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)));
  	return o;
  }

  to_json(workbook) {
  	let result = {};
  	workbook.SheetNames.forEach((function(sheetName) {
  		let roa = this.X.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
  		if(roa.length > 0){
  			result[sheetName] = roa;
  		}
  	}).bind(this));
  	return result;
  }

  process_wb(wb) {
  	//let output = "";
    let jsonObj = this.to_json(wb);
  	//output = JSON.stringify(jsonObj, 2, 2);
  	//if(typeof console !== 'undefined') console.log("output", new Date());
    console.log(jsonObj);
    return jsonObj;
  }

}

export default QCExcelParser;
