import { Route, Routes } from "react-router-dom";
import { Registration } from "./components/Registration";
import { Workspace } from "./components/Workspace"; // Import Workspace
import { ProtectedRoute } from "./components/ProtectedRoute"; // Import ProtectedRoute

function App() {
  return (
    <div>
      <Routes>
        <Route path="login" element={<Registration />} />
        <Route
          path="workspace"
          element={
            <ProtectedRoute>
              <Workspace />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
