import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store/store'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { AuthLayout, ErrorBoundary, Signup } from './components/index.js'
import Login from './pages/Login.jsx'
import AllPosts from './pages/AllPosts.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import Myposts from './pages/Myposts.jsx'

/*login and signup wale pages pe jane k liye kisi login ki jarurat nhi kyunki agar login ki jarurat hogi toh login or signup kbhi kr hi nhi payenge*/

const router = createBrowserRouter([
  {
    path : '/',
    element : <App />,
    children :[
    {
      path : '/',
      element : <Home />
    },
    {
      path : '/login',
      element : (
        <AuthLayout authentication = {false}>
          <Login />
        </AuthLayout>
      )
    },
    {
      path : '/signup',
      element : (
        <AuthLayout authentication = {false}>
          <Signup />
        </AuthLayout>
      )
    },
    {
      path : "/all-posts",
      element : (
        <AuthLayout authentication>
          {" "}
          <AllPosts />
        </AuthLayout>
      )
    },
    {
      path : "/add-post",
      element : (
        <AuthLayout authentication>
          {" "}
          <AddPost />
        </AuthLayout>
      )
    },
    {
      path : "/edit-post/:slug",
      element : (
        <AuthLayout authentication>
          {" "}
          <EditPost />
        </AuthLayout>
      )
    },
    {
      path : "/post/:slug",
      element : <Post />
    },
    {
      path: "/my-posts",
      element :  (
        <AuthLayout authentication>
          {" "}
          <Myposts />
        </AuthLayout>
      )
    }
  ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </Provider>
  </StrictMode>,
)
