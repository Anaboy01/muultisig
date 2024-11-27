import "./config/connecion"
import "@radix-ui/themes/styles.css";
import Layout from "./components/Layout";
import InitiateTransaction from "./components/InitiateTransaction";
import Transactions from "./components/Transactions";
import OwnerPage from "./components/OwnerPage";

function App() {


  return (
   <>
      <Layout>
        {/* <InitiateTransaction/>
        <Transactions/> */}
        <OwnerPage/>

      </Layout>
   </>
  )
}

export default App
