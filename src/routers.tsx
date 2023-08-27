import { Routes, Route } from "react-router-dom";
import { Layoutpanel } from "./layouts/layout-panel/layoutPanel";
import { Users } from "./pages/users/users";
import { Clubs } from "./pages/clubs/clubs";
import { Posts } from "./pages/posts/posts";
import { NewTextPost } from "./pages/posts/new-text-post/newTextPost";
import { NewVideoPost } from "./pages/posts/new-video-post/newVideoPost";
import { Payments } from "./pages/payments/payments";

export const Routers: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layoutpanel />}>
        <Route index element={<Users />} />
        <Route path="clubs" element={<Clubs />} />
        <Route path="posts" element={<Posts />} />
        <Route path="posts/text-post" element={<NewTextPost />} />
        <Route path="posts/video-post" element={<NewVideoPost />} />
        <Route path="payments" element={<Payments />} />
      </Route>
    </Routes>
  );
};
