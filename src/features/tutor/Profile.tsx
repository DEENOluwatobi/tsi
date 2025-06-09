import React from 'react';

interface Tutor {
    firstname: string;
    lastname: string;
    course: string;
}

interface ProfilePageProps {
    tutor: Tutor;
}

const Profile = ({ tutor }: ProfilePageProps) => {
    return (
        <div>Profile</div>
    )
}

export default Profile