import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import toast, { Toaster } from 'react-hot-toast';
import dayjs from "dayjs";
import Pagination from "react-js-pagination";
import AdminService from "../../utils/service/AdminService";
import BackButton from "../../components/BackButton";


const NewRangeModal = ({ isOpen, onClose, idCaiCode}) => {
  if (!isOpen) return null;

  const [newRange, setNewRange] = useState(0);

  const generateNewRange = () => {
    const payload = {
        idCaiCode : idCaiCode,
        newRange : newRange
    }

    AdminService.generateNewCaiCodeRange(payload).then(response =>{
        if(!response.hasError){
            toast.success("Nuevo rango creado con éxito.");
            onClose();

            setTimeout(()=>{window.location.reload()},1000);

        }else{
            toast.error(response.meta.message);
        }
    });
  }

  return (
    <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}
    onClick={onClose}
  >
    <div
      style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        position: 'relative',
        width: '80%', // Añade un ancho máximo
        maxWidth: '400px', // Ancho máximo para no hacerlo muy ancho
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Centra horizontalmente los elementos hijos
        gap: '20px', // Espacio uniforme entre elementos
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className='flex flex-col justify-center w-full'> 
        <p className="text-center my-5">Ingrese la cantidad de facturas para el nuevo rango:</p>
        <input 
            type="number"
            value={newRange}
            onChange={(e)=>{setNewRange(e.target.value)}}
        >
        </input>
      </div>

      <div className="flex my-3 gap-2">
        <button
          className="flex-grow justify-center block px-4 py-2 font-semibold text-md text-white bg-orange-800 hover:cursor-pointer hover:bg-orange-900"
          onClick={() => {generateNewRange()}}
        >
          Generar Nuevo Rango
        </button>
      </div>

      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'none',
          border: 'none',
          fontSize: '1.2em',
          cursor: 'pointer',
        }}
      >
        &times;
      </button>
    </div>
  </div>
  );
};


const CaiCodesPage = () => {
    const [loading, setLoading] = useState(true);
    const [codeRanges, setCodeRanges] = useState([]);

    const [isActive, setIsActive] = useState("2");

    const [totalItems, setTotalItems] = useState(0);
    const [sort, setSort] = useState("0");
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(4);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    useEffect(() => {
        AdminService.getAllRangesByActiveStatus(isActive,page,size,sort).then(response =>{
            if(!response.hasError){
                setCodeRanges(response.data.data);
                setTotalItems(response.data.totalItems);
            }
        }).finally(() =>{
            setLoading(false);
        });

    }, []);

    useEffect(() => {
        setLoading(true);
        AdminService.getAllRangesByActiveStatus(isActive,page, size, sort).then(response => {
            if (!response.hasError) {
                setCodeRanges(response.data.data);
                setTotalItems(response.data.totalItems);

            }else{
                toast.error(response.meta.message);
                setCodeRanges([]);
            }
            setLoading(false);
        });
    }, [isActive,page, size, sort]);

    return (
        <>
            <div><Toaster 
              toastOptions={{
                className: '',
                duration: 1500,
                removeDelay: 1000
                }}/>
            </div>
            <div style={{ height: "80vh" }} className="flex flex-col pt-8">
                <BackButton />
                <div className="flex flex-col items-start">
                    <div className="flex w-full space-x-24">
                        <select 
                        className="focus:outline-none flex-grow bg-orange-200 border border-orange-700 rounded py-1 px-3 text-md"
                        onChange={e=>{setIsActive(e.target.value)}} 
                        >
                            <option key="0" value="2">
                                Mostrar todos
                            </option>
                            <option key="1" value="1">
                                Activos
                            </option>
                            <option key="2" value="0">
                                No Activos
                            </option>
                        </select>
                        <button 
                            onClick={handleOpenModal}
                            className="flex justify-center block px-4 py-2 font-semibold text-md text-white bg-orange-800 hover:cursor-pointer hover:bg-orange-900"
                        >
                            Generar Nuevo Rango
                        </button>
                    </div>
                <div className="flex flex-row gap-3">
                    <select className="bg-orange-700 mt-3 rounded px-2 py-1 text-white font-semibold" onChange={e => { setSort(e.target.value) }} value={sort}>
                        <option value="0">Descendente</option>
                        <option value="1">Ascendente</option>
                    </select>
                </div>
                </div>
                <p className="mt-6 text-lg text-orange-800 font-semibold underline">Rangos Emitidos</p>
                <div style={{ width: "75vw" }} className={`rounded mt-2 mb-6 flex overflow-y-scroll ${loading ? "" : "border border-orange-700 bg-orange-200"}`}>
                    {
                        loading
                            ? <Spinner loading={loading} />
                            : (
                                <table className="flex-grow w-full table-auto justify-self-center">
                                    <thead>
                                        <tr>
                                            <th className="border border-orange-900 py-2 px-5 bg-orange-700 text-white text-md">Estado</th>
                                            <th className="border border-orange-900 px-5 bg-orange-700 text-white text-md">Inicio Rango</th>
                                            <th className="border border-orange-900 px-5 bg-orange-700 text-white text-md">Fin Rango</th>
                                            <th className="border border-orange-900 px-5 bg-orange-700 text-white text-md">F. Expiración</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            codeRanges
                                                .map((range, idx) =>
                                                    <tr key={idx}>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                            {range.isActive ? "Activo" : "No Activo"}
                                                        </td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                            {range.startRange}
                                                        </td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                            {range.endRange}
                                                        </td>
                                                        <td className="border border-orange-900 bg-orange-200 py-4 px-5 text-md">
                                                            {new Date(range.expirationDate).toLocaleDateString()}
                                                        </td>
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
                        <Pagination
                            activePage={page}
                            itemsCountPerPage={size}
                            totalItemsCount={totalItems}
                            pageRangeDisplayed={5}
                            onChange={(pageNumber) => setPage(pageNumber)}
                            innerClass="flex list-none rounded-md overflow-hidden shadow-sm"
                            itemClass="flex items-center justify-center"
                            linkClass="px-3 py-2 border border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
                            activeClass="bg-green-500"
                            activeLinkClass="px-3 py-2 border border-blue-500 bg-blue-500 text-white hover:bg-blue-600"
                            disabledClass="opacity-50 cursor-not-allowed"
                            prevPageText="<<"
                            nextPageText=">>"
                            firstPageText="Primera"
                            lastPageText="Última"
                        />
                        </div>
                    )
                }
            </div>

            <NewRangeModal isOpen={isModalOpen} onClose={ handleCloseModal} idCaiCode={1}></NewRangeModal>
        </>
    );
};

export default CaiCodesPage;