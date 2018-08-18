import React, { Component } from 'react';
import './App.css';
import ListItem from './ListItem';
import Item from './Item';
import { findTotal, getAllItem, postItem } from './util';

class App extends Component {
  constructor(){
    super();
    this.state = {
      itemList: [],
      showItemForm: false,
      tempName: null,
      tempValue: 0,
      error: null
    };
    this._addItem = this._addItem.bind(this);
    this._handeNameChange = this._handeNameChange.bind(this);
    this._handeValueChange = this._handeValueChange.bind(this);
    this._handleAddButtonclick = this._handleAddButtonclick.bind(this);
  }

  componentWillMount() {
    fetch("http://192.168.13.206:3001/api/items")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            itemList: result          
          });
        },
    )
  }

  _addItem() {
    const { itemList, tempName, tempValue, error } = this.state;
    if(!tempName){
      this.setState({error: 'Item not a string'});
    } else {
      if(!error) {
        let tempItemList = new Array();
        tempItemList = itemList.concat({id: tempName, name: tempName, amount: tempValue});
        const postResponse = postItem({id: tempName, name: tempName, amount: tempValue});
        console.log(postResponse);
        this.setState({ itemList: tempItemList, showItemForm: false, tempName: null, tempValue: null });
      }
    }
  }

  _handeNameChange(value) {
    this.setState({tempName: value});
  }

  _handeValueChange(value) {
    if((isNaN(value) || !isFinite(value)&&value)){
      this.setState({error: 'Amount not a number'});
    } else {
      this.setState({tempValue: value, error: null})
    }
  }

  _handleAddButtonclick() {
    this.setState({showItemForm: true});
  }

  render() {
    const { itemList, showItemForm, error } = this.state;

    return (
      <div className="App">
      <table>
        <th>Item</th>
        <th>Value</th>
        {
          itemList && itemList.map((item) => {
          return <ListItem key={item.name} listitem={item}/>})
        }
      </table>
      <div>Total = {itemList && findTotal(itemList)}</div>
      <Item
        shouldRender={showItemForm}
        handleNameChange={this._handeNameChange}
        handleValueChange={this._handeValueChange}
        addItem={this._addItem}
        error={error} 
      />
      {!showItemForm && <button onClick={this._handleAddButtonclick}>Add Item </button>}
      </div>
    );
  }
}

export default App;
