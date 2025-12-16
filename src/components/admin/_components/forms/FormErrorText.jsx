const FormErrorText = ({ errorText = "" }) => {
    return (
        <p className="text-xs text-red-500 absolute top-full mt-1">{errorText}</p>
    )
}

export default FormErrorText