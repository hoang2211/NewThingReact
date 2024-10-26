import UserGreeting from "./UserGreeting";

function App() {
    return(
      <>
      <UserGreeting isLoggedIn={false} username="test"/>
      </>
    );
}

export default App
