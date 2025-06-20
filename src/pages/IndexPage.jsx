import { Link } from "react-router-dom";

const IndexPage = () => {
    return (
        <>
            <div className="bg-indigo-700">
                <p className="text-5xl font-extrabold">Home page</p>
                <Link to="/hello">Click</Link>
            </div>
        </>
    )
}

export default IndexPage;