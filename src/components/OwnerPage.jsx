import { Text, Button } from "@radix-ui/themes"
import Signers from "./Signers"
import AddASigner from "./AddASigner"
import { useMultisig } from "../context/MultisigContext"
import { Link } from "react-router-dom"
// const signers = [
//     "0x7tr233932983t97t473473463436",
//     "0x5675795039289032532320939333",
//     "0x846633932983t97t473473463436",
//     "0x97r233932983t97t473473463436",
//     "0x384233932983t97t473473463436",
// ]
const OwnerPage = () => {
    const { signers } = useMultisig();
  return (
    <div className="w-full flex flex-col gap-4">
            <AddASigner/>
            <Text as="h1" className="text-3xl font-semibold text-[#e5e5e6ff]">Signers</Text>
            <section className="w-full grid lg:grid-cols-3 md:grid-cols-2 md:gap-6 gap-4">
                {
                    signers.length === 0 ?
                        <Text as="h1" className="text-2xl font-medium text-stone-200">There are no Signers</Text> :
                        signers.map((signer, index) => (<Signers key={index} signer={signer} index={index} />))
                }
            </section>
            <Link to={"/transactions"}>
                <Button>Transactions</Button>
            </Link>
            

    </div>
  )
}

export default OwnerPage
