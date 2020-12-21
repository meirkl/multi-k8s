import React from 'react';
import axios from 'axios';

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = React.useState([]);
  const [values, setValues] = React.useState({});
  const [index, setIndex] = React.useState('');
  const [didSubmit, setDidSubmit] = React.useState(false);

  React.useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);

  React.useEffect(() => {
    if (didSubmit) {
      fetchValues();
      fetchIndexes();
      setDidSubmit(false);
    }
  }, [didSubmit]);

  async function fetchValues() {
    const values = await axios.get('/api/values/current');
    setValues(values.data);
  }

  async function fetchIndexes() {
    const seenIndexes = await axios.get('/api/values/all');
    setSeenIndexes(seenIndexes.data);
  }

  const handleSubmit = async event => {
    event.preventDefault();

    await axios.post('/api/values', { index });
    setIndex('');
    setDidSubmit(true);
  };

  const renderSeenIndexes = () => {
    return seenIndexes.map(({ number }) => number).join(', ');
  };

  const renderValues = () => {
    const entries = [];

    for (const key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      );
    }

    return entries;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Enter your index:</label>
        <input value={index} onChange={e => setIndex(e.target.value)} />
        <button>Submit</button>
      </form>

      <h3>Indexes I have seen</h3>
      {renderSeenIndexes()}

      <h3>Calculated Values</h3>
      {renderValues()}
    </div>
  );
};

export default Fib;
