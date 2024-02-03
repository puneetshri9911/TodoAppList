function Table({ tableData,handleDelete,handleEdit }) {
  return (
    <div className="container">
      <div className=" table-responsive">
        {tableData && (
          <table className="table table-striped" id="myTable">
            <thead>
              <tr>
                <th>Action</th>
                <th>S.No.</th>
                <th>User Name</th>
                <th>Mobile No.</th>
                <th>Email</th>
                <th>Message</th>
              </tr>
            </thead>

            <tbody>
              {tableData.map((data, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <button className="btn btn-sm btn-primary" onClick={()=>handleEdit(data.Id)}>
                        <i className="fa fa-trash" aria-hidden="true"></i> Edit
                      </button>
                      <button className="btn btn-sm btn-danger"  onClick={()=>{handleDelete(data.Id)}} >
                        <i className="fa fa-trash" aria-hidden="true"></i>
                      Delete</button>
                    </td>
                    <td>{index + 1}</td>
                    <td>{data.UserName ? data.UserName : "N/A"}</td>
                    <td>{data.MobileNo ? data.MobileNo : "N/A"}</td>
                    <td>{data.Email ? data.Email : "N/A"}</td>
                    <td>{data.Message ? data.Message : "N/A"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Table;
