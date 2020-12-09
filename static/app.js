
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

