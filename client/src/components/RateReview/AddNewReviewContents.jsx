import React from 'react';
import axios from 'axios';

class AddNewReviewContents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: null,
      rated: false,
      recommend: null,
      Size: null,
      Width: null,
      Comfort: null,
      Quality: null,
      Length: null,
      Fit: null,
      summary: '',
      body: '',
      bodyChars: 0

    };
    this.handleChange = this.handleChange.bind(this);
  }

  // This event handler will handle any changes on the form
  handleChange(event) {
    const value = event.target.value;
    if (event.target.name === 'rating') {
      this.setState({ [event.target.name]: value, rated: true })
    } else if (event.target.name === 'body') {
      this.setState({ [event.target.name]: value, bodyChars: this.state.bodyChars + 1 })
    } else {
      this.setState({[event.target.name]: value}, () => {console.log('STATE OF THE STATE', this.state)});
    }
  }


  _isInputValid() {
    let emailParts = this.state.emailQuery.split('@');
    let emailValid = function () {
      if (emailParts.length === 2 && emailParts[0] !== '' && emailParts[1] !== '') {
        let domain = emailParts[1].split('.');
        return domain.length >= 2 && domain.every(part => {
          return part !== ''
        })
      }
      return false;
    }();
    let addQuestionValid = this.state.addQuestionQuery !== '';
    let nicknameValid = this.state.nicknameQuery !== '';
    if (addQuestionValid && nicknameValid && emailValid) {
      return true;
    } else {
      this.setState({
        addQuestionValid,
        nicknameValid,
        emailValid
      });
      return false;
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this._isInputValid()) {
      var body = {
        "body": this.state.addQuestionQuery,
        "name": this.state.nicknameQuery,
        "email": this.state.emailQuery,
        "product_id": parseInt(this.props.product_id, 10)
      };
      console.log(body);
      return axios.post('/qa/questions', body)
        .then(() => {
          alert('Your Question is submitted!');
          this.props.handleAddReviewClick();
        })
        .catch(err => {
          console.log(err);
        })
    } else {
      this.setState({
        showError: true
      })
    }
  }

  componentDidMount() {
    this.setState({
      rating: null,
      rated: false,
      recommend: 'Yes'
    })
  }

  render() {
    return (
      <div className="reviewContainer">
        <div className="reviewTitle">Write Your Review About the&nbsp;<strong><span className="reviewSubTitle">{this.props.addNewReviewProduct.name} </span> </strong></div>

        <br></br>
        {/* ========================= OVERALL RATING SECTION ========================= */}
        <div className="reviewQ row">*Overall Rating&nbsp;<span className="rated" style={{ display: this.state.rated ? "block" : "none" }}>{this.state.rating}</span>
        </div>
        <div className="row">
          <fieldset className="rate">
            <input type="radio" id="rating5" name="rating" value="5-Great" onChange={this.handleChange} />
            <label htmlFor="rating5"><span className="fa fa-star fa-2x faOverall"></span></label>
            <input type="radio" id="rating4" name="rating" value="4-Good" onChange={this.handleChange} />
            <label htmlFor="rating4"><span className="fa fa-star fa-2x faOverall"></span></label>
            <input type="radio" id="rating3" name="rating" value="3-Average" onChange={this.handleChange} />
            <label htmlFor="rating3"><span className="fa fa-star fa-2x faOverall"></span></label>
            <input type="radio" id="rating2" name="rating" value="2-Fair" onChange={this.handleChange} />
            <label htmlFor="rating2"><span className="fa fa-star fa-2x faOverall"></span></label>
            <input type="radio" id="rating1" name="rating" value="1-Poor" onChange={this.handleChange} />
            <label htmlFor="rating1"><span className="fa fa-star fa-2x faOverall"></span></label>
          </fieldset>
        </div>
        {/* ========================= RECOMMEND SECTION ========================= */}
        <div className="reviewQ">*Do you recommend this product?</div>
        <div className="reviewA row">
          <input type="radio" name="recommend" value="Yes" className="ynRadio" onChange={this.handleChange} />
          <label htmlFor="recommendYes">Yes</label>&nbsp;
          <input type="radio" name="recommend" value="No" className="ynRadio" onChange={this.handleChange} />
          <label htmlFor="recommendNo">No</label>
        </div>
        {/* ========================= CHARACTERISTIC RATING SECTION ========================= */}
        <div className="reviewQ">*Characteristics Rating</div>
        <br></br>
        <br></br>
        <table className="tableCharacteristics">
          <tbody>
            <tr>
              <th><strong>Characteristic</strong></th>
              <th><strong>1</strong></th>
              <th><strong>2</strong></th>
              <th><strong>3</strong></th>
              <th><strong>4</strong></th>
              <th><strong>5</strong></th>
            </tr>
            <tr><td colSpan="6" className="tdTop"></td></tr>
            <tr>
              <td rowSpan="2" className="tdRow"><strong>Size</strong></td>
              <td>A size too small</td>
              <td>1/2 a size to small</td>
              <td>Perfect</td>
              <td>1/2 a size too big</td>
              <td>A size too big</td>
            </tr>
            <tr>
              <td>
                <input type="radio" name="Size" value="1" onChange={this.handleChange} /><label htmlFor="Size1"></label>
              </td>
              <td>
                <input type="radio" name="Size" value="2" onChange={this.handleChange} /><label htmlFor="Size2"></label></td>
              <td>
                <input type="radio" name="Size" value="3" onChange={this.handleChange} /><label htmlFor="Size3"></label></td>
              <td>
                <input type="radio" name="Size" value="4" onChange={this.handleChange} /><label htmlFor="Size4"></label></td>
              <td>
                <input type="radio" name="Size" value="5" onChange={this.handleChange} /><label htmlFor="Size5"></label></td>
            </tr>
            <tr><td colSpan="6" className="tdTop"></td></tr>
            <tr>
              <td rowSpan="2" className="tdRow"><strong>Width</strong></td>
              <td>Too Narrow</td>
              <td>Slightly Narrow</td>
              <td>Perfect</td>
              <td>Slightly Wide</td>
              <td>Too Wide</td>
            </tr>
            <tr>
              <td>
                <input type="radio" name="Width" value="1" onChange={this.handleChange} /><label htmlFor="Width1"></label>
              </td>
              <td>
                <input type="radio" name="Width" value="2" onChange={this.handleChange} /><label htmlFor="Width2"></label></td>
              <td>
                <input type="radio" name="Width" value="3" onChange={this.handleChange} /><label htmlFor="Width3"></label></td>
              <td>
                <input type="radio" name="Width" value="4" onChange={this.handleChange} /><label htmlFor="Width4"></label></td>
              <td>
                <input type="radio" name="Width" value="5" onChange={this.handleChange} /><label htmlFor="Width5"></label></td>
            </tr>
            <tr><td colSpan="6" className="tdTop"></td></tr>
            <tr>
              <td rowSpan="2" className="tdRow"><strong>Comfort</strong></td>
              <td>Uncomfortable</td>
              <td>Slightly Uncomfortable</td>
              <td>OK</td>
              <td>Comfortable</td>
              <td>Perfect</td>
            </tr>
            <tr>
              <td>
                <input type="radio" name="Comfort" value="1" onChange={this.handleChange} /><label htmlFor="Comfort1"></label>
              </td>
              <td>
                <input type="radio" name="Comfort" value="2" onChange={this.handleChange} /><label htmlFor="Comfort2"></label></td>
              <td>
                <input type="radio" name="Comfort" value="3" onChange={this.handleChange} /><label htmlFor="Comfort3"></label></td>
              <td>
                <input type="radio" name="Comfort" value="4" onChange={this.handleChange} /><label htmlFor="Comfort4"></label></td>
              <td>
                <input type="radio" name="Comfort" value="5" onChange={this.handleChange} /><label htmlFor="Comfort5"></label></td>
            </tr>
            <tr><td colSpan="6" className="tdTop"></td></tr>
            <tr>
              <td rowSpan="2" className="tdRow"><strong>Quality</strong></td>
              <td>Poor</td>
              <td>Below Average</td>
              <td>What I Expected</td>
              <td>Pretty Good</td>
              <td>Perfect</td>
            </tr>
            <tr>
              <td>
                <input type="radio" name="Quality" value="1" onChange={this.handleChange} /><label htmlFor="Quality1"></label>
              </td>
              <td>
                <input type="radio" name="Quality" value="2" onChange={this.handleChange} /><label htmlFor="Quality2"></label></td>
              <td>
                <input type="radio" name="Quality" value="3" onChange={this.handleChange} /><label htmlFor="Quality3"></label></td>
              <td>
                <input type="radio" name="Quality" value="4" onChange={this.handleChange} /><label htmlFor="Quality4"></label></td>
              <td>
                <input type="radio" name="Quality" value="5" onChange={this.handleChange} /><label htmlFor="Quality5"></label></td>
            </tr>
            <tr><td colSpan="6" className="tdTop"></td></tr>
            <tr>
              <td rowSpan="2" className="tdRow"><strong>Length</strong></td>
              <td>Runs Short</td>
              <td>Runs Slightly Short</td>
              <td>Perfect</td>
              <td>Runs Slightly Long</td>
              <td>Runs Long</td>
            </tr>
            <tr>
              <td>
                <input type="radio" name="Length" value="1" onChange={this.handleChange} /><label htmlFor="Length1"></label>
              </td>
              <td>
                <input type="radio" name="Length" value="2" onChange={this.handleChange} /><label htmlFor="Length2"></label></td>
              <td>
                <input type="radio" name="Length" value="3" onChange={this.handleChange} /><label htmlFor="Length3"></label></td>
              <td>
                <input type="radio" name="Length" value="4" onChange={this.handleChange} /><label htmlFor="Length4"></label></td>
              <td>
                <input type="radio" name="Length" value="5" onChange={this.handleChange} /><label htmlFor="Length5"></label></td>
            </tr>
            <tr><td colSpan="6" className="tdTop"></td></tr>
            <tr>
              <td rowSpan="2" className="tdRow"><strong>Fit</strong></td>
              <td>Runs Tight</td>
              <td>Runs Slightly Tight</td>
              <td>Perfect</td>
              <td>Runs Slightly Loose</td>
              <td>Runs Loose</td>
            </tr>
            <tr>
              <td>
                <input type="radio" name="Fit" value="1" onChange={this.handleChange} /><label htmlFor="Fit1"></label>
              </td>
              <td>
                <input type="radio" name="Fit" value="2" onChange={this.handleChange} /><label htmlFor="Fit2"></label></td>
              <td>
                <input type="radio" name="Fit" value="3" onChange={this.handleChange} /><label htmlFor="Fit3"></label></td>
              <td>
                <input type="radio" name="Fit" value="4" onChange={this.handleChange} /><label htmlFor="Fit4"></label></td>
              <td>
                <input type="radio" name="Fit" value="5" onChange={this.handleChange} /><label htmlFor="Fit5"></label></td>
            </tr>
          </tbody>
        </table>
        {/* ========================= REVIEW SUMMARY SECTION ========================= */}
        <div className="reviewQ row">Review Summary</div>
        <div className="reviewA row">
          <label htmlFor="summary">  <textarea type="text" name="summary" value={this.state.summary} placeholder="Example: Best purchase ever!" maxLength="60" cols="80" onChange={this.handleChange}/></label>
        </div>
        {/* ========================= REVIEW BODY SECTION ========================= */}
        <div className="reviewQ row">*Review Body<div className="remainChars"><span><em>&nbsp;&nbsp;(# of Characters: {this.state.bodyChars} &nbsp;&nbsp; # Remaining: {1000 - this.state.bodyChars})</em></span></div></div>
        <div className="reviewA row">
          <label htmlFor="body">  <textarea type="text" name="body" value={this.state.body} placeholder="Why did you like the product (or Not)?" minLength="50" maxLength="1000" cols="80" onChange={this.handleChange} /></label>
        </div>
        {/* ========================= NICKNAME SECTION ========================= */}
        <div className="reviewQ row">*What is Your Nickname?</div>
        <div className="reviewA row">
          <label htmlFor="nickname">  <textarea type="text" name="nickname" value={this.state.nickname} placeholder="Example: jackson11" maxLength="60" cols="80" onChange={this.handleChange} /></label>
        </div>
        {/* ========================= EMAIL SECTION ========================= */}
        <div className="reviewQ row">*Your Email<div className="remainChars"><span><em>&nbsp;&nbsp;(For authentication reasons, you will not be emailed)</em></span></div></div>
        <div className="reviewA row">
          <label htmlFor="email">  <textarea type="text" name="email" value={this.state.email} placeholder="Example: jackson11@email.com" maxLength="60" cols="80" onChange={this.handleChange} /></label>
        </div>



      </div>

    )
  }
}
export default AddNewReviewContents;