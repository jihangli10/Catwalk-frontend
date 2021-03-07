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
      Fit: null

    };
    this.handleChange = this.handleChange.bind(this);
  }

  // This event handler will handle any changes on the form
  handleChange(event) {
    const value = event.target.value;
    (event.target.name === 'rating') ? this.setState({[event.target.name]: value, rated: true}) :
      this.setState({ [event.target.name]: value });
    console.log('this.state.rating', this.state.rating, 'this.state.rated', this.state.rated)
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
          this.props.handleAddQuestionClose();
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
        <div>
        <div className="reviewTitle">Write Your Review About the&nbsp;<strong><span className="reviewSubTitle">{this.props.addNewReviewProduct.name} </span> </strong></div>

          <br></br>

        <div className="reviewQ row">*Overall Rating&nbsp;<span className="rated" style={{ display: this.state.rated ? "block" : "none" }}>{this.state.rating}</span>

        </div>
          <div className="row">
            <fieldset className="rate">

              <input type="radio" id="rating5" name="rating" value="5-Great" onChange={this.handleChange}/>
                <label htmlFor="rating5"><span className="fa fa-star fa-2x faOverall"></span></label>
              <input type="radio" id="rating4" name="rating" value="4-Good" onChange={this.handleChange}/>
                <label htmlFor="rating4"><span className="fa fa-star fa-2x faOverall"></span></label>
              <input type="radio" id="rating3" name="rating" value="3-Average" onChange={this.handleChange}/>
                <label htmlFor="rating3"><span className="fa fa-star fa-2x faOverall"></span></label>
              <input type="radio" id="rating2" name="rating" value="2-Fair" onChange={this.handleChange}/>
                <label htmlFor="rating2"><span className="fa fa-star fa-2x faOverall"></span></label>
              <input type="radio" id="rating1" name="rating" value="1-Poor" onChange={this.handleChange}/>
                <label htmlFor="rating1"><span className="fa fa-star fa-2x faOverall"></span></label>

            </fieldset>

          </div>

          <div className="reviewQ">*Do you recommend this product?</div>
          <div className="reviewA row">
            <input type="radio" name="recommend" value="Yes" className="ynRadio" onChange={this.handleChange}/>
            <label htmlFor="recommendYes">Yes</label>&nbsp;
            <input type="radio" name="recommend" value="No" className="ynRadio" onChange={this.handleChange}/>
            <label htmlFor="recommendNo">No</label>
          </div>
        </div>

    )
  }
}
export default AddNewReviewContents;

  /*



  *Overall Rating

    The overall rating will be selected via five selectable star icons.  Initially, the stars will all be outlines, and none will be solid.  Clicking on a star will fill that star and all of the stars to the left of it with solid color.  Customers will not be able to select fractions of a star.  After selecting a star, text will appear to the right of the stars explaining the meaning of the selection.  The text will vary as follows:

      The text will vary as follows:
      -1 star “Poor”
      -2 stars “Fair”
      -3 stars  “Average”
      -4 stars  “Good”
      -5 stars  “Great”

  *Do you recommend this product?

    Recommendation will be captured via a radio button array of “Yes” and “No”.  Default radio button behavior will apply.

  *Characteristics

    Any characteristics designated as applicable for the current product will appear in this area.  For these inputs, the title will be the characteristic title. The meaning of the selections is outlined below:
    ![Characteristics](/Users/jodisilverman/seip2101/frontEndCapstone/client/assets/characteristics.jpg)

  Review Summary

    A text input allowing up to 60 characters.
    Placeholder text should read: “Example: Best purchase ever!”

  *Review Body

    A text input allowing up to 1000 characters.

    Placeholder text should read: “Why did you like the product or not?”.

    The review must be over 50 characters long in order to be submitted.   If the user tries to submit a review shorter that 50 characters, then the submission should fail in the same manner as it would for a blank mandatory field.

    Below the input for the Review body, a counter should appear.  This counter should let the user know how many characters are needed to reach the 50 character minimum.  It should appear in the format “Minimum required characters left: [##]”.  As the user types, the count of characters should update.   After the user reaches 50 characters, the counter should be replaced by a message stating “Minimum reached”.

  Upload your photos

    A button will appear allowing users to upload their photos to the form.

    Clicking the button should open a separate window where the photo to be can be selected.

    After the first image is uploaded, a thumbnail showing the image should appear.  A user should be able to add up to five images before the button to add disappears, preventing further additions.

  *What is your nickname

    A text input allowing up to 60 characters for the user’s display name.
    Placeholder text should read: “Example: jackson11!”.
    Below this field, the text “For privacy reasons, do not use your full name or email address” will appear.

  *Your email

    A text input allowing up to 60 characters.
    Placeholder text should read: “Example: jackson11@email.com”.
    Below this field, the text “For authentication reasons, you will not be emailed” will appear.

  Submit review (button)
    A button by which the review can be submitted.

    Upon selecting this button the form’s inputs should be validated.   If there are any invalid entries, the submission should be prevented, and a warning message will appear.   This message should be titled “You must enter the following:”

    This error will occur if:

    -Any mandatory fields are blank.
    -The review body is less than 50 characters.
    -The email address provided is not in correct email format.
    -The images selected are invalid or unable to be uploaded.

    */
