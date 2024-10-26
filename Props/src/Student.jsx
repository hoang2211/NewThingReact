import PropTypes from 'prop-types'

function Student(props){
    return(
        <div className="Student">
            <p>Names: {props.name}</p>
            <p>Ages: {props.age}</p>
            <p>Is Student: {props.isStudent ? "yes" : "no"}</p>
        </div>
    );
}
Student.propTypes ={
    name: PropTypes.string,
    age: PropTypes.number,
    isStudent: PropTypes.bool,
}
Student.defaultProps ={
    name: "Guest",
    age: 0,
    isStudent: false,
}
export default Student;