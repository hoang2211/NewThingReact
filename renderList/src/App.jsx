import List from "./List";
 

function App() {
  const fruits =[ {id:1,name:"apples", calories: 95},
                  {id:2,name:"oranges", calories: 45},
                  {id:3,name:"banana", calories: 105},
                  {id:4,name:"coconut", calories: 159}];
  
  const vegetables =[ {id:1,name:"corn", calories: 140},
                  {id:2,name:"celery", calories: 15},
                  {id:3,name:"tomatoes", calories: 30},
                  {id:4,name:"potatoes", calories: 60}];
  
  
  return(<>
    {fruits.length >0 && <List items={fruits} category="Fruits"/> }
    {vegetables.length>0 && <List items={vegetables} category="Vegetables"/>}
    </>);

}

export default App
