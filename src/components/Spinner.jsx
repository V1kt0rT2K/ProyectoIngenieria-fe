import { MoonLoader } from "react-spinners";

const Spinner = ({ loading, size, margin }) => {
    return (
        <MoonLoader
            loading = { loading }
            cssOverride={{ display: "block", margin: margin ?? "50px auto"}}
            size = { size ?? 150 }
        />
    )
}

export default Spinner;