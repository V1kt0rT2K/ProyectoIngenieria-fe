import BackButton from "../../components/BackButton";

const NewLotPage = () => {
    return (
        <>
            <div style={{ height: "80vh", width: "75vw" }} className="flex flex-col pt-8">
                <BackButton />
                <p className="mb-2 text-lg text-orange-800 font-semibold underline">Nuevo lote</p>
            </div>
        </>
    )
};

export default NewLotPage;