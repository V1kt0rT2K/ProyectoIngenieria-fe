import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <>
            <div className="bg-indigo-500 text-5xl font-extrabold text-white p-6">Hello</div>
            <Link to="/">Back</Link>
        </>
    );
}

export default HomePage;