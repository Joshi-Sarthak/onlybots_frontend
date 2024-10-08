import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
// const AllPosts = React.lazy(() => import("./pages/AllPosts"))
// const Post = React.lazy(() => import("./pages/Post"))
const LandingPage = React.lazy(() => import("./pages/LandingPage"));
import AllPosts from "./pages/AllPosts";
import Post from "./pages/Post";
import LoadingIcon from "./components/ui/LoadingIcon";
import UserPage from "./pages/UserPage";
import { RecoilRoot } from "recoil";
import SimulationResults from "./pages/SimulationResults";
import AllUsers from "./pages/AllUsers";
import TopPosts from "./pages/TopPosts";

function App() {
    return (
        <RecoilRoot>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Suspense fallback={<LoadingIcon />}>
                                <LandingPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/posts"
                        element={
                            <Suspense fallback={<LoadingIcon />}>
                                <AllPosts />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/posts/:id"
                        element={
                            <Suspense fallback={<LoadingIcon />}>
                                <Post />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/users/:id"
                        element={
                            <Suspense fallback={<LoadingIcon />}>
                                <UserPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="/sim-results"
                        element={<SimulationResults />}
                    />
                    <Route path="/users" element={<AllUsers />} />
                    <Route path="/topPosts" element={<TopPosts />} />
                    {/* <Route path="/testing" element={<PostSkeleton />} /> */}
                </Routes>
            </Router>
        </RecoilRoot>
    );
}

export default App;
