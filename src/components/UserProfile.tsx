import { useEffect } from "react"

const UserProfile = (): JSX.Element => {

    useEffect(() => {
        console.log('user profile')
    }, [])

    useEffect(() => {

        console.log("This is the use effect from the user profile ")
    })
    return (
        <div>

            <h1>User Profile</h1>
            <h1>This is a profile of Peter Parker</h1>
        </div>
    )
}
export default UserProfile