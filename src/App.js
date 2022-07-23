import React, { useState, useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import Navbar from './components/Navbar';
import ArtistTable from './components/ArtistTable';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5000'
      : 'https://paystream-api.herokuapp.com';

  useEffect(() => {
    const fetchArtists = async () => {
      const response = await fetch(`${apiUrl}/artists`);
      setData(await response.json());
      setLoading(false);
    };

    fetchArtists();
  }, []);

  return (
    <>
      <Navbar />
      {loading ? (
        <Loader active />
      ) : (
        <ArtistTable apiUrl={apiUrl} artists={data} />
      )}
    </>
  );
}

export default App;
