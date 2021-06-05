import React, { Component } from "react";
//import PropTypes from 'prop-types';
import Products from "./Products";
import './App.css';

const productCategories = [
  {id: "variant1", variant: "variant 1"},
  {id: "variant2", variant: "variant 2"},
  {id: "variant3", variant: "variant 3"}
];

const productTypes = [
  {id: "type1", name: "product type 1"},
  {id: "type2", name: "product type 2"},
  {id: "type3", name: "product type 3"}
];

const countries = [
  "Украина",
  "Беларусь",
  "Бразилия"
];

//const root = document.querySelector('#root');

class ProductForm extends Component {
  state = {     //присваивание инстансу класса объект состояния
    productId: '1',
    title: 'a',
    about: '',
    link: '',
    categories: [],
    productType: 'product type 1',
    discount: false,
    country: '- select -',
  };

  handleIdInput = (e) => {
    let val = e.target.value,
    errorIdMessage = null;

    if (val.length && !/^\d+$/gmi.test(val)) {      //валидация
      val = val.replace(/\D/gmi, '');       //форматирование
      errorIdMessage = "Значение поля должно содержать только цифры!";
    }

    this.setState({     //запрос на обновление
      productId: val,
      errorIdMessage,
    });
  };

  handleTitleInput = (e) => {
    let val = e.target.value,
    errorTitleMessage = null;

    if (val.length > 50 ) {
      errorTitleMessage = "Значение должно быть не более 50 символов!";
      this.setState({errorTitleMessage});
    }
    else {
      this.setState({
        title: val,
        errorTitleMessage: null,
      });
    }

  };

  handleTextareaMessage = (e) => {
    let val = e.target.value,
    errorTextareaMessage = null;

    if (val.length > 200 ) {
      errorTextareaMessage = "Значение должно быть не более 200 символов!";
      this.setState({errorTextareaMessage});
    }
    else {
      this.setState({
        about: val,
        errorTextareaMessage: null,
      });
    }
  }

  handleLinkInput = (e) => {
    let val = e.target.value,
    errorLinkMessage = null;
    let isLink = new RegExp('^((ft|htt)ps?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name and extension
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?'+ // port
      '(\\/[-a-z\\d%@_.~+&:]*)*'+ // path
      '(\\?[;&a-z\\d%@_.,~+&:=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

    if(!(isLink.test(val))) {
      errorLinkMessage = "Значение должно быть ссылкой!";
      this.setState({errorLinkMessage});
    }
      this.setState({
        link: val,
        errorLinkMessage,
      })

  };

  handleSelectCategory = (e) => {
    let val = this.state.categories,
    errorSelectCategory = null;

    if (val.find(el => el === e)) {
      val = val.filter(el => el !== e);
    } else {
      val = [...val, e];
    };

    if (val.length === 0) {
      errorSelectCategory = "Выберите хотя бы одну категорию!";
      this.setState({errorSelectCategory});
    }
    this.setState({
      categories: val,
      errorSelectCategory,
    });
  };

  handleSelectType = (e) => {
    let val = e.target.value;
    this.setState({productType: val});
  };

  handleDiscount = (e) => {
    let enabled = e.target.checked;
    this.setState({ discount: enabled });
  };

  handleSelectCountry = (e) => {
    let val = e.target.value,
    errorCountryMessage = null;

    if(val === '- select -') {
      errorCountryMessage = "Выберите страну!";
      this.setState({errorCountryMessage});
    }

    this.setState({
      country: val,
      errorCountryMessage,
    });
  };

  isDisabled = (e) => {
    return (
      this.state.productId === '' ? true :
      this.state.title === '' ? true :
      this.state.categories.length === 0 ? true :
      this.state.productType === '' ? true :
      this.state.country === '- select -' ? true : false
    )
  }

  handleSubmit = (e) => {
    e.preventDefault(); // отменяем отправку формы браузером
    console.log("submit");
    //if (!root) return;
   // делаем что-то
  };


  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit} className="myFormClassName">

          <div>
            <label><span>Product Id </span>
              <input type="text" name="productId" value={this.state.productId} onChange={this.handleIdInput} />
              {this.state.errorIdMessage && (
                <span className="errors">{this.state.errorIdMessage}</span>
              )}
            </label>
          </div>

          <div>
            <label><span>Product name </span>
              <input type="text" name="title" value={this.state.title} onChange={this.handleTitleInput} />
              {this.state.errorTitleMessage && (
                <span className="errors">{this.state.errorTitleMessage}</span>
              )}
            </label>
          </div>

          <div>
            <label htmlFor="textarea"><span>About </span>
              <textarea type="about" name="about" value={this.state.about} onChange={this.handleTextareaMessage} id="textarea"/>
              {this.state.errorTextareaMessage && (
                <span className="errors">{this.state.errorTextareaMessage}</span>
              )}
            </label>
          </div>

          <div>
            <label><span>Link </span>
              <input type="text" name="link" value={this.state.link} onChange={this.handleLinkInput} />
              {this.state.errorLinkMessage && (
                <span className="errors">{this.state.errorLinkMessage}</span>
              )}
            </label>
          </div>

          <div>
            <label htmlFor="checkboxes">Product categories:</label>
            {this.state.errorSelectCategory && (
              <span className="errors">{this.state.errorSelectCategory}</span>
            )}
            {productCategories.map(category => (
              <div key={category.id}>
                <label htmlFor={category.id}>
                  <input type="checkbox" name="checkboxes" id={category.id}
                  checked={this.state.categories.find((el) => el === category)}
                  onChange={() => this.handleSelectCategory(category.variant)
                  } />
                  {category.variant}
                </label>
              </div>
            ))}
          </div>

          <div>
            <label htmlFor="radios">Product type:</label>
            {productTypes.map(type => (
              <div key={type.id}>
                <label htmlFor={type.id}>
                  <input type="radio" name="radios" id={type.id} value={type.name}
                  checked={this.state.productType === type.name} onChange={this.handleSelectType} />
                  {type.name}
                </label>
            	</div>
            ))}
          </div>

          <div>
            <label htmlFor="checkbox-discount"><span>Discount </span>
              <input type="checkbox" name="discount" id="checkbox-discount" checked={this.state.discount} onChange={this.handleDiscount}/>
            </label>
          </div>

          <div>
            <label>Country: <select value={this.state.country} onChange={this.handleSelectCountry}>
              <option>- select -</option>
                {countries.map(countryLabel => (
                  <option key={countryLabel} value={countryLabel}>{countryLabel}</option>
                ))}
              </select>
              {this.state.errorCountryMessage && (
                <span className="errors">{this.state.errorCountryMessage}</span>
              )}
            </label>
          </div>

          <div>
            <input type="submit" name="submit" disabled={this.isDisabled()} />
          </div>

        </form>

        <div className="cards">
          <Products
            productId = {this.state.productId}
            title = {this.state.title}
            about = {this.state.about}
            link = {this.state.link}
            categories = {this.state.categories}
            productType = {this.state.productType}
            discount = {this.state.discount}
            country = {this.state.country}
          />
        </div>
        </>
    )
  }
}


export default ProductForm;

//ProductForm.propTypes = {};

//ProductForm.defaultProps = {};
