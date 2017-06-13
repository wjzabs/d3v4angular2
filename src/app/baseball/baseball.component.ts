import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
@Component({
  selector: 'app-baseball',
  templateUrl: './baseball.component.html',
  styleUrls: ['./baseball.component.css']
})
export class BaseballComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    let that = this;

    d3.csv("assets/Baseball.csv", function (error, data) {
      console.log(data);
      // data pre-processing
      data.forEach(function (d) {
        d.y = +d["runs86"];
        d.x = +d["atbat86"];
        d.r = +d["homer86"];
      });

      data.sort(function (a, b) { return b.r - a.r; });

      that.createChart(data);

    });

  }
  createChart(data) {
    let margin = { top: 30, right: 50, bottom: 40, left: 50 };
    let width = 960 - margin.left - margin.right;
    let height = 500 - margin.top - margin.bottom;

    let svg = d3.select("body")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let xscale = d3.scaleLinear()
      .domain([0, 800])
      .range([0, width]);

    let yscale = d3.scaleLinear()
      .range([height, 0]);

    let radius = d3.scaleSqrt()
      .range([2, 8]);

    let xAxis = d3.axisBottom()
      .tickSize(-height)
      .scale(xscale);

    let yAxis = d3.axisLeft()
      .tickSize(-width)
      .scale(yscale)
 
    //let color = d3.scaleCategory20();
    let color = d3.scaleOrdinal(d3.schemeCategory20);

    // d3.csv("assets/Baseball.csv", function(error, data) {
    //   console.log(data);
    //   // data pre-processing
    //   data.forEach(function(d) {
    //     d.y = +d["runs86"];
    //     d.x = +d["atbat86"];
    //     d.r = +d["homer86"];
    //   });

    //   data.sort(function(a,b) { return b.r - a.r; });

    yscale.domain(d3.extent(data, function (d) {
      return d.y;
    })).nice();

    radius.domain(d3.extent(data, function (d) {
      return d.r;
    })).nice();

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .attr("class", "x axis")
      .call(xAxis);

    svg.append("g")
      .attr("transform", "translate(0,0)")
      .attr("class", "y axis")
      .call(yAxis);

    let group = svg.selectAll("g.bubble")
      .data(data)
      .enter().append("g")
      .attr("class", "bubble")
      .attr("transform", function (d) {
        return "translate(" + xscale(d.x) + "," + yscale(d.y) + ")"
      });

    group
      .append("circle")
      .attr("r", function (d) { return radius(d.r); })
      .style("fill", function (d) {
        return color(d["team86"]);
      })

    group
      .append("text")
      .attr("x", function (d) { return radius(d.r); })
      .attr("alignment-baseline", "middle")
      .text(function (d) {
        return d["name1"] + " " + d["name2"];
      });

    svg.append("text")
      .attr("x", 6)
      .attr("y", -2)
      .attr("class", "label")
      .text("Runs (86)");

    svg.append("text")
      .attr("x", width - 2)
      .attr("y", height - 6)
      .attr("text-anchor", "end")
      .attr("class", "label")
      .text("At Bats (86)");

    let legend = svg.selectAll(".legend")
      .data(color.domain())
      .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function (d, i) { return "translate(2," + i * 14 + ")"; });

    legend.append("rect")
      .attr("x", width)
      .attr("width", 12)
      .attr("height", 12)
      .style("fill", color);

    legend.append("text")
      .attr("x", width + 16)
      .attr("y", 6)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .text(function (d) { return d; });

    legend.on("mouseover", function (type) {
      d3.selectAll(".legend")
        .style("opacity", 0.1);
      d3.select(this)
        .style("opacity", 1);
      d3.selectAll(".bubble")
        .style("opacity", 0.1)
        .filter(function (d) { return d["team86"] == type; })
        .style("opacity", 1);
    })
      .on("mouseout", function (type) {
        d3.selectAll(".legend")
          .style("opacity", 1);
        d3.selectAll(".bubble")
          .style("opacity", 1);
      });
    // });    
  }
}
