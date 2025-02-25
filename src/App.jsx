import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Header from './Header';
import Button from './button';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Posts from './components/Posts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DataFetcher from './components/DataFetcher';
import './index.css';

function Home() {
  return (<div>
    <Header title={"สวัสดี React!"}/>
    <h2>หน้าหลัก</h2>
    <p>ยินดีต้อนรับสู่การพัฒนาเว็บแอปด้วย React</p>
  </div>)

}
function About() {
  const handleClick = () => {
    alert('ชื่อ ณัฐกฤตา อ่านว่า นัด-กริ-ตา');
  };
  return (
    <div>
    <Header title="React Workshop" />
    <p>เรียนรู้พื้นฐานของ React ผ่านการปฏิบัติจริง</p>
    <Button label="กดปุ่มนี้เพื่อรู้จักเรา" onClick={handleClick} />
    </div>
  );
}

function Greeting() {
  const user = {
    name: 'John Doe',
    age: 25,
}
return (
  <div>
    <Header title="React Workshop" />
    <p>ชื่อ: {user.name}, อายุ: {user.age}</p>
    <Button label="ตกลง" onClick={() => alert('สวัสดี ' + user.name)} />
  </div>
);
}
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; }
  }
});

const store = configureStore({ reducer: { counter: counterSlice.reducer } });

function Counter() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(counterSlice.actions.increment())}>+</button>
      <button onClick={() => dispatch(counterSlice.actions.decrement())}>-</button>
    </div>
  );
}

function Store() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="container mx-auto p-6">
          <nav>
            <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/greeting">Greeting</Link> | <Link to="/store">Store</Link>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/greeting" element={<Greeting />} />
            <Route path="/store" element={<Store />} />
          </Routes>
          <Posts />
        </div>
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold text-center mb-6">React API Example</h1>
          <DataFetcher />
        </div>
      </Router>
    </QueryClientProvider>
  );
}


export default App
