import { useState } from "react";
import Table from "./Table";

export default function Form() {
  //-------------------Check Number Only--------//
  const number = (value) => {
    value = value.replace(/^[a-zA-Z]/, "").trim();
    return value;
  };

  let id = Math.floor(Math.random() * 10000);

  const [formData, setFormData] = useState({
    Id: id,
    UserName: "",
    MobileNo: "",
    Email: "",
    Message: "",
    edit:false
  });
  const [tableData, setTableData] = useState([]);
const [isEdit,setIsEdit]=useState(false)

  const validate = () => {
    if (!formData.UserName) {
      alert("Please Enter Name");
      return false;
    } else if (!/^\d+$/.test(number(formData.MobileNo))) {
      alert("Enter Valid Mobile No.");
      return false;
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.Email)
    ) {
      alert("Invalid email");
      return false;
    } else {
      return true;
    }
  };

  // --------------Submit Data to the Server----------//
  const HandleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if(!isEdit){
      setTableData([...tableData, formData]);
      
    }
    else{
        var newdata= tableData.map((item) => item.Id === formData.Id ? formData  : item)
        setTableData(newdata);
        setIsEdit(false);
        //console.log(newdata['Id'])
    }
    HandleClear();
    }
  };

// handle Edit 
const handleEdit =(Id)=>{
  let itemToEdit = tableData.find((item) => item.Id == Id);
  setFormData(itemToEdit);
  setIsEdit(true);
}


  // handleDelete
  const HandleDelete =(id)=>{
    console.log(id)
    let newdata= tableData.filter((data)=> data.Id !== id );
    setTableData(newdata);
  }

  console.log("Submitted", formData, tableData);
 
  //-------------Handle Change input values-------------------// 
  const HandleChange = (prop, value) => {
    setFormData({ ...formData, [prop]: value });
  };

  const HandleClear = () => {
    setFormData({
      Id: id,
      UserName: "",
      MobileNo: "",
      Email: "",
      Message: "",
      edit:false
    });
    setIsEdit(false)
  };

  return (
    <div className="container">
      <form onSubmit={HandleSubmit}>
        <div className="row p-2 ">
          <div className="col-md-4">
            <label htmlFor="username">User Name</label>
            <div className="input-group mb-3 ">
              <span className="input-group-text" id="basic-addon1">
                ##
              </span>
              <input
                id="username"
                type="text"
                className="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                maxLength={50}
                value={formData.UserName}
                onChange={(e) => HandleChange("UserName", e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <label htmlFor="mobileNo">Mobile Number</label>
            <div className="input-group mb-3 ">
              <input
                id="mobileNo"
                type="text"
                className="form-control"
                placeholder="Mobile Number"
                maxLength={10}
                value={formData.MobileNo}
                onChange={(e) =>
                  HandleChange("MobileNo", number(e.target.value))
                }
              />
            </div>
          </div>
          <div className="col-md-4">
            <label htmlFor="email">Email</label>
            <div className="input-group mb-4 ">
              <input
                id="email"
                type="text"
                className="form-control"
                placeholder="Email"
                maxLength={50}
                value={formData.Email}
                onChange={(e) => HandleChange("Email", e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-12">
            <label htmlFor="message">Message</label>
            <div className="input-group mb-3 ">
              <textarea
                id="message"
                type="text"
                className="form-control"
                placeholder="Message"
                maxLength={500}
                value={formData.Message}
                onChange={(e) => HandleChange("Message", e.target.value)}
              />
            </div>
          </div>
          <div className="row p-2 d-flex  justify-content-center align-items-end">
            <button type="submit" className="btn btn-primary btn-sm col-md-11 ">
              Submit
            </button>
          </div>
        </div>
      </form>

      <Table 
      tableData={tableData} 
      handleDelete={HandleDelete} 
      handleEdit={handleEdit}/>
    </div>
  );
}
