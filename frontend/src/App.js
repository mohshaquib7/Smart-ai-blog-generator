import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Navbar from "./components/Navbar";
import GeneratorPage from "./pages/GeneratorPage";
import HistoryPage from "./pages/HistoryPage";
import BlogDetailPage from "./pages/BlogDetailPage";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<GeneratorPage />} />
                    <Route path="/history" element={<HistoryPage />} />
                    <Route path="/blog/:id" element={<BlogDetailPage />} />
                </Routes>
                <Toaster position="bottom-right" richColors />
            </BrowserRouter>
        </div>
    );
}

export default App;
