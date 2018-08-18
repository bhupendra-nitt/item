const findTotal = (itemList) => {
  let sum = 0;
  itemList && itemList.map(item => {
    sum = sum + parseFloat(item.amount);
  })
  return sum;
};

const getAllItem = () => {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      return JSON.parse(xhttp.responseText);
    }
  };
  xhttp.open("GET", 'http://192.168.13.206:3001/api/items', true);
  xhttp.send();
};

const postItem = ({ id, name, amount }) => {
  var xhttp = new XMLHttpRequest();    
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      return JSON.parse(xhttp.responseText);
    }
    if(this.status == 400) {
      return {error: 'Something went wrong'};
    }
  };
  xhttp.open("POST", "http://192.168.13.206:3001/api/item");
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(JSON.stringify({ id: id, amount: parseFloat(amount), name: name  }));
};

export { findTotal, getAllItem, postItem };
