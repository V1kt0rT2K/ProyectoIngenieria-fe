const Modal = ({children, onClose}) => {
    return (
        <>
            <div onClick={ onClose } className="z-10 absolute h-screen w-screen flex">
                <div onClick={(e) => e.stopPropagation()} className="transition ease-in-out duration-100 w-100 z-10 relative rounded-lg shadow-xl px-6 py-4 bg-gray-300 m-auto">
                    <div className="flex justify-self-end">
                        <button onClick={ onClose } className="hover:cursor-pointer font-extrabold text-white text-xl">X</button>
                    </div>
                    { children }
                </div>
            </div>
        </>
    );
}

export default Modal;