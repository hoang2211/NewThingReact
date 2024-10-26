import Student from "./Student";


function App() {
  return(
    <>
     <Student name="ZKL" age={19} isStudent={true}/>
    <Student name="L" age={70} isStudent={false}/>
    <Student name="KL" age={19} isStudent={true}/>
    <Student name="Z" age={27} isStudent={false}/>
    <Student />
</>
   
  );
}

export default App
