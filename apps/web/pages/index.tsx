import React, { useState } from 'react';
import axios from 'axios';

const MyPage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [response, setResponse] = useState<any | undefined>();
  const [status, setStatus] = useState('toDo');
  const [error, setError] = useState<any>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setResponse(null); // clear previous response

    try {
      const response = await axios.post(`/api/ai/query`, { prompt: inputValue, statusCategoy: status });
      const data = await response.data;

      setResponse(data);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '100px'
      }}>
      <h1>Jira Assistant</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="radio"
            id="toDo"
            name="status"
            value="toDo"
            checked={status === 'toDo'}
            onChange={handleStatusChange}
          />
          <label htmlFor="toDo">To Do</label>
          <input
            type="radio"
            id="done"
            name="status"
            value="Done"
            checked={status === 'done'}
            onChange={handleStatusChange}
          />
          <label htmlFor="done">Done</label>
        </div>
        <label>
          Question:
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            style={{ margin: '10px', width: '500px' }}
          />
        </label>
        <button type="submit" style={{ margin: '10px' }}>
          Submit
        </button>
      </form>
      {response && (
        <>
          <div style={{ marginTop: '20px' }}>
            <label>Answer:</label>
            <textarea value={response.answer} readOnly={true} cols={100} rows={5} style={{ margin: '10px' }} />
          </div>
          <div style={{ marginTop: '20px' }}>
            <label>Context:</label>
            <textarea value={response.context} readOnly={true} cols={100} rows={10} style={{ margin: '10px' }} />
          </div>
          <div style={{ marginTop: '20px' }}>
            <label>Pinecone Data:</label>
            <textarea
              value={JSON.stringify(response.pineconeData, null, 4)}
              readOnly={true}
              cols={100}
              rows={20}
              style={{ margin: '10px' }}
            />
          </div>
        </>
      )}
      {error && (
        <div style={{ marginTop: '20px', maxWidth: '80%' }}>
          <label>Error:</label>
          <pre>{JSON.stringify(error, null, 4)}</pre>
        </div>
      )}
    </div>
  );
};

export default MyPage;
