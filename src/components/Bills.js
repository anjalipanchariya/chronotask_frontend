import React from "react";
import '../styles/Bills.css'
import { AiFillPlusCircle } from "react-icons/ai";
import { BiSolidPlusCircle } from "react-icons/bi";
function Bills() {

    const billslist = ["Water", "Light", "Tax"]

    return (
        <>
            <div className="billsdiv">
                <div >
                    <div className="upcombills">
                        <p>Upcoming bills</p>
                        {billslist.map((item, index) => (
                            <div key={index} className="billslist">
                                <input value={item} type="checkbox" />
                                <span>{item}</span>
                            </div>
                        ))}
                        <div className="icon">
                            <BiSolidPlusCircle size={"50px"} />
                        </div>
                        
                    </div>
                </div>

                <div>
                    Calendar
                </div>
            </div>


        </>
    )
}

export default Bills;