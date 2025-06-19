import { NavLink } from "react-router-dom";

const HomePage = () => {
    return (
        <>
            <div className="bg-indigo-700">
                <p className="text-5xl font-extrabold">Home page</p>
                <NavLink to="/hello">Click</NavLink>
            </div>
        </>
    );
}

export default HomePage;