import React from "react";
import { useDispatch, useSelector } from "react-redux"
import { handleNavBut } from "../../actions";
import { lazy, Suspense} from 'react'

const LazyAll = lazy(() => import('./all'))

export default function NavBut() {
    
    const dispatch = useDispatch()

    const navBut = (activeNavBut) => {
        dispatch(handleNavBut(activeNavBut))
    }

    const active = useSelector((state) => state.activeNavBut)
    const activeDiv = useSelector((state) => state.active);
    return(
        <>
        {!activeDiv && (
        <>
        <div className="row navButChat">
            <button className="normBut navBut" 
            onClick={() => navBut(1)}>Last</button>
        </div>
        <div className="users">
            {active === 1 && (
                <Suspense fallback={<h1 className="p" style={{textAlign: 'center'}}>Loading...</h1>}><LazyAll /></Suspense>
            )}
        </div>
        </>)}
        </>
        )
}