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
there is probably a more graceful way to do this, but I was struggling with relative coordinates.

To perform additional logic after the drop operation, replace my console.log with whatever you need to do.