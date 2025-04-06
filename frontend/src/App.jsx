import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import PlayerDetails from './PlayerDetails';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/player/:id" element={<PlayerDetails />} />
        </Routes>
    );
}

export default App;
