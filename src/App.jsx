import "./config/connecion"
import "@radix-ui/themes/styles.css";
import Layout from "./components/Layout";
import InitiateTransaction from "./components/InitiateTransaction";
import Transactions from "./components/Transactions";
import OwnerPage from "./components/OwnerPage";
import { Route, Routes } from "react-router-dom";
import NewOwnerPage from "./components/NewOwnerPage";
import Home from "./components/Home";

function App() {

  const renderRoutes = () => (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/transactions" element={<Transactions/>}/>
      <Route path="/ownerPage" element={<OwnerPage/>}/>
      <Route path="/newOwnerPage" element={<NewOwnerPage/>}/>
    </Routes>
  )


  return (
   <>
      <Layout>

        {renderRoutes()}

      </Layout>
   </>
  )
}

export default App
