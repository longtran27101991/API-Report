import React, {Component} from "react";
import {
  Input,
  CardTitle,Button,
  Row, Col,
  CardBody, Table,
} from "reactstrap";
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import client from "../../api";


// import moment from "moment";

class ApiReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      totalPage: 1,
      keyword: "",
      search: "",
      dataTable: [],
      searchTable: [],
      view: "",
      maxRow:10,
      rowPerPage:[],
      // status:"Status",
      statusComboBox:[],
      // api:"Select API",
      apiCombobox:[]
    };
  }

  getTotalPage = (totalLength)=>{
    return Math.floor((totalLength - 1) / this.state.maxRow) + 1;
  }

  componentDidMount() {
      client.get('/api/historyManagement')
        .then((response) => {
          var getStatus = response.data.data.map((data)=>data.Status)
          var statusComboBox = [...new Set(getStatus)];
          var getAPI = response.data.data.map((data)=>data.API)
          var apiCombobox = [...new Set(getAPI)];

            this.setState({
              dataTable: response.data.data,
              totalPage: this.getTotalPage(response.data.data.length),
              rowPerPage:[1,2,3,4,5,6,7,8,9,10],
              statusComboBox:statusComboBox,
              apiCombobox:apiCombobox
            });
          }
        )
        .catch((error) => {
          console.log(error)
        });
    window.addEventListener("resize", this.resize.bind(this));
    this.resize();
  }

  resize() {
    this.setState({is_mobile: window.innerWidth <= 1000});
  }

  getTableRow(index, data) {
    return (
      <tr key={index}>
        <td><p>{data.Request_time}</p></td>
        <td><p>{data.API}</p></td>
        <td><p>{data.Uri}</p></td>
        <td><p>{data.Method}</p></td>
        <td><p>{data.Request_body}</p></td>
        <td><p>{data.Status}</p></td>
        <td><p>{data.Latency}</p></td>
      </tr>
    )
  }

  onChangeRowPerPage = async(e)=>{
    await this.setState({maxRow:e.target.value});
    this.setState({totalPage:this.getTotalPage(this.state.dataTable.length),currentPage:1});
  }

  // onChangeSearch = (changeEvent, type) => {
  //   const searchWord = changeEvent.target.value.toString();
  //   const tmp = this.state;
  //   if (!searchWord) {
  //     tmp.search = "";
  //     tmp.searchTable = [];
  //     tmp.view = "";
  //   } else {
  //     tmp.search = searchWord;
  //     const searchTable = this.filterItems(searchWord, tmp.dataTable);
  //     tmp.searchTable = searchTable;
  //     tmp.view = "search";
  //     tmp.totalPage = this.getTotalPage(tmp.searchTable.length);
  //     tmp.currentPage = 1;
  //   }
    
  //   this.setState({type: tmp});
  // };

  onChangeStatusComboBox = async(e)=>{
    document.querySelector("#api").value = "Select API";
    document.querySelector("#from").value = "";
    document.querySelector("#to").value = "";

    if(e.target.value.toString()==="Status"){
      this.setState({view:"",totalPage:this.getTotalPage(this.state.dataTable.length),searchTable:[]})
    }
    else{
      const searchTable = this.filterStatus(e.target.value.toString(), this.state.dataTable);
      await this.setState({searchTable:searchTable,view:"search",});
      this.setState({totalPage:this.getTotalPage(searchTable.length),currentPage:1})
    }
  }

  onChangeAPIComboBox = async(e)=>{
    
    document.querySelector("#status").value = "Status";
    document.querySelector("#from").value = "";
    document.querySelector("#to").value = "";

    if(e.target.value.toString()==="Select API"){
      this.setState({view:"",totalPage:this.getTotalPage(this.state.dataTable.length),searchTable:[]})
    }
    else{
      const searchTable = this.filterAPI(e.target.value.toString(), this.state.dataTable);
      await this.setState({searchTable:searchTable,view:"search",});
      this.setState({totalPage:this.getTotalPage(searchTable.length),currentPage:1})
    }
  }


  filterStatus = (query, data)=>{
    return data.filter((el) =>
    el.Status.toString().toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  }

  filterAPI = (query, data)=>{
    return data.filter((el) =>
    el.API.toString().toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  }

  // filterItems = (query, data) => {
  //   return data.filter((el) =>
  //     el.Request_time.toString().toLowerCase().indexOf(query.toLowerCase()) > -1
  //   );
  // };

  handlePageClick = (pageClick) => {
    this.setState({currentPage: pageClick});
  };


  switchView = () => {
    if (this.state.view === "search") {
      return (
        this.state.searchTable.filter((data, index) => (index < (this.state.currentPage * this.state.maxRow)) && (index >= (this.state.currentPage * this.state.maxRow) - this.state.maxRow)).map((data, index) =>
          this.getTableRow(index, data))
      )
    } else {
      return (
        this.state.dataTable.filter((data, index) => (index < (this.state.currentPage * this.state.maxRow)) && (index >= (this.state.currentPage * this.state.maxRow) - this.state.maxRow)).map((data, index) =>
          this.getTableRow(index, data)
        )
      )
    }
  };

  render() {
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            <CardTitle>
              API REPORT <Button onClick={()=>{window.location.reload()}}>Refresh</Button> </CardTitle>
          </div>
          <CardBody>
            <div>
                <div>
                  {/* repair */}
                  <Row>
                    <Col>
                      <Input type = "select" 
                      id="status"
                      // value={this.state.status} 
                      onChange={(e)=>this.onChangeStatusComboBox(e)} >
                      <option>Status</option>
                      {this.state.statusComboBox.map(row => <option key={row} value={row}>{row}</option>)}
                      </Input>
                    </Col>
                    <Col>
                      <Input type = "select" 
                      id = "api"
                      // value={this.state.api} 
                      onChange={(e)=>this.onChangeAPIComboBox(e)}>
                      <option>Select API</option>
                      {this.state.apiCombobox.map(row => <option key={row} value={row}>{row}</option>)}
                      </Input>
                    </Col>
                    <Col>
                      {/* <Input type = "Text"
                      id="from"
                       placeholder="From" onChange={(e)=>{this.onChangeSearch(e)}}/> */}
                       <Input type = "date" id="from"
                      //  placeholder="From" onChange={(e)=>{this.onChangeSearch(e)}}
                       />
                    </Col>
                    <Col>
                      <Input type = "date" id="to"
                      //  placeholder="From" onChange={(e)=>{this.onChangeSearch(e)}}
                       />
                      {/* <Input type = "Text"
                      id="to"
                       placeholder="To" /> */}
                    </Col>
                  </Row>
                </div>

              </div>
          </CardBody>
          <CardBody className="overflow-auto">
            <Table striped bordered hover size="lg">
              <thead>
              <tr>
                <th>Request time</th>
                <th>API</th>
                <th>Uri</th>
                <th>Method</th>
                <th>Request body</th>
                <th>Status</th>
                <th>Latency (ms)</th>
              </tr>
              </thead>
              {this.state.dataTable.length > 0 &&
              <tbody>
              {this.switchView()}
              </tbody>
              }
            </Table>
            {/* repair */}
            <div>
              <Row>
                <Col>
                  <Row>
                    <Col>
                      <p style={{marginTop:'15px'}}>Rows per page</p>
                    </Col>
                    <Col>
                      <Input type = "select" value={this.state.maxRow} onChange={(e)=>{this.onChangeRowPerPage(e)}} style={{width:"70px",margin:"10px"}}>
                      {this.state.rowPerPage.map(row => <option key={row} value={row}>{row}</option>)}
                      </Input>
                    </Col>
                    <Col>
                      <p style={{margin:"15px"}}>
                          {this.state.currentPage*this.state.maxRow-this.state.maxRow+1} - {this.state.currentPage*this.state.maxRow>(this.state.view==="search"?this.state.searchTable.length:this.state.dataTable.length)?(this.state.view==="search"?this.state.searchTable.length:this.state.dataTable.length):this.state.currentPage*this.state.maxRow} of {this.state.view==="search"?this.state.searchTable.length:this.state.dataTable.length}
                        </p>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Pagination onChange={(pageClick) => this.handlePageClick(pageClick)}
                  style={{float:"right",marginTop:'15px'}}
                  current={this.state.currentPage}
                  total={this.state.totalPage * 10}/>
                </Col>
              </Row> 
            </div>
          </CardBody>
        </div>


      </div>
    );
  }
}

export default ApiReport;
