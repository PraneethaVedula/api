import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' }
];

function App() {
    const [jsonData, setJsonData] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async () => {
        try {
            // Validate JSON format
            const parsedData = JSON.parse(jsonData);
            if (!Array.isArray(parsedData.data)) {
                throw new Error('Invalid data format. Expected an array.');
            }
            setError('');
            // Send POST request to the backend
            const res = await axios.post('https://bajajfinservbackend-i7ivwctib-srujana-kurris-projects.vercel.app/bfhl', {
                data: parsedData.data
            });
            setResponse(res.data);
        } catch (e) {
            setError(e.response?.data?.error || 'Invalid JSON format or API error');
            setResponse(null);
        }
    };

    const renderResponse = () => {
        if (!response) return null;
        const selectedValues = selectedOptions.map(option => option.value);
        const filteredData = {};

        if (selectedValues.includes('alphabets')) {
            filteredData.alphabets = response.alphabets;
        }
        if (selectedValues.includes('numbers')) {
            filteredData.numbers = response.numbers;
        }
        if (selectedValues.includes('highest_lowercase_alphabet')) {
            filteredData.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
        }

        return (
            <div>
                <h2>Response:</h2>
                <pre>{JSON.stringify(filteredData, null, 2)}</pre>
            </div>
        );
    };

    useEffect(() => {
        document.title = '21BCE7753';
    }, []);

    return (
        <div className="App">
            <h1>21BCE7753</h1>
            <textarea
                value={jsonData}
                onChange={(e) => setJsonData(e.target.value)}
                placeholder="Enter JSON"
                rows="10"
                cols="30"
            />
            <button onClick={handleSubmit}>Submit</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {response && (
                <div>
                    <Select
                        isMulti
                        options={options}
                        onChange={setSelectedOptions}
                        placeholder="Select options"
                    />
                    {renderResponse()}
                </div>
            )}
        </div>
    );
}

export default App;

// document.addEventListener("DOMContentLoaded", function() {
//     const filterDropdown = document.getElementById("filter-dropdown");
//     const resultsDiv = document.getElementById("results");
  
//     async function applyFilter() {
//       const selectedFilter = filterDropdown.value;
  
//       if (!selectedFilter) {
//         resultsDiv.innerHTML = "Please select a filter.";
//         return;
//       }
  
//       try {
//         const response = await fetch('http://localhost:3000/bfhl', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             data: selectedFilter === 'numbers' ? ['1', '2', '3', 'a'] : ['a', 'b', 'c', '1']
//           })
//         });
  
//         const result = await response.json();
//         resultsDiv.innerHTML = JSON.stringify(result, null, 2);
//       } catch (error) {
//         resultsDiv.innerHTML = "Error fetching data: " + error.message;
//       }
//     }
  
//     window.applyFilter = applyFilter;
//   });
  
