const TopBar = ({ title }) => {
    return (
        <>
            <div className="border-b-1 border-solid border-orange-500 bg-orange-200 h-30 px-12 flex items-center place-content-between">
                <p className="text-3xl font-bold text-orange-800">{ title }</p>
                <p>Usuario</p>
            </div>
        </>
    );
}

export default TopBar;