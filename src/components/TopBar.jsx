const TopBar = ({ title }) => {
    return (
        <>
            <div className="bg-orange-200 py-8 px-12 flex items-center place-content-between">
                <p className="text-3xl font-semibold text-orange-800">{ title }</p>
                <p>Usuario</p>
            </div>
        </>
    );
}

export default TopBar;