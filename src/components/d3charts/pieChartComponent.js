var d3 = require('d3');
import React, { Component } from 'react';
import { render } from 'react-dom';
import Constants from '../../constants/constants';

class PieChartComponent extends Component{
  constructor(){
    super();
    this.svg  = null;
    this.pie = null;
    this.innerRadius = null;
    this.slice = null;
    this.polyline = null;
    this.radius=null;
  }

 componentDidMount(){

   this.svg = d3.select("#piechart"+this.props.id)
    .append("svg")
    .append("g")

   this.svg.append("g")
    .attr("class", "slices");
   this.svg.append("g")
    .attr("class", "labels");
   this.svg.append("g")
    .attr("class", "lines");

   let width = 500,
       height = 500;

    this.radius = Math.min(width, height) / 2;

   this.pie = d3.pie()
    .sort(null)
    .value(function(d) {
      return d.value;
    });

   this.arc = d3.arc()
    .outerRadius(this.radius * 0.8)
    .innerRadius(this.radius * 0.4);

   this.outerArc = d3.arc()
    .innerRadius(this.radius * 0.9)
    .outerRadius(this.radius * 0.9);

   this.svg.attr("transform", "translate(" + 500 + "," + height / 2 + ")");

   this.key = function(d){ return d.data.label; };

   this.color = d3.scaleOrdinal()
    .domain([Constants.NEW, Constants.OPEN_IN_ANALYSIS, Constants.CLOSED, Constants.RETURNED_REJECTED, Constants.SCHEDULED_DELIVERED, Constants.RETEST,Constants.CANCELLED])
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

  //  var randomData = function(){
  //   var labels = color.domain();
  //   return labels.map(function(label){
  //     return { label: label, value: Math.random() }
  //   });
  //  }

  var data = [];//randomData();// newProps.summaryStatusData;//
  console.log(JSON.stringify(data));

 }

 changeData(data){
   const context = this;
   //let labels = context.color.domain();
   //data =
   let dataval = [];
   for(let i in data){
     let dataContent = data[i];
     if(dataContent){
       for(let key in dataContent){
         console.log("key "+key);
         console.log("val "+dataContent[key]);
         dataval.push({ label: key, value: dataContent[key]});
       }
     }
   }
   console.log("dataval ***"+JSON.stringify(dataval) + data.New);
   data = dataval;
   console.log("data ***"+data);
   /* ------- PIE SLICES -------*/
   this.slice = this.svg.select(".slices").selectAll("path.slice")
     .data(this.pie(data), this.key);

   this.slice.enter()
   .insert("path")
   .style("fill", function(d) { return context.color(d.data.label); })
   .attr("class", "slice")
   .merge(this.slice)
   .transition().duration(1000)
   .attrTween("d", function(d) {
     this._current = this._current || d;
     var interpolate = d3.interpolate(this._current, d);
     this._current = interpolate(0);
     return function(t) {
       return context.arc(interpolate(t));
     };
   });

   /* ------- TEXT LABELS -------*/

   let text = context.svg.select(".labels").selectAll("text")
     .data(context.pie(data),context.key);

   let midAngle = function(d){
     return d.startAngle + (d.endAngle - d.startAngle)/2;
   }

   text.enter()
   .append("text")
   .attr("dy", ".35em")
   .text(function(d) {
     return d.data.label+" ("+d.data.value+")";
   })
   .merge(text)
   .transition().duration(1000)
   .attrTween("transform", function(d) {
     this._current = this._current || d;
     var interpolate = d3.interpolate(this._current, d);
     this._current = interpolate(0);
     return function(t) {
       var d2 = interpolate(t);
       var pos = context.outerArc.centroid(d2);
       pos[0] = context.radius * (midAngle(d2) < Math.PI ? 1 : -1);
       //console.log("context.radius "+context.radius);
       //console.log("mid "+midAngle(d2) < Math.PI ? 1 : -1);
       return "translate("+ pos +")";
     };
   })
   .text(function(d) {
     return d.data.label+" ("+d.data.value+")";
   })
   .styleTween("text-anchor", function(d){
     this._current = this._current || d;
     var interpolate = d3.interpolate(this._current, d);
     this._current = interpolate(0);
     return function(t) {
       var d2 = interpolate(t);
       return midAngle(d2) < Math.PI ? "start":"end";
     };
   });
  text.exit()
   .remove();


   /* ------- SLICE TO TEXT POLYLINES -------*/

   context.polyline= context.svg.select(".lines").selectAll("polyline")
     .data(context.pie(data), this.key);

     context.polyline.enter()
     .append("polyline")
     .merge(context.polyline)
     .transition().duration(1000)
     .attrTween("points", function(d){
       this._current = this._current || d;
       var interpolate = d3.interpolate(this._current, d);
       this._current = interpolate(0);
       return function(t) {
         var d2 = interpolate(t);
         var pos = context.outerArc.centroid(d2);
         pos[0] = context.radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
         return [context.arc.centroid(d2), context.outerArc.centroid(d2), pos];
       };
     });

   this.polyline.exit()
     .remove();
 }

componentWillReceiveProps(newProps){
  console.log("newProps "+JSON.stringify(newProps.summaryStatusData));
  this.changeData(newProps.summaryStatusData);
}


 render(){
   return(
     <div style={{height:"100%"}}>
        <div style={{height:"100%"}} ref={this.props.id} id={"piechart"+this.props.id}></div>
     </div>
   )
 }

}

export default PieChartComponent;
