import { MoonLoader } from "react-spinners";

const override = {
    display: "block",
    margin: "50px auto"
};

const Spinner = ({ loading }) => {
    return (
        <MoonLoader
            loading = { loading }
            cssOverride={ override }
            size = { 150 }
        />
    )
}

export default Spinner;