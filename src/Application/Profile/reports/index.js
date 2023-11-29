import { Link, useParams } from "react-router-dom";
import "./index.css"
import { useState } from "react";
import { useEffect } from "react";
import * as client from "../../client"
function Reports() {

    const { uid } = useParams()
    const [report, setReports] = useState()
    const fetchReport = async () => {
        const response = await client.fetchReport()
        setReports(response)
    }
    useEffect(() => {
       
        fetchReport()
    }, [uid])



    const handleResolve = async (deleteAction,id) => {
        await client.resolveReport(deleteAction,id)
        await fetchReport()
    }



    return (
        <div className="container mt-3">
            <div className="list-group">
                {
                    report &&
                    <>
                        {
                            report.length === 0 ? (
                                <>

                                    <h3 className="me-4">No Reports Unresolved</h3>
                                </>

                            ) : (
                                report.map((item, index) => (
                                    <div key={index} className=" list-group-item list-group-item-action">
                                        <div >Reason: {item.reason}</div>
                                        <div >Comment Text: {item.text}</div>
                                       
                                        <div className="float-end">
                                            <button className="btn btn-warning me-3" onClick={() => handleResolve(false,item._id)}>Resolve</button>
                                            <button className="btn btn-danger"  onClick={() => handleResolve(true,item._id)}>Delete Comment</button>
                                        </div>
                                        
                                    </div>
                                ))
                            )
                        }
                    </>
                }
            </div>
           
        </div>
    );
}
export default Reports