import SupplyOptionButton from "./SupplyOptionButton";
import vacunaIcon from "../assets/images/vacuna.png";
import concentradoIcon from "../assets/images/concentrado.png";
import granjeroicon from "../assets/images/granjero.png";

const SupplyOptions = ({ setSubCategory, setPage, setSize }) => {
  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-md mx-auto mt-4">
      <SupplyOptionButton
        icon={granjeroicon}
        label="Todos los Insumos"
        onClick={() => {
          setSubCategory("todos");
          setPage(1);
          setSize(3);
        }}
      />
      <SupplyOptionButton
        icon={concentradoIcon}
        label="Lotes de Concentrado"
        onClick={() => {
          setSubCategory("concentrado");
          setPage(1);
        }}
      />
      <SupplyOptionButton
        icon={vacunaIcon}
        label="Lotes de Desparasitantes"
        onClick={() => {
          setSubCategory("desparasitantes");
          setPage(1);
        }}
      />
      <SupplyOptionButton
        icon={vacunaIcon}
        label="Lotes de Vitaminas"
        onClick={() => {
          setSubCategory("vitaminas");
          setPage(1);
        }}
      />
    </div>
  );
};

export default SupplyOptions;
