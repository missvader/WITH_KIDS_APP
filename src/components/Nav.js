import React from "react";
import {NavLink } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthProvider";
import { useContext } from "react";
import Icon from '@mdi/react';
import { mdiAccount } from '@mdi/js';
import { mdiTicket } from '@mdi/js';
import { mdiSilverwareForkKnife } from '@mdi/js';
import { mdiBookOpenPageVariant } from '@mdi/js';
import { mdiMapOutline } from '@mdi/js';
import './Nav.css'
const Nav = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="absolute">
      <div className="btm-nav flex flex-col py-5 bg-blanco w-full rounded-t border border-1 border-stone-400">
        <div className="flex m-auto pb-7">
          <NavLink
          to={"./"}
          >
            <button className=" bg-stone-400 btn btn-xs border-0 lg:btn lg:rounded-full ">
            <Icon path={mdiMapOutline} size={1} className=""/>
            </button>
          </NavLink>
        </div>
        <div className="flex flex-row w-full py-10 justify-around ">
          {currentUser !== null?
          (<NavLink
          to={"./profile"}
          className= "nav-item "
          >
            <i className="icon user-icon">
              <Icon path={mdiAccount} size={1} />
            </i>
            <span className="nav-text text-sm font-bold">Usuari</span>
          </NavLink>)
          : (<NavLink
            to={"./login"}
            className= "nav-item "
            >
              <i className="icon user-icon">
                <Icon path={mdiAccount} size={1} />
              </i>
              <span className="nav-text text-sm font-bold">Login</span>
            </NavLink>)}
          <NavLink 
        to={"./agendaCultural"}
        className="nav-item ">
        <i className="icon agenda-icon">
          <Icon path={mdiTicket} size={1} />
        </i>
        <span className="nav-text text-sm font-bold">Agenda</span>
      </NavLink>
      <NavLink 
        to={"./restaurants"}
        className="nav-item ">
        <i className=" icon restaurant-icon">
          <Icon path={mdiSilverwareForkKnife}  size={1} />
        </i>
        <span className="nav-text text-sm font-bold">Restaurants</span>
      </NavLink>
      <NavLink 
        to={"./agendaBiblio"}
        className="nav-item">
        <i className=" icon biblio-icon">
          <Icon path={mdiBookOpenPageVariant} size={1} />
        </i>
        <span className="nav-text text-sm font-bold">BiblioAgenda</span>
      </NavLink>
        </div>
  
        </div>
</div>
    
  )
}

export default Nav;