// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
var filters = {};

// 3. Use this function to update the filters. 
function updateFilters() {
  let datetime=d3.selectAll("#datetime").node().value;
  let city=d3.selectAll("#city").node().value;
  let state=d3.selectAll("#state").node().value;
  let country=d3.selectAll("#country").node().value;
  let shape=d3.selectAll("#shape").node().value;
  

    // 4a. Save the element that was changed as a variable.

    // 4b. Save the value that was changed as a variable.

    // 4c. Save the id of the filter that was changed as a variable.

  
    // 5. If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object.
    if (datetime){
      filters.datetime=datetime;
    } else {
      delete filters.datetime;
    }
    if (city){
      filters.city=city;
    } else {
      delete filters.city;
    }
    if (state){
      filters.state=state;
    } else {
      delete filters.state;
    }
    if (country){
      filters.country=country;
    } else {
      delete filters.country;
    }
    if (shape){
      filters.shape=shape;
    } else {
      delete filters.shape;
    }
 
  
    // 6. Call function to apply all filters and rebuild the table
    filterTable();
  
  }
  
  // 7. Use this function to filter the table when data is entered.
  function filterTable() {
  
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
    let filteredData=tableData.filter(item=>{
      // item = {datetime: '1/1/2010', city:'Chennai'}
      // filters = {datetime: '1/8/2010', city:'Chennai'}
      let keepRow = true;
      if (filters.datetime) {
        keepRow = filters.datetime === item.datetime;
      }
      if (keepRow && filters.city) {
        keepRow = filters.city === item.city;
      }
      if (keepRow && filters.state) {
        keepRow = filters.state  === item.state;
      }
      if (keepRow && filters.country) {
        keepRow = filters.country  === item.country;
      }
      if (keepRow && filters.shape) {
        keepRow = filters.shape  === item.shape;
      }

      return keepRow;
    })
  
    // 10. Finally, rebuild the table using the filtered data
    buildTable(filteredData);
    
  }
  
  // 2. Attach an event to listen for changes to each filter
d3.selectAll("#filter-btn").on("click", updateFilters);
  
  // Build the table when the page loads
  buildTable(tableData);
