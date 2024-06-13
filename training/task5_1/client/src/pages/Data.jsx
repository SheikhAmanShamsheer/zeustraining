import { useState, useEffect, useRef } from "react";
import axios from 'axios'
// import ReactPaginate from "react-paginate";
import 'bootstrap/dist/css/bootstrap.min.css'
// import Modal from "./Modal";
// import disableScroll from 'disable-scroll';
import Swal from 'sweetalert2'


const Data = () => {
    const [files, setFiles] = useState([])
    const [up, setUp] = useState([])
    const [pageCount, setPageCount] = useState(1);
    const [start, setStart] = useState(0)
    const inputFile = useRef(null);
    const [currentPage, setCurrentPage] = useState(1)

    const handleReset = (inputFile) => {
        // inputFile.target.value =""
        // inputFile.current.value = ""
        // if (inputFile.current) {
        console.log("inputFile " + inputFile.target)
        inputFile.current.value = null
        inputFile.current.type = "file";
        inputFile.target.value = null
        // }
    }
    // const handleCloseModal = () => {
    //     setShowModal(false);
    // };
    const upload = () => {
        const formData = new FormData()
        formData.append('file', up)
        axios.post('http://localhost:8800/files', formData)
            .then(res => {
                // setShowModal(true)
                handleReset(inputFile);

            })
            .catch(er => console.log(er))
    }
    const handleClick = () => {
        Swal.fire({
            title: "The Internet?",
            text: "That thing is still around?",
            icon: "question"
        });
    }

    const handleNextPageClick = () => {
        // let currentPage = event.selected
        console.log(pageCount)
        if (files.length >= 10) {
            setStart(start + 10)
            setPageCount(pageCount + 1)
            setCurrentPage(currentPage + 1)
        }
        // setPageCount(pageCount+1)
        // fetchAllbooks()
    };
    const handlePageClick = (i) => {
        if (i >= 0) {
            console.log("i " + i)
            setCurrentPage(i)
            setStart((i - 1) * 10)
        }

    }
    const handlePrevPageClick = () => {
        // let currentPage = event.selected
        if (pageCount > 1 && start > 0) {
            setStart(start - 10)
            setPageCount(pageCount - 1)
            setCurrentPage(currentPage - 1)
        }

        // setPageCount(pageCount+1)
        // fetchAllbooks()
    };
    useEffect(() => {
        const fetchAllbooks = async () => {
            try {
                const res = await axios.get('http://localhost:8800/files', { params: { answer: start } })
                setFiles(res.data)
                // setPageCount(Math.ceil(res.data.length / 10))
                console.log(files)
            } catch (err) {
                console.log(err)
            }
        }
        fetchAllbooks()
    }, [pageCount, start, currentPage, files])
    return (
        <div >
            {/* <h1 >Data</h1> */}
            <form className="input-group mb-3 mt-3" action="/files" method="POST" encType="">
                <input type="file" id="fileInput" className="form-control" ref={inputFile} onChange={(e) => { setUp(e.target.files[0]) }} />
                <button type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" htmlFor="fileInput" className="btn btn-primary" onClick={() => {
                    handleClick(); upload();
                }}>Upload</button>
            </form>
            <table className="table w-100 h-100" border='1px'>
                <tbody>
                    <tr className="thead-dark">
                        <th className="p-3 align-content-center">Sr. no</th>
                        <th className="p-3">Username</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">First Name</th>
                        <th className="p-3">Last Name</th>
                        <th className="p-3 align-content-center">Update & Delete</th>
                    </tr>
                    {files.map(file => (

                        <tr key={file.id}>
                            <td className="p-3">{file.id}</td>
                            <td className="p-3">{file.username}</td>
                            <td className="p-3">{file.email}</td>
                            <td className="p-3">{file.firstName}</td>
                            <td className="p-3">{file.lastName}</td>
                            <td className="p-3">
                                <button type="button" className="btn btn-warning m-2">UPDATE</button>
                                <button type="button" className="btn btn-danger m-2">DELETE</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center mt-3"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassNyame={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            /> */}
            <nav aria-label="..." >
                <ul className="pagination d-flex justify-content-center">
                    <li className="page-item">
                        <a className="page-link" href="#" tabIndex="-1" onClick={handlePrevPageClick}>Previous</a>
                    </li>
                    {Array.from({ length: pageCount }, (_, index) => (
                        <li key={index}>
                            <a className={`page-link ${currentPage === index + 1 ? 'active' : ''}`} href="#" onClick={() => handlePageClick(index + 1)}>
                                {index + 1}
                            </a>
                        </li>
                    ))}
                    <li className="page-item">
                        <a className="page-link" href="#" onClick={handleNextPageClick}>Next</a>
                    </li>
                </ul>
            </nav>

            {/* <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default Data