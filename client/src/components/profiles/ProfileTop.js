import React from 'react'

const ProfileTop = ({
    profile: {
        status,
        company,
        website,
        social,
        location,
        user: { name, avatar },
    },
}) => {
    return (
        <div class="profile-top bg-primary p-2">
            <img src={avatar} alt={name} class="round-img my-1" />

            <h1 class="large">{name}</h1>
            <p class="lead">
                {status} at {company && company}
            </p>
            <p>{location}</p>
            <div class="icons my-1">
                {website && (
                    <a href={website} target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-globe fa-2x"></i>
                    </a>
                )}

                {social && social.twitter && (
                    <a href={social.twitter} target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-twitter fa-2x"></i>
                    </a>
                )}

                {social && social.facebook && (
                    <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-facebook fa-2x"></i>
                    </a>
                )}

                {social && social.linkedin && (
                    <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-linkedin fa-2x"></i>
                    </a>
                )}

                {social && social.instagram && (
                    <a href={social.instagram} target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-instagram fa-2x"></i>
                    </a>
                )}

                {social && social.youtube && (
                    <a href={social.youtube} target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-youtube fa-2x"></i>
                    </a>
                )}
            </div>
        </div>
    )
}

export default ProfileTop
