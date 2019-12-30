/* Pie Chart */
// Structure and path update adapted from Adam Jane 
// https://bl.ocks.org/adamjanes/5e53cfa2ef3d3f05828020315a3ba18c/22619fa86de2045b6eeb4060e747c5076569ec47 

const width2 = 250;
const height2 = 250;
const radius = Math.min(width2, height2) / 2;


const svg2 = d3.select("#donut")
    .append("svg")
    .attr("width", width2)
    .attr("height", height2)
    .append("g")
    .attr("transform", `translate(${width2 / 2}, ${height2 / 2})`);

const color = d3.scaleOrdinal().range(["#ccffcc", "#ffb3b3", "#b3e6ff", "#fdfd96"]);

const pie = d3.pie()
    .value(d => d.count)
    .sort(null);

const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

function arcTween(a) {
    const i = d3.interpolate(this._current, a);
    this._current = i(1);
    return (t) => arc(i(t));
}