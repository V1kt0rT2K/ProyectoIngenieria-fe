import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import ClientOptions from "../../components/ClientOptions";

const testClients = [
    { idClient: 1001, name: "Ana Martínez", contact: "504-9854-1234", pendingBalance: 320.50, paidBalance: 1500.00 },
    { idClient: 1002, name: "Carlos Gómez", contact: "504-9978-4567", pendingBalance: 0.00, paidBalance: 875.75 },
    { idClient: 1003, name: "Lucía Torres", contact: "504-9234-8899", pendingBalance: 120.00, paidBalance: 980.50 },
    { idClient: 1004, name: "Jorge Ramírez", contact: "504-9845-6712", pendingBalance: 750.25, paidBalance: 300.00 },
    { idClient: 1005, name: "Sofía Mendoza", contact: "504-9456-7788", pendingBalance: 0.00, paidBalance: 2200.00 },
    { idClient: 1006, name: "Pedro Sánchez", contact: "504-9966-4455", pendingBalance: 215.10, paidBalance: 1025.40 },
    { idClient: 1007, name: "Marta Cruz", contact: "504-9123-3344", pendingBalance: 50.75, paidBalance: 430.90 },
    { idClient: 1008, name: "Luis Rivera", contact: "504-9876-1122", pendingBalance: 0.00, paidBalance: 1650.00 },
    { idClient: 1009, name: "Elena Ríos", contact: "504-9345-2288", pendingBalance: 340.90, paidBalance: 700.00 },
    { idClient: 1010, name: "Héctor Valle", contact: "504-9787-9900", pendingBalance: 89.00, paidBalance: 1345.60 },
    { idClient: 1011, name: "Gloria Pérez", contact: "504-9200-5566", pendingBalance: 120.00, paidBalance: 900.00 },
    { idClient: 1012, name: "Daniel Fuentes", contact: "504-9300-7788", pendingBalance: 0.00, paidBalance: 2100.00 },
    { idClient: 1013, name: "Brenda Orellana", contact: "504-9100-2244", pendingBalance: 410.20, paidBalance: 430.00 },
    { idClient: 1014, name: "Marco Soto", contact: "504-9855-6677", pendingBalance: 0.00, paidBalance: 1025.25 },
    { idClient: 1015, name: "Raquel Duarte", contact: "504-9455-8899", pendingBalance: 780.30, paidBalance: 640.40 },
    { idClient: 1016, name: "Oscar Barahona", contact: "504-9999-1122", pendingBalance: 250.00, paidBalance: 0.00 },
    { idClient: 1017, name: "Jessica Aguilar", contact: "504-9222-3344", pendingBalance: 85.60, paidBalance: 1345.90 },
    { idClient: 1018, name: "Jonathan Mejía", contact: "504-9888-4455", pendingBalance: 190.75, paidBalance: 925.10 },
    { idClient: 1019, name: "Flor Zepeda", contact: "504-9777-5566", pendingBalance: 0.00, paidBalance: 1180.00 },
    { idClient: 1020, name: "René Navarro", contact: "504-9666-6677", pendingBalance: 630.50, paidBalance: 400.00 },
    { idClient: 1021, name: "Andrea Pineda", contact: "504-9111-7788", pendingBalance: 400.00, paidBalance: 800.00 },
    { idClient: 1022, name: "Iván Salinas", contact: "504-9555-8899", pendingBalance: 0.00, paidBalance: 1300.50 },
    { idClient: 1023, name: "Carmen Núñez", contact: "504-9222-9900", pendingBalance: 220.00, paidBalance: 660.30 },
    { idClient: 1024, name: "Julio Amador", contact: "504-9001-1234", pendingBalance: 0.00, paidBalance: 950.00 },
    { idClient: 1025, name: "Laura Perdomo", contact: "504-9888-2345", pendingBalance: 150.45, paidBalance: 400.00 },
    { idClient: 1026, name: "Mario Ayala", contact: "504-9777-3456", pendingBalance: 0.00, paidBalance: 1110.00 },
    { idClient: 1027, name: "Nora Zelaya", contact: "504-9666-4567", pendingBalance: 670.00, paidBalance: 130.00 },
    { idClient: 1028, name: "Erick Paz", contact: "504-9555-5678", pendingBalance: 0.00, paidBalance: 1800.00 },
    { idClient: 1029, name: "Pamela Andrade", contact: "504-9444-6789", pendingBalance: 305.75, paidBalance: 210.00 },
    { idClient: 1030, name: "Alfredo Molina", contact: "504-9333-7890", pendingBalance: 50.00, paidBalance: 750.25 },
    { idClient: 1031, name: "Gabriela Reyes", contact: "504-9222-8901", pendingBalance: 130.90, paidBalance: 880.00 },
    { idClient: 1032, name: "Francisco Rivas", contact: "504-9111-9012", pendingBalance: 800.00, paidBalance: 300.00 },
    { idClient: 1033, name: "Estela Cálix", contact: "504-9000-1123", pendingBalance: 270.25, paidBalance: 1220.50 },
    { idClient: 1034, name: "Rodrigo Castro", contact: "504-9888-2234", pendingBalance: 95.00, paidBalance: 740.00 },
    { idClient: 1035, name: "Natalia Figueroa", contact: "504-9777-3345", pendingBalance: 180.00, paidBalance: 1340.80 },
    { idClient: 1036, name: "Diego Matamoros", contact: "504-9666-4456", pendingBalance: 0.00, paidBalance: 900.00 },
    { idClient: 1037, name: "Patricia Guerra", contact: "504-9555-5567", pendingBalance: 420.00, paidBalance: 620.00 },
    { idClient: 1038, name: "Manuel Lobo", contact: "504-9444-6678", pendingBalance: 310.10, paidBalance: 410.90 },
    { idClient: 1039, name: "Silvia Andino", contact: "504-9333-7789", pendingBalance: 0.00, paidBalance: 1550.75 },
    { idClient: 1040, name: "Armando Zelaya", contact: "504-9222-8890", pendingBalance: 290.00, paidBalance: 750.00 },
    { idClient: 1041, name: "Iris Moreno", contact: "504-9111-9901", pendingBalance: 120.20, paidBalance: 990.00 },
    { idClient: 1042, name: "Kevin Portillo", contact: "504-9000-1012", pendingBalance: 360.00, paidBalance: 560.00 },
    { idClient: 1043, name: "Liliana Ramos", contact: "504-9888-2123", pendingBalance: 0.00, paidBalance: 1430.00 },
    { idClient: 1044, name: "Emilio Guardado", contact: "504-9777-3234", pendingBalance: 140.00, paidBalance: 920.00 },
    { idClient: 1045, name: "Alejandra Bonilla", contact: "504-9666-4345", pendingBalance: 520.00, paidBalance: 100.00 },
    { idClient: 1046, name: "Tomás Murillo", contact: "504-9555-5456", pendingBalance: 0.00, paidBalance: 1600.00 },
    { idClient: 1047, name: "Isabel Cornejo", contact: "504-9444-6567", pendingBalance: 230.00, paidBalance: 510.10 },
    { idClient: 1048, name: "Nelson Coto", contact: "504-9333-7678", pendingBalance: 305.00, paidBalance: 200.00 },
    { idClient: 1049, name: "Fátima Rosales", contact: "504-9222-8789", pendingBalance: 0.00, paidBalance: 1740.90 },
    { idClient: 1050, name: "Renata Sandoval", contact: "504-9111-9890", pendingBalance: 110.00, paidBalance: 890.00 }
];

const N_TOTAL_ROWS = testClients.length;

const ClientsPage = () => {
    const [loading, setLoading] = useState(true);

    const [searchBox, setSearchBox] = useState(null);
    const [size, setSize] = useState(15);
    const [page, setPage] = useState(1);

    const [clients, setClients] = useState([]);

    useEffect(() => {
        setLoading(true);

        setClients(testClients.slice(size * (page - 1), page * size));
        setTimeout(() => setLoading(false), 1000);
    }, [page]);

    return (
        <>
            <div style={{ height: "80vh" }} className="flex flex-col pt-8">
                <div className="flex flex-col items-start">
                    <div className="flex w-full space-x-24">
                        <input value={searchBox} onInput={(e) => { }} className="focus:outline-none flex-grow border border-orange-700 rounded py-1 px-3 text-md" type="text" placeholder="Filtrar clientes" />
                        <Link to="" className="bg-orange-800 mx-2 px-4 py-1 flex items-center justify-center text-lg text-white font-semibold rounded hover:cursor-pointer">+ Registar cliente</Link>
                    </div>
                </div>
                <p className="mt-6 text-lg text-orange-800 font-semibold underline">Clientes mayoristas</p>
                <div style={{ width: "75vw" }} className={`rounded mt-2 mb-6 flex overflow-y-scroll ${loading ? "" : "border border-orange-700 bg-orange-200"}`}>
                    {
                        loading
                            ? <Spinner loading={loading} />
                            : (
                                <table className="flex-grow w-full table-auto justify-self-center">
                                    <thead>
                                        <tr>
                                            <th className="border border-orange-900 bg-orange-700 text-white w-48 px-2">Nombre</th>
                                            <th className="border border-orange-900 bg-orange-700 text-white w-48 px-2">Contacto</th>
                                            <th className="border border-orange-900 bg-orange-700 text-white w-32 px-2">Saldo pendiente</th>
                                            <th className="border border-orange-900 bg-orange-700 text-white w-32 px-2">Saldo pagado</th>
                                            <th className="border border-orange-900 bg-orange-700 text-white w-32 px-2"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            clients
                                                .map((client, idx) =>
                                                    <tr key={idx}>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">{client.name}</td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">{client.contact}</td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">{client.pendingBalance}</td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">{client.paidBalance}</td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md"><ClientOptions id={client.idClient} /></td>
                                                    </tr>
                                                )
                                        }
                                    </tbody>
                                </table>
                            )
                    }
                </div>
                {
                    !loading
                    && (
                        <div className="flex justify-center space-x-4">
                            {
                                [...Array(Math.floor(N_TOTAL_ROWS / size)).keys()].map(n =>
                                    <button
                                        className={`text-orange-800 ${page == n + 1 ? "font-extrabold bg-orange-400 rounded px-1" : ""}`}
                                        onClick={() => { setPage(n + 1); }}
                                    >
                                        {n + 1}
                                    </button>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </>
    );
};

export default ClientsPage;