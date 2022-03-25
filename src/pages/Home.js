import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <ul>
      <li>
        <Link to="/About">ABOUT</Link>
      </li>
      <li>
        <Link to="/Projects">PROJECT</Link>
      </li>
    </ul>
  );
};

export default Home;
