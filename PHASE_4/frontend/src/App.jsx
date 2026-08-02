import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideDock from "./components/SideDock";
import MobileNav from "./components/MobileNav";
import Marketplace from "./pages/Marketplace";
import Portal from "./pages/Portal";
import CreateProject from "./pages/CreateProject";
import Background from "./components/Background";
import ProjectDetails from "./pages/ProjectDetails";
import { ProjectProvider } from "./context/ProjectContext";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { useState } from "react";

function App() {

    const [showNotifications, setShowNotifications] = useState(false);

    return (
        <ProjectProvider>
            <BrowserRouter>

                <Background />

                <SideDock disabled={showNotifications} />
                <MobileNav />

                <div className="relative z-10">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Marketplace
                                    showNotifications={showNotifications}
                                    setShowNotifications={setShowNotifications}
                                />
                            }
                        />

                        <Route
                            path="/Portal"
                            element={
                                <Portal
                                    showNotifications={showNotifications}
                                    setShowNotifications={setShowNotifications}
                                />
                            }
                        />

                        <Route
                            path="/project/:id"
                            element={<ProjectDetails />}
                        />

                        <Route
                            path="/create"
                            element={<CreateProject />}
                        />

                        <Route
                            path="/profile"
                            element={<Profile />}
                        />

                        <Route
                            path="/settings"
                            element={<Settings />}
                        />


                    </Routes>
                </div>
            </BrowserRouter>
        </ProjectProvider>
    );
}

export default App;