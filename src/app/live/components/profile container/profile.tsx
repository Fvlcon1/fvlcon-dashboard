'use client'

import Cameralinks from "./camera links/cameraLinks"
import Controls from "./controls"
import Databases from "./databases/databases"
import Player from "./player/player"

const Profile = () => {
    return (
        <div
            className="fixed overflow-y-auto top-0 left-[70px] flex flex-col w-[220px] h-[100vh] bg-bg-tetiary p-3 py-6 gap-3 items-center"
        >
            {/* <Controls /> */}
            {/* <Player /> */}
            <Cameralinks />
            <Databases />
        </div>
    )
}
export default Profile