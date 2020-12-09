
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

