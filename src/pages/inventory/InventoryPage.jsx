import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDebounce } from "../../utils/debounce";
import InventoryTable from "../../components/InventoryTable";
import Spinner from "../../components/Spinner";
import SupplyOptions from "../../components/SupplyOptions";
import Pagination from "react-js-pagination";
import { useInventoryData } from "../../hooks/useInventoryData";
import { inventoryColumns } from "../../utils/inventoryColumns";
import SearchInput from "../../components/SearchInput";
import CategorySelector from "../../components/CategorySelector";
import NoRecordsMessage from "../../components/NoRecordsMessage";

const Categories = {
  PRODUCTS: "Productos",
  LOT: "Lotes",
  SUPPLIES: "Insumos"
};
const CATEGORY_CONFIG = {
  [Categories.PRODUCTS]: {
    columns: inventoryColumns.productos,
    addRoute: null,
    hasTable: true,
    searchable: true,
    defaultSize: 5
  },
  [Categories.LOT]: {
    columns: inventoryColumns.lotes,
    addRoute: "lot",
    hasTable: true,
    searchable: true,
    defaultSize: 3
  },
  [Categories.SUPPLIES]: {
    columns: inventoryColumns.insumos,
    addRoute: null,
    hasTable: true,
    searchable: true,
    defaultSize: 4
  }
};
const categories = Object.values(Categories);
const TableOrMessage = ({ data, columns ,to }) => {
  return data.length > 0 ? (
    <div className="overflow-x-auto w-full">
      <InventoryTable columns={columns} data={data} to={to} />
    </div>
  ) : (
    <NoRecordsMessage />
  );
};
const PromptMessage = () => (
  <div 
    style={{ height: "55vh" }} 
    className="w-full flex justify-center items-center font-extrabold text-3xl text-orange-700"
  >
    Escoja una categoría para obtener registros
  </div>
);

const InventoryPage = () => {
  const [userRole, setUserRole] = useState(null);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState(null);
  const [sort, setSort] = useState("0");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(3);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("session"));
    if (userData && userData.idRole) {
      setUserRole(userData.idRole);
    }
  }, []);
  const { loading, inventory, totalItems } = useInventoryData(
    category,
    subCategory,
    page,
    size,
    sort,
    debouncedSearchTerm
  );

  

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value) setPage(1);
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(e.target.value);
    setSubCategory(null);
    setPage(1);
    setSearchTerm(null);

    const categoryConfig = CATEGORY_CONFIG[selectedCategory];
    if (categoryConfig && categoryConfig.defaultSize) {
      setSize(categoryConfig.defaultSize);
    }
  };

  const getAllowedCategories = () => {
    if (userRole === 6) { 
      return categories.filter(cat => 
        cat !== Categories.PRODUCTS
      );
    }
    return categories;
  };

  const canAddLots = () => {
    return userRole === 4 || userRole === 6; 
  };
  const canSupply = () => {
    return userRole === 4 || userRole === 6;
  };

  const canViewProducts = () => {
    return userRole === 3 || userRole === 4; 
  };




  const currentConfig = CATEGORY_CONFIG[category] || {};
  
  const shouldShowTable = currentConfig.hasTable && !(category === Categories.SUPPLIES && !subCategory);
  
const allowedCategories = getAllowedCategories();
  const renderContent = () => {
    if (category === Categories.SUPPLIES && !subCategory) {
      return canSupply? <SupplyOptions setSubCategory={setSubCategory} setPage={setPage} setSize={setSize} />:
      <NoRecordsMessage message="No tienes permisos para suministrar insumos." />;
    }
  
    return shouldShowTable ? (
      <TableOrMessage 
        data={inventory} 
        columns={currentConfig.columns} 
        to={currentConfig.addRoute}
      />
    ) : (
      <NoRecordsMessage />
    );
  };

  return (
    <div style={{ height: "80vh" }} className="flex flex-col pt-8">
      
      <div className="flex w-full space-x-24 h-8 justify-between">
        <CategorySelector 
          categories={allowedCategories} 
          category={category} 
          onChange={handleCategoryChange} 
        />

        {category && !loading && (
          <>
          

            {(category === Categories.PRODUCTS || (category === Categories.SUPPLIES && subCategory)) && (
              <SearchInput 
                searchTerm={searchTerm} 
                handleSearchChange={handleSearchChange} 
                centered={category === Categories.SUPPLIES} 
              />
            )}
    <div className="flex flex-direction gap-2 justify-start">
              {category === Categories.PRODUCTS &&canViewProducts()&& (
                <>
                  <Link
                    to="/inventory/product_catalog"
                    className="bg-orange-700 px-3 py-1 text-sm xs:text-base xs:px-4 flex items-center text-white font-semibold rounded hover:bg-green-800 transition whitespace-nowrap"
                  >
                    <span className="hidden sm:inline">Ver Catálogo </span>
                    <span className="sm:hidden">Catálogo</span>
                  </Link>
                  <Link
                    to="/inventory/new_product_batch"
                    className="bg-orange-800 px-3 py-1 text-sm xs:text-base xs:px-4 flex items-center text-white font-semibold rounded hover:bg-orange-900 transition whitespace-nowrap"
                  >
                    + Agregar
                  </Link>
                </>
              )}
              
              {category === Categories.LOT &&canAddLots()&& (
                <Link
                  to="/inventory/new_lot"
                  className="bg-orange-800 px-3 py-1 text-sm xs:text-base xs:px-4 flex items-center text-white font-semibold rounded hover:bg-orange-900 transition whitespace-nowrap"
                >
                  + Nuevo Lote
                </Link>
              )}
            </div>
          </>
        )}
      </div>

      
      <div className="flex flex-row gap-3">
        <select
          className="bg-orange-700 mt-3 rounded px-2 py-1 text-white font-semibold"
          onChange={(e) => setSort(e.target.value)}
          value={sort}
        >
          <option value="0">Descendente</option>
          <option value="1">Ascendente</option>
        </select>
      </div>

      
      {category === Categories.SUPPLIES && subCategory &&canAddLots()&& (
        <div className="flex flex-col w-full items-start mb-4 my-4">
          <button
            onClick={() => {
              setSubCategory(null);
              setPage(1);
              setSearchTerm("");
            }}
            className="bg-orange-700 text-white font-semibold py-1 px-4 rounded hover:bg-orange-800 transition"
          >
            ← Regresar a Insumos
          </button>
        </div>
      )}

      
      <div
        style={{ width: "75vw", maxHeight: "55vh" }}
        className={`rounded mt-2 mb-6 overflow-x-auto overflow-y-auto ${
          !category || loading ? "" : "border border-orange-700 bg-orange-200"
        }`}
      >
      {!category ? (
          <PromptMessage />
        ) : loading ? (
          <Spinner />
        ) : (
          renderContent()
        )}
      </div>
      {!loading && totalItems > 0 && (
        <div className="flex justify-center space-x-4">
          <Pagination
            activePage={page}
            itemsCountPerPage={size}
            totalItemsCount={totalItems}
            pageRangeDisplayed={5}
            onChange={setPage}
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
      )}
    </div>
  );
};

export default InventoryPage;