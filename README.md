# D3v4angular2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.0.

The notes below may be used to incorporate a [d3 v4 example from blockbuilder](http://blockbuilder.org/syntagmatic/ba23d525f8986cb0ebf30a5dd30c9dd2) into an angular application using the cli.

The example is a scatterplot showing baseball data.  
Note that the example contains an HTML file (index.html) which includes CSS and javascript code.

## Notes

Here are the steps to prepare the angular cli application:
```
ng new d3v4angular2
cd d3v4angular2
npm install d3 --save	// install the d3 library using npm
ng g component baseball	//create a component to be used for the baseball scatterplot
```

From the [blockbuilder example page](http://blockbuilder.org/syntagmatic/ba23d525f8986cb0ebf30a5dd30c9dd2), pull down Baseball.csv and place it in the assets folder of the project.  
Note - *pay attention to case* - **B**aseball

Then, using your favorite code editor ...

In app.component.html, replace everything with 
``` 
<app-baseball></app-baseball>
``` 

Copy and paste all of the CSS from the blockbuilder example (in index.html) into baseball.css, and replace the body tag with #baseball.
``` 
#baseball {
  margin: 0;
  font-family: arial, sans;
}
``` 

In baseball.html, replace everything with 
```
<div id="baseball"></div>
```

In baseball.ts
- add import * as d3 from 'd3';
- create a new method called createChart(data)
- paste all of the javascript code from the blockbuilder example (in index.html) into createChart
- replace all instances of var with let
- change "Baseball.csv" to "assets/Baseball.csv"

Create a new method called getData() and insert (as the 1st line of getData)
```javascript
    let that = this;
 ```

Cut the following lines from createChart, and paste to getData

```javascript
    d3.csv("assets/Baseball.csv", function (error, data) {
      console.log(data);
      // data pre-processing
      data.forEach(function (d) {
        d.y = +d["runs86"];
        d.x = +d["atbat86"];
        d.r = +d["homer86"];
      });

      data.sort(function (a, b) { return b.r - a.r; });
```

Add a call to createChart using "that"
```javascript
      that.createChart(data);
```

Cut and paste the closing grammar (for the d3.csv function) from createChart to getData
```javascript
    });
```

In createChart, comment out the 1st line, below, and add the 2nd line
```javascript 
    //let color = d3.scaleCategory20();
    let color = d3.scaleOrdinal(d3.schemeCategory20);
```

In createChart, comment out the 1st line, below, and add the 2nd line
```javascript
    // let svg = d3.select("body")
    let svg = d3.select("#baseball")
```

In order to get :hover to work in the css file, you need to add a reference to ViewEncapsulation, [thanks to this stackoverflow article](https://stackoverflow.com/questions/38798002/angular-2-styling-not-applying-to-child-component)
```javascript
    import { Component, OnInit, ViewEncapsulation } from '@angular/core';
```

and then add this line to the component decorator, after styleUrls:
```javascript
     encapsulation: ViewEncapsulation.None 
```

In ngOnInit, add a call to this.getData();
```javascript
  ngOnInit() {
    this.getData();
  }
```

Then, your d3 baseball app should be ready to roll:
```
ng serve -o
```

I then created this github repository, and  associated this project with that repo, using the following commands:
```
git remote add origin https://github.com/wjzabs/d3v4angular2.git
git push -u origin master
```

to add drag and drop (refer to the code in the github repository)
- I added a block of code to append .call(d3.drag() to the group element, and 
- I initialized a few properties (xa, ya, xaa, yaa) of the data node in getData.
  
There is probably a more graceful way to do this, but I was struggling with relative coordinates.

To perform additional logic after the drop operation, replace my console.log with whatever you need to do.

I also added a more robust tooltip revealing more of the data when you hover over a player's circle.  
Code was added to the baseball.html, baseball.css and baseball.ts files - look for tooltip in the code.

I added zoom & pan by inserting this code, which places a rectangle over most of the svg, and allows you to scroll your mouse wheel to zoom in and out, as well as to mousedown and move the entire svg.
```javascript
    let zoomed = function () {
      svg.attr("transform", d3.event.transform);
    }

    let view = svg.append("rect")
      .attr("class", "view")
      .attr("x", 0.5)
      .attr("y", 0.5)
      .attr("width", width - 1)
      .attr("height", height - 1)
      .style("fill", "none")
      .style("pointer-events", "all")
      .call(d3.zoom()
        .scaleExtent([1 / 2, 10])
        .on("zoom", zoomed));
```

There is some screen jank / performance issue when you pan.  
We had this and fixed it in other projects.  
I don't remember what we did to fix it, but I will update these notes when I find it again.


Some useful links pertaining to [d3](https://d3js.org/)

[Mike Bostock](https://bost.ocks.org/mike/)  
[Bostock Interview](https://thewinnower.com/papers/2374-hi-i-m-mike-bostock-creator-of-d3-js-and-a-former-graphics-editor-for-the-new-york-times-i-do-data-visualization-design-and-open-source-ama)  
[NY Times](https://flowingdata.com/tag/nytimes/)  
[Gallery](https://github.com/d3/d3/wiki/Gallery)  
[Christophe Viau Big List](http://christopheviau.com/d3list/)  
[Blockbuilder - example by Shirley Wu](http://blockbuilder.org/sxywu/34ea25433940f2c67ab9336d65e11a36)  
[More Blockbuilder](http://blockbuilder.org/search)  
[Mike's samples](https://bost.ocks.org/mike/example/)  
[Ian Johnson Demo Project Front-End Masters course](http://bl.ocks.org/enjalot/6641917)  
[Jason davies examples](https://www.jasondavies.com/)  
[Colors by Theresa Brewer](http://colorbrewer2.org)  
[D3 v3 vs v4](https://github.com/d3/d3/blob/master/CHANGES.md)  
[Horizontal Bullet chart from JQWidgets](http://www.jqwidgets.com/angular/angular-bulletchart/index.htm)  
[Baseball Scatterplot](http://blockbuilder.org/syntagmatic/ba23d525f8986cb0ebf30a5dd30c9dd2)  
[Brushes](http://blockbuilder.org/Fil/013d52c3e03aa7b90f71db99eace95af)  
[Chords](http://blockbuilder.org/NPashaP/54cf6b3b370e85e3f8374943f5150f53)  
[Chords - Uber data](https://bost.ocks.org/mike/uberdata/)  
[d3 vs tableau](http://vizcandy.blogspot.ca/2013/07/replicating-new-york-times-d3js-chart.html)  
[Cartographic Data](https://www.census.gov/geo/maps-data/data/cbf/cbf_state.html)  
[US data](https://ckan.org/)  
[Geodata](https://mygeodata.cloud/)  
[D3 tips and tricks](http://curran.github.io/screencasts/introToD3/examples/viewer/)  
[this and that](https://stackoverflow.com/questions/40667505/angular-2-d3-how-to-call-this-when-function-this-exists)  
[d3 and the NFL](https://www.theguardian.com/sport/interactive/2013/jan/30/nfl-salaries-team-position - baltimore-ravens,san-francisco-49ers)  
[d3 and the Oscars](http://www.nytimes.com/interactive/2013/02/20/movies/among-the-oscar-contenders-a-host-of-connections.html?mcubz=0&_r=0)  
[d3 and the Presidential Race](http://www.nytimes.com/interactive/2012/11/02/us/politics/paths-to-the-white-house.html)  
[built-with d3](https://trends.builtwith.com/websitelist/D3-JS)  
[reusable bar chart example] (https://keathmilligan.net/create-reusable-chart-components-with-angular-2-and-d3-js-version-4/)  
[Alternatives to d3](https://www.slant.co/options/10577/alternatives/~d3-js-alternatives)  
[Threejs](https://threejs.org/)  