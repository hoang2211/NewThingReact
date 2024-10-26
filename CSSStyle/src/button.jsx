
function Button(){
    
        const style ={
            
                backgroundcolor: "hsl(172, 99%, 50%)",
                color: "white",
                padding: "10px 20px",
                borderradius: "5px",
                border: "none",
                cursor: "pointer",
              
        }
        return(
        <button style={style}>Click Me</button> 
    );
}
export default Button;