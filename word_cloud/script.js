// Load the CSV data
d3.csv("emo_year.csv", function(data) {
  // Define the SVG element
  var svg = d3.select("body")
    .append("svg")
    .attr("width", 1400)
    .attr("height", 600);
  
  // Define the zoom behavior
  var zoom = d3.zoom()
    .scaleExtent([0.5, 8])
    .on("zoom", zoomed);
  console.log(data.year);
  // Set the initial year
  var year = data.year;
  
  // Filter the data for the initial year
  var yearData = data.filter(function(d) {
    return d.year === year;
  });
  
  // Convert the circle radii to numbers
  yearData.forEach(function(d) {
    d.circle1 = +d.circle1;
    d.circle2 = +d.circle2;
    d.circle3 = +d.circle3;
  });
  
  // Create the circle packing layout for each circle
  var pack1 = d3.pack()
    .size([200, 200])
    .padding(2);
  var pack2 = d3.pack()
    .size([200, 200])
    .padding(2);
  var pack3 = d3.pack()
    .size([200, 200])
    .padding(2);
  
  // Convert the data to a hierarchical structure for each circle
  var root1 = d3.hierarchy({children: yearData.map(function(d) { return {radius: d.circle1}; })})
    .sum(function(d) { return d.radius; });
  var root2 = d3.hierarchy({children: yearData.map(function(d) { return {radius: d.circle2}; })})
    .sum(function(d) { return d.radius; });
  var root3 = d3.hierarchy({children: yearData.map(function(d) { return {radius: d.circle3}; })})
    .sum(function(d) { return d.radius; });
  
  // Initialize the visualization with the first circle
  updateVisualization(root1);
  
  // Define the dropdown behavior
  d3.select("#year-select").on("change", function() {
    // Get the selected year
    var year = this.value;
    
    // Filter the data for the selected year
    var yearData = data.filter(function(d) {
      return d.year === year;
    });
    
    // Convert the circle radii to numbers
    yearData.forEach(function(d) {
      d.circle1 = +d.circle1;
      d.circle2 = +d.circle2;
      d.circle3 = +d.circle3;
    });
    
    // Convert the data to a hierarchical structure for each circle
    var root1 = d3.hierarchy({children: yearData.map(function(d) { return {radius: d.circle1}; })})
      .sum(function(d) { return d.radius; });
    var root2 = d3.hierarchy({children: yearData.map(function(d) { return {radius: d.circle2}; })})
      .sum(function(d) { return d.radius; });
    var root3 = d3.hierarchy({children: yearData.map(function(d) { return {radius: d.circle3}; })})
      .sum(function(d) { return d.radius; });
    
    // Update the visualization for each circle
    updateVisualization(root1);
    updateVisualization(root2);
    updateVisualization(root3);
  });
  
  function updateVisualization(root) {
    // Remove any existing circles from the SVG element
    svg.selectAll("circle").remove();
    
    // Compute the layout for the given root node
    var nodes = pack(root).descendants();
    
    // Add the circles to the SVG element
    svg.selectAll("circle")
      .data(nodes)
      .enter().append("circle")
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .attr("r", function(d) { return d.r; })
        .style("stroke", "black")
        .style("stroke-width", 1)
        .style("fill", function(d) { return d.children ? "none" : "steelblue"; });
        
    // Apply the zoom behavior to the SVG element
    svg.call(zoom);
  }
  // Define the zoomed function
function zoomed() {
  circles.attr("transform", d3.event.transform);
}

});
