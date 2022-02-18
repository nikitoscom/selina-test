import { Link } from "react-router-dom";

export default function Home({ locations }) {
  return (
    <footer>
      {locations.map((location) => {
        return <Link to={`/id/${location.id}`}>{location.name}</Link>;
      })}
    </footer>
  );
}
