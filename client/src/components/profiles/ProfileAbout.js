import React from 'react'

const ProfileAbout = ({
    profile: {
        user: { name },
        bio,
        skills,
    },
}) => {
    return (
        <div className="profile-about bg-light p-2">
            {bio && (
                <>
                    <h2 className="text-primary">{name.trim().split(' ')[0]}'s Bio</h2>
                    <p>{bio}</p>
                </>
            )}
            <div className="line"></div>
            <h2 className="text-primary">Skills Set</h2>
            <div className="skills">
                {skills.map((skill, index) => (
                    <div className="p-1" key={index}>
                        <i className="fa fa-check"></i> {skill}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProfileAbout
