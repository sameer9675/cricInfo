import React, { useState } from "react";
import Team from "./Team";

function OnGoingSeries() {

    const [showTeam, setShowTeam] = useState(false);

    const handleShowTeam = () => {
        setShowTeam(true);
    }

    return (
        <>
            {
                !showTeam ? (
                    <button
                        onClick={handleShowTeam}
                    >
                        IPL
                    </button>
                ) : (
                    <Team
                        id='76ae85e2-88e5-4e99-83e4-5f352108aebc'
                    />
                )
            }
        </>
    )
}

export default OnGoingSeries;

