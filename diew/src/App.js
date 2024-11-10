import './App.css';
import Message from './components/Message';
import Chat from './components/Chat';
// import History from './components/History';

function App() {
  return (
    <div className="App">
      <h1>Chat</h1>
      
      <Chat />
      {/* <History /> */}
    </div>
  );
}

export default App;
