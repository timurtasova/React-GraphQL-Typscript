import { useQuery ,gql } from "@apollo/client";
import CountryList from "./components/CountryFilter";
import './App.css';

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      name
      languages {
        name
      }
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if(loading) return <h2 className="loading-message">Loading...</h2>;
  if(error) return <h2 className="error-message">Error: {error.message}</h2>

  return (
    <div className="app">
      <h1>React Countries App with Typescript & GraphQL</h1>
      <CountryList countries={data.countries} />
    </div>
  )
}

export default App
