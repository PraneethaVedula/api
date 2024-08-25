document.addEventListener("DOMContentLoaded", function() {
    const filterDropdown = document.getElementById("filter-dropdown");
    const resultsDiv = document.getElementById("results");
  
    async function applyFilter() {
      const selectedFilter = filterDropdown.value;
  
      if (!selectedFilter) {
        resultsDiv.innerHTML = "Please select a filter.";
        return;
      }
  
      try {
        const response = await fetch('http://localhost:3000/bfhl', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: selectedFilter === 'numbers' ? ['1', '2', '3', 'a'] : ['a', 'b', 'c', '1']
          })
        });
  
        const result = await response.json();
        resultsDiv.innerHTML = JSON.stringify(result, null, 2);
      } catch (error) {
        resultsDiv.innerHTML = "Error fetching data: " + error.message;
      }
    }
  
    window.applyFilter = applyFilter;
  });
  
