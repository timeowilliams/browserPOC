import { useState, useEffect } from 'react';

export function App() {
  const [requestInfo, setRequestInfo] = useState(null);
  useEffect(() => {
    const longPollingRequest = async () => {
      console.log('invoking longPollingRequest')
      try {
        const response = await fetch('http://localhost:3000/long-polling');
        if (!response.ok) {
          throw new Error('Long polling request failed');
        }
        console.log('Response retrieved ', response)
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

  function cleanUrl(url) {
    const lastIndex = url.lastIndexOf('/undefined');
    if (lastIndex !== -1) {
      return url.slice(0, lastIndex);
    }
    return url;
  }

  const handleSendRequest = async () => {
    try {
      console.log('RequestInfo is', requestInfo)
      console.log('what are we fetching too? , requestInfo.url', requestInfo.url)
      if (requestInfo) {
        // Create and fire the API request using the information received from the server
        const response = await fetch(requestInfo.url, {
          method: requestInfo.method,
          headers: requestInfo.headers,
          mode: 'cors', // enable CORS
          credentials: 'include' // include cookies in the request
        });
        console.log('What is our response? ', response)
        if (response.ok) {
          const data = await response.text();
          console.log('User IP Address', window.location.hostname);
          console.log('Data is ', data);
        } else {
          throw new Error('API request failed');
        }
      }
    } catch (error) {
      console.log('Error in handleSendRequest, ',error);
    }
  };

  return (
    <div>
      <h1>Hello React</h1>
      <button onClick={handleSendRequest} disabled={!requestInfo}>Send API request</button>
    </div>
  );
}
