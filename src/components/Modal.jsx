const Modal = ({children, onClose}) => {
    return (
        <>
            <div onClick={ onClose } className="z-10 absolute h-screen w-screen flex">
                <div onClick={(e) => e.stopPropagation()} className="w-100 z-10 relative rounded-lg shadow-xl px-6 py-4 bg-gray-300 m-auto">
                    <div className="flex flex-col items-end mb-2">
                        <button onClick={ onClose } className="hover:cursor-pointer font-extrabold text-black text-xl">X</button>
                    </div>
                    { children }
                </div>
            </div>
        </>
    );
}

export default Modal;