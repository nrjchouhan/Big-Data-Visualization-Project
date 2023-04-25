// https://observablehq.com/@d3/bar-chart-race-explained@3020
function _1(md){return(
md`<h1 style="text-align:center;">Best Selling Artists</h1>`
)}
function changeBackground(color) {
  document.body.style.background = color;
}
function changeColor() {

  document.getElementById("bar-chart-race-explained").style.color = "white";
  
  }
window.addEventListener("load",function() { changeBackground('#fffee3') });
async function _data(d3,FileAttachment){return(
d3.csvParse(await FileAttachment("racing_bar_data.csv").text(), d3.autoType)
)}

function _3(md){return(
md`The data for the race is a CSV with columns *date* (in [YYYY-MM-DD format](https://www.ecma-international.org/ecma-262/9.0/index.html#sec-date-time-string-format)), *name*, *value* and optionally *category* (which if present determines color). To replace the data, click the file icon <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke-width="2"><path d="M12.1637 11.8446L12.7364 11.286L12.1637 11.8446ZM5.97903 6.6495L11.591 12.4032L12.7364 11.286L7.12442 5.53232L5.97903 6.6495ZM10.6159 13.3544L4.37343 6.95428L3.22804 8.07146L9.47048 14.4715L10.6159 13.3544ZM7.44625 4.02933L13.4139 10.4536L14.5861 9.36462L8.61851 2.94039L7.44625 4.02933ZM4.23394 4.1499C5.0428 3.13633 6.5637 3.07925 7.44625 4.02933L8.61851 2.94039C7.0703 1.27372 4.40228 1.37385 2.98335 3.15189L4.23394 4.1499ZM4.37343 6.95428C3.62641 6.1884 3.56661 4.98612 4.23394 4.1499L2.98335 3.15189C1.81269 4.61883 1.91759 6.72792 3.22804 8.07146L4.37343 6.95428ZM11.591 13.3544C11.3237 13.6284 10.8832 13.6284 10.6159 13.3544L9.47048 14.4715C10.3657 15.3893 11.8412 15.3893 12.7364 14.4715L11.591 13.3544ZM11.591 12.4032C11.8491 12.6678 11.8491 13.0898 11.591 13.3544L12.7364 14.4715C13.6006 13.5855 13.6006 12.172 12.7364 11.286L11.591 12.4032Z" fill="currentColor"></path></svg> in the cell above.`
)}

function _replay(html){return(
html`<button style="display:none">Replay`
)}

function _title(md){return(
md``
)}

async function* _chart(replay,d3,width,height,bars,axis,labels,ticker,keyframes,duration,x,invalidation)
{
  replay;

  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, 2000, height]);

  const updateBars = bars(svg);
  const updateAxis = axis(svg);
  const updateLabels = labels(svg);
  const updateTicker = ticker(svg);

  yield svg.node();

  for (const keyframe of keyframes) {
    const transition = svg.transition()
        .duration(duration)
        .ease(d3.easeLinear);

    // Extract the top bar’s value.
    x.domain([0, keyframe[1][0].value]);

    updateAxis(keyframe, transition);
    updateBars(keyframe, transition);
    updateLabels(keyframe, transition);
    updateTicker(keyframe, transition);

    invalidation.then(() => svg.interrupt());
    await transition.end();
  }
}


function _7(md){return(
md`The chart consists of four parts. From bottom to top in *z*-order: the bars, the *x*-axis, the labels, and the ticker showing the current date. I’ve separated these parts so that they’ll be easier to explain individually below.`
)}

function _8(md){return(
md`The animation iterates over each of the keyframes, delegating updates to each of the four chart components and awaiting the [transition’s end](/@d3/transition-end). Linear [easing](/@d3/easing-animations?collection=@d3/d3-ease) enures the animation runs at constant speed.`
)}

function _9(md){return(
md`(Observable aside: notebooks [run in topological order](/@observablehq/how-observable-runs), hence the chart cell *above* can depend on cells defined *below*. We write notebooks in whatever order we like and let the computer figure out how to run them. Hooray, [literate programming](http://www.literateprogramming.com/)! You can edit this notebook and the chart will re-run automatically: on [invalidation](/@observablehq/invalidation), the animation is interrupted and a new one starts.)`
)}

function _duration(){return(w
150
)}

function _11(md){return(
md`You can make the animation faster or slower by adjusting the duration between keyframes in milliseconds.`
)}

function _12(md){return(
md`## Data

But what are these keyframes? Data, derived from the source data!`
)}

function _13(md){return(
md`Take another look at the source data by inspecting the array below. Note that it does not include a *rank* column—we will compute it.`
)}

function _14(data){return(
data
)}

function _15(md){return(
md`For any given brand, such as Apple, there are multiple entries in the dataset: one per year. We can also see this by [grouping](/@d3/d3-group) by name.`
)}

function _16(d3,data){return(
d3.group(data, d => d.name)
)}

function _17(md){return(
md`While most brands are defined for the full duration (from 2000 to 2019), and thus have twenty entries, some brands are occasionally missing. Heineken, for instance, is missing from 2005 to 2009 because it fell out of the top 100 tracked by Interbrand.`
)}

function _18(data){return(
data.filter(d => d.name === "Heineken")
)}

function _19(md,n){return(
md`Why do we care about the top 100 when the chart only shows the top ${n}? Having data beyond the top ${n} allows bars that enter or exit to correctly transition from the previous value or to the next value *outside* the top group. And besides, there’s little cost to processing the larger set. If you like, you can increase the value of *n* below for a bigger race.`
)}

function _n(){return(
10
)}

function _21(md){return(
md`Here’s the full [set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) of brand names covering twenty years. It’s larger than yearly top 100 because there’s turnover. (Farewell, Motorola, *we hardly knew ye*.)`
)}

function _names(data){return(
new Set(data.map(d => d.name))
)}

function _23(md){return(
md`Similarly, here’s the set of dates. But our approach here is different. We’ll construct a nested [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) from date and name to value. Then we’ll convert this to an array to order the data chronologically.`
)}

function _datevalues(d3,data){return(
Array.from(d3.rollup(data, ([d]) => d.value, d => +d.date, d => d.name))
  .map(([date, data]) => [new Date(date), data])
  .sort(([a], [b]) => d3.ascending(a, b))
)}

function _25(md){return(
md`(Dates are objects, so we have to do a little dance to construct the map. The dates are first coerced to numbers using + for keys, and then converted back into dates using the Date constructor.)`
)}

function _26(md){return(
md`Now we’re ready to compute the zero-based rank for each brand. The *rank* function below takes a *value* accessor function, retrieves each brand’s value, sorts the result by descending value, and then assigns rank.`
)}

function _rank(names,d3,n){return(
function rank(value) {
  const data = Array.from(names, name => ({name, value: value(name)}));
  data.sort((a, b) => d3.descending(a.value, b.value));
  for (let i = 0; i < data.length; ++i) data[i].rank = Math.min(n, i);
  return data;
}
)}

function _28(md){return(
md`Here’s an example, computing the ranked brands for the first date in the dataset. (Inspect the array below to see the result.)`
)}

function _29(rank,datevalues){return(
rank(name => datevalues[0][1].get(name))
)}

function _30(md,duration,k){return(
md`Why bother with a *value* accessor function? Well, because we’re about to do something interesting. 🌶

Rank is an *ordinal* value: a brand can be rank 2 or 3, but never rank 2.345. In the source data, ranks change once per year. If we animated rank changes over the year (${(duration * k) / 100} seconds), many bars would move up or down simultaneously, making the race hard to follow. Hence we generate interpolated frames within the year to animate rank changes more quickly (${duration} milliseconds), improving readability.

Try disabling interpolation by setting *k* to 1 below, then scroll up to see how this affects the animation.`
)}

function _k(){return(
10
)}

function _32(md,tex){return(
md`Since our *rank* helper above takes a function, so we can use it to interpolate values [linearly](https://en.wikipedia.org/wiki/Linear_interpolation). If ${tex`a`} is the starting value and ${tex`b`} is the ending value, then we vary the parameter ${tex`t \in [0,1]`} to compute the interpolated value ${tex`a(1 - t) + bt`}. For any missing data—remember, turnover—we treat the value as zero.`
)}

function _keyframes(d3,datevalues,k,rank)
{
  const keyframes = [];
  let ka, a, kb, b;
  for ([[ka, a], [kb, b]] of d3.pairs(datevalues)) {
    for (let i = 0; i < k; ++i) {
      const t = i / k;
      keyframes.push([
        new Date(ka * (1 - t) + kb * t),
        rank(name => (a.get(name) || 0) * (1 - t) + (b.get(name) || 0) * t)
      ]);
    }
  }
  keyframes.push([new Date(kb), rank(name => b.get(name) || 0)]);
  return keyframes;
}


function _34(md,n){return(
md`The last data-processing step—we’re almost there!—is to prepare for enter and exit. An *enter* transition occurs when a brand enters the top ${n}, and an *exit* transition occurs when a brand exits the top ${n}.

For example, between 2001 and 2002, Toyota enters the top 12 (moving from rank 14 to 12) while AT&T exits the top 12 (moving from rank 10 to 17). When animating Toyota’s entrance, we need to know the rank that it was coming from (14), and similarly when animating AT&T’s exit, we need to know the rank it is going to (17).`
)}

function _nameframes(d3,keyframes){return(
d3.groups(keyframes.flatMap(([, data]) => data), d => d.name)
)}

function _prev(nameframes,d3){return(
new Map(nameframes.flatMap(([, data]) => d3.pairs(data, (a, b) => [b, a])))
)}

function _next(nameframes,d3){return(
new Map(nameframes.flatMap(([, data]) => d3.pairs(data)))
)}

function _38(md){return(
md`## Bars

Enough with the data. Let’s draw!`
)}

function _39(md){return(
md`The four chart components, starting with the bars here, are implemented as functions that are passed a [selection](https://github.com/d3/d3-selection) of the chart’s root SVG element. This function *initializes* the component, such as by adding a G element, and returns an *update* function which will be called repeatedly to implement transitions.`
)}

function _bars(n,color,y,x,prev,next){return(
function bars(svg) {
  let bar = svg.append("g")
      .attr("fill-opacity", 1)
    .selectAll("rect");

  return ([date, data], transition) => bar = bar
    .data(data.slice(0, n), d => d.name)
    .join(
      enter => enter.append("rect")
        .attr("fill", color)
        .attr("height", y.bandwidth())
        .attr("x", x(0))
        .attr("y", d => y((prev.get(d) || d).rank))
        .attr("width", d => x((prev.get(d) || d).value) - x(0)),
      update => update,
      exit => exit.transition(transition).remove()
        .attr("y", d => y((next.get(d) || d).rank))
        .attr("width", d => x((next.get(d) || d).value) - x(0))
    )
    .call(bar => bar.transition(transition)
      .attr("y", d => y(d.rank))
      .attr("width", d => x(d.value) - x(0)));
}
)}

function _41(md){return(
md`The update function applies a data-join: D3’s pattern for manipulating the DOM based on data. The key (the second argument to *selection*.data) is the *name*, ensuring that the data is bound consistently. We then use [*selection*.join](/@d3/selection-join) to handle enter, update and exit separately. As discussed above, when bars enter or exit, they transition from the *previous* value on enter or to the *next* value on exit.`
)}

function _42(md){return(
md`D3 allows you to minimize DOM changes to improve performance. Hence, any attribute that is shared by all bars is applied to the parent G element (fill-opacity). And any attribute that is constant for the life of a given bar but varies between bars is assigned on enter (fill, height, x). Hence, only the minimal set of attributes are transitioned (y, width). To avoid code duplication, enter and update transitions are shared using the merged result of *selection*.join.`
)}

function _43(md){return(
md`Each time the update function is called by the chart, we re-assign the *bar* selection to the result of *selection*.join, thereby maintaining the current selection of bars. We use [*selection*.call](https://github.com/d3/d3-selection/blob/master/README.md#selection_call) to initiate transitions without breaking the method chain.`
)}

function _44(md){return(
md`The parent *transition* is passed in by the chart, allowing the child transitions to inherit timing parameters.`
)}

function _45(md){return(
md`## Labels

As you might expect, the labels are implemented similarly to the bars.`
)}

function _labels(n,x,prev,y,next,textTween){return(
function labels(svg) {
  let label = svg.append("g")
      .style("font", "bold 12px var(--sans-serif)")
      .style("font-variant-numeric", "tabular-nums")
      .style("font-size","25px")
      .style("font-weight","bold")
      .attr("text-anchor", "end")
    .selectAll("text");

  return ([date, data], transition) => label = label
    .data(data.slice(0, n), d => d.name)
    .join(
      enter => enter.append("text")
        .attr("transform", d => `translate(${x((prev.get(d) || d).value)},${y((prev.get(d) || d).rank)})`)
        .attr("y", y.bandwidth() / 2)
        .attr("x", -6)
        .attr("dy", "-0.25em")
        .text(d => d.name)
        .call(text => text.append("tspan")
          .attr("fill-opacity", 0.7)
          .attr("font-weight", "normal")
          .attr("x", -6)
          .attr("dy", "1.15em")),
      update => update,
      exit => exit.transition(transition).remove()
        .attr("transform", d => `translate(${x((next.get(d) || d).value)},${y((next.get(d) || d).rank)})`)
        .call(g => g.select("tspan").tween("text", d => textTween(d.value, (next.get(d) || d).value)))
    )
    .call(bar => bar.transition(transition)
      .attr("transform", d => `translate(${x(d.value)},${y(d.rank)})`)
      .call(g => g.select("tspan").tween("text", d => textTween((prev.get(d) || d).value, d.value))))
}
)}

function _47(md){return(
md`There are two labels per bar: the name and the value; a TSPAN element is used for the latter. We set the *x* attribute of both elements so they are right-aligned, and use the *transform* attribute (and *y* and *dy*) to position text. (See the [SVG specification](https://www.w3.org/TR/SVG11/text.html#TextElement) for more on text elements.)`
)}

function _48(md){return(
md`D3 doesn’t transition text by default: this would require parsing human-readable numbers, and a cross-fade is often preferable. Fortunately we can transition text by assigning *element*.textContent in a [custom tween](https://github.com/d3/d3-transition/blob/master/README.md#transition_tween). This will be easier if the proposed [*transition*.textTween](https://github.com/d3/d3-transition/issues/91) is added.`
)}

function _textTween(d3,formatNumber){return(
function textTween(a, b) {
  const i = d3.interpolateNumber(a, b);
  return function(t) {
    this.textContent = formatNumber(i(t));
  };
}
)}

function _50(md){return(
md`Since the value labels change sixty times per second, we use [tabular figures](https://practicaltypography.com/alternate-figures.html#tabular-and-proportional-figures) to reduce jitter and improve readability. Try commenting out the [font-variant-numeric](https://drafts.csswg.org/css-fonts-3/#propdef-font-variant-numeric) style above to see its effect!`
)}

function _51(md){return(
md`The function below is used to [format](https://github.com/d3/d3-format) values as whole numbers. If you want decimal values, adjust accordingly.`
)}

function _formatNumber(d3){return(
d3.format(",d")
)}

function _53(md){return(
md`## Axis

Our *x*-axis is top-anchored and slightly customized.`
)}

function _axis(margin,d3,x,width,barSize,n,y){return(
function axis(svg) {
  const g = svg.append("g")
      .attr("transform", `translate(0,${margin.top})`);

  const axis = d3.axisTop(x)
      .ticks(width / 160)
      .tickSizeOuter(0)
      .tickSizeInner(-barSize * (n + y.padding()));

  return (_, transition) => {
    g.transition(transition).call(axis);
    g.select(".tick:first-of-type text").remove();
    g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "white");
    g.select(".domain").remove();
  };
}
)}

function _55(md){return(
md`Not much to say here. We use D3’s [margin convention](/@d3/chart-template). The suggested tick count is derived from Observable’s responsive [*width*](https://github.com/observablehq/stdlib/blob/master/README.md#width), so it works on both small and large screens. The tick size is negative so that the tick lines overlay the bars. And we use [post-selection](https://observablehq.com/@d3/styled-axes)—modifying the elements generated by the axis—to remove the domain path and change the tick line color.`
)}

function _56(md){return(
md`## Ticker

The “ticker” in the bottom-right corner shows the current date.`
)}

function _ticker(barSize,width,margin,n,formatDate,keyframes){return(
function ticker(svg) {
  const now = svg.append("text")
      .style("font", `bold ${barSize}px var(--sans-serif)`)
      .style("font-variant-numeric", "tabular-nums")
      .attr("text-anchor", "end")
      .style("font-size",  '80px')
      .style("font-weight",  'bold')
      .attr("x", width - 70)
      .attr("y", margin.top + barSize * (n - 0.45))
      .attr("dy", "0.32em")
      .text(formatDate(keyframes[0][0]));

  return ([date], transition) => {
    transition.end().then(() => now.text(formatDate(date)));
  };
}
)}

function _58(md){return(
md`The keyframe’s *date* represents the date at the *end* of the transition; hence, the displayed date is updated when the *transition*.end promise resolves.`
)}

function _59(md){return(
md`The function below is used to [format](https://github.com/d3/d3-time-format) dates as four-digit years. If you want a more precise display for shorter time periods, adjust as appropriate.`
)}

function _formatDate(d3){return(
d3.utcFormat("%Y")
)}

function _61(md){return(
md`## Color

That concludes our chart components! Only a few odds and ends left, such as this [ordinal scale](/@d3/d3-scaleordinal?collection=@d3/d3-scale) mapping from category name to color. I chose the Tableau10 [scheme](/@d3/color-schemes) because it is less saturated than Category10.`
)}

function _color(d3,data)
{
  const scale = d3.scaleOrdinal(d3.schemeTableau10);
  if (data.some(d => d.category !== undefined)) {
    const categoryByName = new Map(data.map(d => [d.name, d.category]))
    scale.domain(Array.from(categoryByName.values()));
    return d => scale(categoryByName.get(d.name));
  }
  return d => scale(d.name);
}


function _63(md){return(
md`This code adapts to the data: if the data defines a *category* field, this field determines the color; otherwise, the *name* field is used. This means your replacement data can omit the category field and you’ll still have varying color, making it easier to follow bars as they move up or down.`
)}

function _64(md){return(
md`I’ve assumed that the category for a given name never changes. If that’s not true of your data, you’ll need to change this scale implementation and implement fill transitions in the bar component above.`
)}

function _65(md){return(
md`## Position

The *x*-scale is linear. The chart mutates the domain as the animation runs.`
)}

function _x(d3,margin,width){return(
d3.scaleLinear([0, 1], [margin.left, width - margin.right])
)}

function _67(md,n){return(
md`The *y*-scale is a [band scale](/@d3/d3-scaleband?collection=@d3/d3-scale), but it’s a bit unusual in that the domain covers *n* + 1 = ${n + 1} ranks, so that bars can enter and exit.`
)}

function _y(d3,n,margin,barSize){return(
d3.scaleBand()
    .domain(d3.range(n + 1))
    .rangeRound([margin.top, margin.top + barSize * (n + 1 + 0.1)])
    .padding(0.1)
)}

function _69(md){return(
md`This chart’s also a little unusual in that the height is specified indirectly: it’s based on the *bar* height (below) and the number of bars (*n*). This means we can easily change the number of bars and the chart will resize automatically.`
)}

function _height(margin,barSize,n){return(
margin.top + barSize * n + margin.bottom
)}

function _barSize(){return(
70
)}

function _margin(){return(
{top: 50, right: 10, bottom: 6, left: 100}
)}

function _73(md){return(
md`## Libraries

We’re using d3@6 for its lovely new [d3.group](/@d3/d3-group) method.`
)}

function _d3(require){return(
require("d3@6")
)}

function _75(md){return(
md`Thanks for reading! 🙏

Please send any corrections or comments via [suggestion](/@observablehq/suggestions-and-comments), or let me know your thoughts and questions on [Twitter](https://twitter.com/mbostock).`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
  //   ["category-brands.csv", {url: new URL("./files/aec3792837253d4c6168f9bbecdf495140a5f9bb1cdb12c7c8113cec26332634a71ad29b446a1e8236e0a45732ea5d0b4e86d9d1568ff5791412f093ec06f4f1.csv", import.meta.url), mimeType: "text/csv", toString}]
  // ]);
  ["racing_bar_data.csv", {url: new URL("./files/racing_bar_data.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  // ["racing_bar_data_new.csv", {url: new URL("./files/racing_bar_data_new.csv", import.meta.url), mimeType: "text/csv", toString}]
  // ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer("md")).define(["md"], _1);
  main.variable().define("data", ["d3","FileAttachment"], _data);
  // main.variable(observer()).define(["md"], _3);
  main.variable(observer("viewof replay")).define("viewof replay", ["html"], _replay);
  main.variable().define("replay", ["Generators", "viewof replay"], (G, _) => G.input(_));
  main.variable(observer("title")).define("title", ["md"], _title);
  main.variable(observer("chart")).define("chart", ["replay","d3","width","height","bars","axis","labels","ticker","keyframes","duration","x","invalidation"], _chart);
  // main.variable(observer()).define(["md"], _7);
  // main.variable(observer()).define(["md"], _8);
  // main.variable(observer()).define(["md"], _9);
  main.variable().define("duration", _duration);
  // main.variable(observer()).define(["md"], _11);
  // main.variable(observer()).define(["md"], _12);
  // main.variable(observer()).define(["md"], _13);
  // main.variable(observer()).define(["data"], _14);
  // main.variable(observer()).define(["md"], _15);
  // main.variable(observer()).define(["d3","data"], _16);
  // main.variable(observer()).define(["md"], _17);
  // main.variable(observer()).define(["data"], _18);
  // main.variable(observer()).define(["md","n"], _19);
  main.variable().define("n", _n);
  // main.variable(observer()).define(["md"], _21);
  main.variable().define("names", ["data"], _names);
  // main.variable(observer()).define(["md"], _23);
  main.variable().define("datevalues", ["d3","data"], _datevalues);
  // main.variable(observer()).define(["md"], _25);
  // main.variable(observer()).define(["md"], _26);
  main.variable().define("rank", ["names","d3","n"], _rank);
  // main.variable(observer()).define(["md"], _28);
  main.variable().define(["rank","datevalues"], _29);
  main.variable().define(["md","duration","k"], _30);
  main.variable().define("k", _k);
  // main.variable(observer()).define(["md","tex"], _32);
  main.variable().define("keyframes", ["d3","datevalues","k","rank"], _keyframes);
  main.variable().define(["md","n"], _34);
  main.variable().define("nameframes", ["d3","keyframes"], _nameframes);
  main.variable().define("prev", ["nameframes","d3"], _prev);
  main.variable().define("next", ["nameframes","d3"], _next);
  // main.variable(observer()).define(["md"], _38);
  // main.variable(observer()).define(["md"], _39);
  main.variable().define("bars", ["n","color","y","x","prev","next"], _bars);
  // main.variable(observer()).define(["md"], _41);
  // main.variable(observer()).define(["md"], _42);
  // main.variable(observer()).define(["md"], _43);
  // main.variable(observer()).define(["md"], _44);
  // main.variable(observer()).define(["md"], _45);
  main.variable().define("labels", ["n","x","prev","y","next","textTween"], _labels);
  // main.variable(observer()).define(["md"], _47);
  // main.variable(observer()).define(["md"], _48);
  main.variable().define("textTween", ["d3","formatNumber"], _textTween);
  // main.variable(observer()).define(["md"], _50);
  // main.variable(observer()).define(["md"], _51);
  main.variable().define("formatNumber", ["d3"], _formatNumber);
  // main.variable(observer()).define(["md"], _53);
  main.variable().define("axis", ["margin","d3","x","width","barSize","n","y"], _axis);
  // main.variable(observer()).define(["md"], _55);
  // main.variable(observer()).define(["md"], _56);
  main.variable().define("ticker", ["barSize","width","margin","n","formatDate","keyframes"], _ticker);
  // main.variable(observer()).define(["md"], _58);
  // main.variable(observer()).define(["md"], _59);
  main.variable().define("formatDate", ["d3"], _formatDate);
  // main.variable(observer()).define(["md"], _61);
  main.variable().define("color", ["d3","data"], _color);
  // main.variable(observer()).define(["md"], _63);
  // main.variable(observer()).define(["md"], _64);
  // main.variable(observer()).define(["md"], _65);
  main.variable().define("x", ["d3","margin","width"], _x);
  // main.variable(observer()).define(["md","n"], _67);
  main.variable().define("y", ["d3","n","margin","barSize"], _y);
  // main.variable(observer()).define(["md"], _69);
  main.variable().define("height", ["margin","barSize","n"], _height);
  main.variable().define("barSize", _barSize);
  main.variable().define("margin", _margin);
  // main.variable(observer()).define(["md"], _73);
  main.variable().define("d3", ["require"], _d3);
  
  // main.variable(observer()).define(["md"], _75);
  return main;
}
