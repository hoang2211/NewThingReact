import PropTypes from 'prop-types';
function List(props){
    const itemList= props.items;
    const category = props.category;
    const listItems = itemList.map(item=> <li key={item.id}>
                                         {item.name}:&nbsp;
                                         <b>{item.calories}</b></li>);
    
    return(<>
        <h3>{category}</h3>
        <ol>{listItems}</ol>
        </>);

}
List.propTypes ={
    category: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape( { id:PropTypes.number,
                                                name: PropTypes.string,
                                                calories: PropTypes.number})),
}
List.defaultProps={
    category:"Category",
    item:[],
}
export default List