import React from "react";
import WelCome from "./MainNavigation";

const Root = (props) => {
    return (<>
        <WelCome />
        <main>
            {props.children}
        </main>
    </>
    )
}
export default Root;