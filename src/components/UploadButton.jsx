export default function UploadButton() {

    return (
        <>
            <input
                type="file"
                hidden
                ref={inputRef}
                onChange={upload}
            />

            <button
                className="btn btn-success"
                onClick={() => inputRef.current.click()}
            >
                Upload File
            </button>
        </>
    );

}