export default function FileTable({ files, loading }) {

    if (loading) {

        return <p>Loading files...</p>;

    }

    return (

        <table className="table table-bordered">

            <thead className="table-dark">

            <tr>

                <th>Name</th>

                <th>Size</th>

                <th>Modified</th>

                <th>Actions</th>

            </tr>

            </thead>

            <tbody>

            {

                files.map(file => (

                    <tr key={file.id}>

                        <td>{file.name}</td>

                        <td>{file.size}</td>

                        <td>{file.modified}</td>

                        <td>

                            <button
                                className="btn btn-primary btn-sm me-2"
                            >
                                Download
                            </button>

                            <button
                                className="btn btn-danger btn-sm"
                            >
                                Delete
                            </button>

                        </td>

                    </tr>

                ))

            }

            </tbody>

        </table>

    );

}