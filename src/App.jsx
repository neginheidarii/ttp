import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Events from './pages/Events.jsx';
import Projects from './pages/Projects.jsx';
import Donate from './pages/Donate.jsx';
import Volunteer from './pages/Volunteer.jsx';
import Blog from './pages/Blog.jsx';
import Post from './pages/Post.jsx';
import ThankYou from './pages/ThankYou.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Post />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
