import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SWARM } from '../utils/queries'; 

const Home = () => {
  const { loading, data } = useQuery(QUERY_SWARM, {
    fetchPolicy: "no-cache"
  });

  const swarmList = data?.swarms || [];

  return (
    <div className="container">
      <div className="jumbotron text-center">
        <h1>Welcome to Bee Porter!</h1>
        <p>Track and report bee swarms in your area.</p>
      </div>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h2>Here is a list of bee swarms you can explore:</h2>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ul className="list-group">
              {swarmList.map((swarm) => {
                return (
                  <li key={swarm._id} className="list-group-item">
                    <Link to={{ pathname: `/swarm/${swarm._id}` }}>
                      {swarm.location} - {swarm.date}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-md-8 offset-md-2 text-center mt-5">
          <h2>Ready to report a new bee swarm?</h2>
          <Link to="/report">
            <button className="btn btn-lg btn-primary">Report Bee Swarm</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
