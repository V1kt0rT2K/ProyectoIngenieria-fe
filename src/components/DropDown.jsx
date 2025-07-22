import { useRef, useState, useEffect } from "react";

const DropDown = ({ links }) => {
    const [expand, setExpand] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const menu = menuRef.current;
        menu && menu.addEventListener("mouseleave", () => setExpand(false));
    }, [expand]);

    return (
        <>
            <div className="relative inline-block text-left">
                <div>
                    <button onClick={() => setExpand(expand => !expand)} className="space-x-2 hover:cursor-pointer bg-orange-800 inline-flex w-full justify-center items-center rounded px-3 py-1 text-md font-semibold text-white" aria-expanded="true" aria-haspopup="true">
                        Opciones
                        <svg className="size-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" />
                        </svg>
                    </button>
                </div>
                {
                    expand
                    && (
                        <>
                            <div ref={menuRef} className="border-1 border-solid border-orange-700 absolute right-0 z-10 mt-2 w-36 origin-top-right rounded bg-orange-800 shadow-lg ring-1 ring-black/5 focus:outline-hidden" aria-orientation="vertical" aria-labelledby="menu-button">
                                <div className="py-1" role="none">
                                    {links}
                                </div>
                            </div>
                        </>
                    )
                }
            </div>
        </>
    )
}

export default DropDown;