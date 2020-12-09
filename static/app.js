
// URL/Path
const dataUrl = "/data/samples.json";

// Read in Data from samples.json
    console.log(`dataUrl: ${dataUrl}`,data);
});

// Demographic information
function dataDemoInfo(subjectID){

    //Needed to change to an integer
    subjectID = parseInt(subjectID);

    // select info panel
    let demoInfo = d3.select("#sample-metadata");

    // clear existing data on the panel
    demoInfo.html("");

    // Gathering data information
    d3.json(dataUrl).then(data => {

        let metadata = data.metadata;
        // console.log("metadata",metadata); #Checking console.logs

        // returns the index & info
        let filterMetadata = metadata[metadata.findIndex(element => element.id === subjectID)];

        // console.log("filterMetadata:",filterMetadata); # More checking

        // Object.entries() returns array of give objects bu key/value
        Object.entries(filterMetadata).forEach(([key,value]) => {

            // append the items via key pairs
            demoInfo.append("p")
                .text(`${key}: ${value}`);
        }); 
    }); 
};  

// Creating the sample charts

function sampleCharts(subjectID){
    // console.log("chart subjectID",subjectID); #checking with console.log

    // Collect data for subjectID
    d3.json(dataUrl).then(data => {
       
        let samples = data.samples;
        // console.log("samples data:",samples); #More checking

        let filterSamples = samples[samples.findIndex(element => element.id === subjectID)];
        // console.log("filterSamples:",filterSamples); # Checking

        // Getting the arrays
        let otuIDs = filterSamples.otu_ids;
        let otuLabels = filterSamples.otu_labels;
        let sampleValues = filterSamples.sample_values;

// Bar Chart Portion

        // Top 10 data
        let bar_xData = sampleValues.slice(0,10).reverse();
        let bar_yData = otuIDs.slice(0,10).reverse();
        let bar_textData = otuLabels.slice(0,10).reverse();

        // Create trace for data
        let barData = [{
            type:"bar",
            orientation:"h",
            x: bar_xData,
            y: bar_yData
                .map(id => `OTU ${id}`),
            text: bar_textData            
        }];

        // Layout portion
        let barLayout = {
            title: "<b>Top 10 Operational Taxonomic Units</b>",
            xaxis: {title: "Sample Values"}
        };

        // Plotting to div
        Plotly.newPlot("bar",barData,barLayout);

 // Gauge Chart! Hey that's my name!

        // Get the wash frequency
        let metadata = data.metadata;
        let washFreq = metadata[metadata.findIndex(element => element.id === parseInt(subjectID))].wfreq;
        // console.log("wash frequency",washFreq); #checking

        // Create Trace for Data
        let gaugeData = [{
            domain: {
                x: [0,1],
                y: [0,1]
            },
            value: washFreq,
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: {range: [null,9]},
                steps: [
                    {range: [0,1], color: "#fffceb"},
                    {range: [1,2], color: "#f2edd0"},
                    {range: [2,3], color: "#f2f0b6"},
                    {range: [3,4], color: "#e9f2b6"},
                    {range: [4,5], color: "#dcf2b6"},
                    {range: [5,6], color: "#b2d483"},
                    {range: [6,7], color: "#91d483"},
                    {range: [7,8], color: "#69a865"},
                    {range: [8,9], color: "#5b8c58"}
                ],
                bar: {color: "#c70606"}
            }
        }];
        // Layout Portion
        let gaugeLayout = {
            title: "<b>Washing Frequency</b><br>Scrubs per Week"
        };
        
        Plotly.newPlot("gauge",gaugeData,gaugeLayout);

// Bubble Chart portion

        // Create Trace
        let bubbleData = [{
            mode: "markers",
            x: otuIDs,
            y: sampleValues,
            marker: {
                size: sampleValues,
                color: otuIDs,
                colorscale: "Picnic" //https://plotly.com/javascript/colorscales/
            },
            text: otuLabels
        }];
        // Layout step
        let bubbleLayout = {
            title: "<b>All Operational Taxonomic Units</b>",
            xaxis: {title: "OTU ID"},
        };

        // Plot to div
        Plotly.newPlot("bubble",bubbleData,bubbleLayout);

    }); 
};  