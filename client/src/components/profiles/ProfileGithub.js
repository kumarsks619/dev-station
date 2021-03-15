import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Loader from '../layout/Loader'
import { profileGetRepos } from '../../store/actions/profile'

const ProfileGithub = ({ githubUsername }) => {
    const dispatch = useDispatch()
    const { repos, isLoading } = useSelector((state) => state.profile)

    useEffect(() => {
        dispatch(profileGetRepos(githubUsername))
    }, [githubUsername, dispatch])

    return isLoading ? (
        <Loader />
    ) : (
        <div class="profile-github">
            <h2 class="text-primary my-1">
                <i class="fab fa-github"></i> Github Repos
            </h2>

            {repos.length > 0 ? (
                repos.map((repo) => (
                    <div key={repo._id} class="repo bg-white my-1 p-1">
                        <div>
                            <h4>
                                <a
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {repo.name}
                                </a>
                            </h4>
                            <p>{repo.description}</p>
                        </div>

                        <div>
                            <ul>
                                <li class="badge badge-primary">
                                    Stars: {repo.stargazers_count}
                                </li>
                                <li class="badge badge-dark">
                                    Watchers: {repo.watchers_count}
                                </li>
                                <li class="badge badge-light">
                                    Forks: {repo.forks_count}
                                </li>
                            </ul>
                        </div>
                    </div>
                ))
            ) : (
                <h4>No Github repos found.</h4>
            )}
        </div>
    )
}

export default ProfileGithub
