import React from "react";
import {NavLink } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiAccount } from '@mdi/js';
import { mdiTicket } from '@mdi/js';
import { mdiSilverwareForkKnife } from '@mdi/js';
import { mdiBookOpenPageVariant } from '@mdi/js';
import { mdiMapOutline } from '@mdi/js';
const Nav = () => {
 
  return (
    <div className="">
      <div className="btm-nav flex flex-col pb-5 bg-blanco w-full pb-5  rounded-t">
        <div className="flex m-auto ">
          <NavLink
          to={"./"}
          >
            <button className="btn btn-xs bg-stone-400 border-0">
            <Icon path={mdiMapOutline} size={1} />
            </button>
          </NavLink>
        </div>
        <div className="flex flex-row w-full">
          <NavLink
          to={"./profile"}
          className= "nav-item "
          >
            <i className="icon user-icon">
              <Icon path={mdiAccount} size={1} />
            </i>
            <span className="nav-text text-sm font-bold">Usuari</span>
          </NavLink>
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