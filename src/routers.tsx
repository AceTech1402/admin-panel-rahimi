import { Routes, Route } from "react-router-dom"
import { Layoutpanel } from "./layouts/layout-panel/layoutPanel"
import { Users } from "./pages/users/users"
import { Clubs } from "./pages/clubs/clubs"

export const Routers: React.FC = () => {
  return(
    <Routes>
      <Route path="/" element={<Layoutpanel />} >
        <Route index element={<Users />} />
        <Route path="clubs" element={<Clubs />} />
      </Route>
    </Routes>
  )
}