import React, { useState } from 'react';

function NumberRequestForm() {
    const [numberId, setNumberId] = useState('');
    const [result, setResult] = useState(null);
    const fetchNumbers=(e) => {
        e.preventDefault();
        console.log("Number ID:", numberId);

        fetch(`http://localhost:9876/numbers/${numberId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log("Fetched Data:", data);
                setResult(data);
            })
            .catch(error => {
                console.error('Error:', error);
                // Update state to indicate an error occurred, for example:
                setResult({ error: 'An error occurred while fetching data.' });
            });
    };

    return (
        <div>
            <form onSubmit={fetchNumbers}>
                <label>
                    Enter Number ID:
                    <input
                        type="text"
                        value={numberId}
                        onChange={(e) => setNumberId(e.target.value)}
                        placeholder="e.g., 'p', 'f', 'e', 'r'"
                    />
                </label>
                <button type="submit">Fetch Numbers</button>
            </form>

            {result && (
                <div>
                    <h3>Average: {result.avg}</h3>
                    <p>Current Window State: {result.windowCurreState && result.windowCurreState.join(', ')}</p>
                    <p>Previous Window State: {result.windowPrevState && result.windowPrevState.join(', ')}</p>
                    <p>Fetched Numbers: {result.numbers && result.numbers.join(', ')}</p>
                </div>
            )}

        </div>
    );
}

export default NumberRequestForm;