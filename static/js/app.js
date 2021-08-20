function show_charts(select_data){
    d3.json("samples.json").then ((data)=> {
    selected_id = data.samples.filter(sample => sample.id == select_data)
    selected_id = selected_id[0]
    console.log(selected_id)
    var bar_data = [
        {
          x: selected_id.sample_values.slice(0,10).reverse(),
          y: selected_id.otu_ids.map(el => "OTU " + el).slice(0,10).reverse(),
          text: selected_id.otu_labels.slice(0,10).reverse(),
          type: 'bar',
          orientation: 'h'
        }
      ];
      var barlayout={
          title: "Top Ten OTUs"
      }
      Plotly.newPlot('bar', bar_data, barlayout)
    var bubble_data = [
        {
          x: selected_id.otu_ids,
          y: selected_id.sample_values,
          text: selected_id.otu_labels,
          mode: "markers",
          marker: {
              size: selected_id.sample_values,
              color: selected_id.otu_ids,
              text: selected_id.otu_labels,
          }
        }
      ];
      var bubble_layout={
          title: "Top Ten OTUs"
      }
      Plotly.newPlot('bubble', bubble_data, bubble_layout)
      //demographics = data.metadata.filter(sample => sample.id == select_data)
      //demographics = demographics[0]
      //console.log(demographics)
      //Plotly.newPlot('sample-metadata', demographics)
    })
}
// Fetch the JSON data and console log it
d3.json("samples.json").then ((data)=> {
dropdown=d3.select("#selDataset")
    console.log(data);
data.names.forEach(element => {
    dropdown.append("option").text(element).property("value",element)
});
    show_charts(data.names[0])
});
function optionChanged(select_data){
    console.log(select_data)
    show_charts(select_data)
}