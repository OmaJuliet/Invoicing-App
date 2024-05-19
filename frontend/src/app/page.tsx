'use client'
import Invoices from "../components/Invoices";
import { ModalsContextProvider } from "@/context/StateContext";


function App() {
    return (
        <ModalsContextProvider>
            <div className="p-5">
                <Invoices />
            </div>
        </ModalsContextProvider>
    );
}
export default App;
