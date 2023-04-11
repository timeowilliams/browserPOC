import { useState, useEffect } from 'react';

export function App() {
  const [requestInfo, setRequestInfo] = useState(null);
  console.log('Sanity Check')
  useEffect(() => {
    const longPollingRequest = async () => {
      try {
        const response = await fetch('/long-polling');
        if (!response.ok) {
          throw new Error('Long polling request failed');
        }
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new TypeError('Response is not JSON');
        }
        const data = await response.json();
        setRequestInfo(data);
      } catch (error) {
        console.log('Unexpected Error', error);
      }
    };

    longPollingRequest();
  }, []);

  const handleSendRequest = async () => {
    try {
      if (requestInfo) {
        // Create and fire the API request using the information received from the server
        const response = await fetch(requestInfo.url, {
          method: requestInfo.method,
          headers: requestInfo.headers,
          body: JSON.stringify(requestInfo.body),
          mode: 'cors', // enable CORS
          credentials: 'include' // include cookies in the request
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
        } else {
          throw new Error('API request failed');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Hello React</h1>
      <button onClick={handleSendRequest} disabled={!requestInfo}>Send API request</button>
    </div>
  );
}
