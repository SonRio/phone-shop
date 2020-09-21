import React, { PureComponent } from "react";
import { Link, Redirect } from "react-router-dom";
import Search from "../Search";

class Banner extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      strSearch : "",
    }
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    })
  }

  handdleSearch = () =>{
    let {strSearch} = this.state;
    return (
      <Search strSearch={strSearch}  />
    );
  }

  render() {
    return (
      <div className="d-flex justify-content-center">
          <div className="input-search">
            <input 
            type="text" 
            name="strSearch"
            placeholder="Tìm kiếm..." 
            onChange={this.onChange}
            />
            <Link to={`/search/${this.state.strSearch}/infor`}>
              <button 
              className="btn_search"
              onClick={()=>this.handdleSearch()}
              >
                <i className="fa fa-search"></i>
              </button>
            </Link>
        <Redirect />
        </div>
      </div>
    );
  }
}

export default Banner;
