import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import PlayerDetails from './PlayerDetails';
import EditPlayer from "./EditPlayer.jsx";
import Footer from './Footer';  // Import the Footer component

function App() {
    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/player/:id" element={<PlayerDetails />} />
                <Route path="/edit/:id" element={<EditPlayer />} />
            </Routes>

            {/*<Footer /> /!* Footer will appear at the bottom of the page *!/*/}
        </div>
    );
}

export default App;
