import { combineReducers } from "redux";
import { Login } from "./login";
import { User } from "./user";
import { Search } from "./Search";
import Home from "./home";
import { ArticalReducer } from "./artical";

export default combineReducers({ Login, User, Home, Search, ArticalReducer });
