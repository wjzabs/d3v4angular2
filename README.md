# D3v4angular2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.0.

The notes below may be used to incorporate the following d3 v4 example into an angular application using the cli.

http://blockbuilder.org/syntagmatic/ba23d525f8986cb0ebf30a5dd30c9dd2

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

From the example page, pull down Baseball.csv and place it in the assets folder of the project
Note - pay attention to case - Baseball

Then, using your favorite code editor ...

In app.component.html, replace everything with <app-baseball></app-baseball>

Copy and paste all of the CSS from the HTML example (index.html) into baseball.css

In baseball.html, replace everything with <div id="baseball"></div>

In baseball.ts
- add import * as d3 from 'd3';
- create a new method called createChart(data)
- paste all of the javascript code from the example (index.html) into createChart
- replace all instances of var with let
- change "Baseball.csv" to "assets/Baseball.csv"

create a new method called getData() and insert (as the 1st line of getData)
```javascript
    let that = this;
 ```

cut the following lines from createChart, and paste to getData

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

cut and paste the closing grammar (for the d3.csv function) from createChart to getData
```javascript
    });
```

in createChart, comment out the 1st line, below, and add the 2nd line
```javascript 
    //let color = d3.scaleCategory20();
    let color = d3.scaleOrdinal(d3.schemeCategory20);
```

in createChart, comment out the 1st line, below, and add the 2nd line
```javascript
    // let svg = d3.select("body")
    let svg = d3.select("#baseball")
```

In order to get :hover to work in the css file, you need to add a reference to ViewEncapsulation 
```javascript
    import { Component, OnInit, ViewEncapsulation } from '@angular/core';
```

and then add this line to the component decorator, after styleUrls:
```javascript
     encapsulation: ViewEncapsulation.None 
	// https://stackoverflow.com/questions/38798002/angular-2-styling-not-applying-to-child-component
```

in ngOnInit, add a call to this.getData();
```javascript
  ngOnInit() {
    this.getData();
  }
```

then, your baseball d3 app should be ready to roll:
```
ng serve -o
```

I then created this github repository, and  associated this project with that repo
```
git remote add origin https://github.com/wjzabs/d3v4angular2.git
git push -u origin master
```

to add drag and drop (refer to the code in the github repository), 
- I added a block of code to append .call(d3.drag() to the group element, and 
- I initialized a few properties (xa, ya, xaa, yaa) of the data node in getData.

