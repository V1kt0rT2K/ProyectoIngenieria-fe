const NoRecordsMessage = ({ children }) => (
  <div className="w-full flex justify-center items-center font-extrabold text-3xl text-orange-700">
    {children || 'No hay registros disponibles'}
  </div>
);
export default NoRecordsMessage;