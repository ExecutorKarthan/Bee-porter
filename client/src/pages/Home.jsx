import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_SWARMS } from '../utils/queries';
import MapComponent from '../components/mapComponent';

const Home = () => {
  // Query data for bee swarms
  const { loading, data } = useQuery(GET_SWARMS, {
    fetchPolicy: 'no-cache'
  });

  // Extract swarm list from the query result
  const swarmList = data?.swarms || [];

  return (
    <div className="container">
      <div className="jumbotron text-center">
        <h1 className="heading">Welcome to Bee Porter!</h1>
        <p>Track and report bee swarms in your area.</p>
      </div>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h2>Here is a list of bee swarms you can explore:</h2>
          {/* {loading ? (
            <div>Loading...</div>
          ) : (
            <ul className="list-group">
              {swarmList.map((swarm) => {
                return (
                  <li key={swarm._id} className="list-item">
                    <Link to={{ pathname: `/swarm/${swarm._id}` }} className="link">
                      {swarm.location} - {swarm.date}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )} */}
        </div>
      </div>
      <div className="row">
        <div className="col-md-8 offset-md-2 text-center mt-5">
          <h2>Ready to report a new bee swarm?</h2>
          <MapComponent />
        </div>
      </div>
    </div>
  );
};

export default Home;
