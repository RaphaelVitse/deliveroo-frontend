import { useState, useEffect } from "react";
import Header from "./components/Header";
import logo from "./assets/logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "site--deliveroo-backend--2652jln5dkl6.code.run"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        // res.status(500).json({ error: error.message });
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <>
      <Header logo={logo} />
      <main className="container">
        <h2>{data.restaurant.name}</h2>
      </main>
    </>
  );
}

export default App;
