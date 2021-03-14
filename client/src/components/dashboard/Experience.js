import React from 'react'
import { useDispatch } from 'react-redux'
import Moment from 'react-moment'

import { profileDeleteExpEdu } from '../../store/actions/profile'

const Experience = ({ experiences }) => {
    const dispatch = useDispatch()

    const handleDelete = (expID) => dispatch(profileDeleteExpEdu(expID))

    return (
        <>
            <h2 className="my-2">Experience Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Location</th>
                        <th className="hide-sm">Years</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {experiences.map((exp) => (
                        <tr key={exp._id}>
                            <td>{exp.company}</td>
                            <td className="hide-sm">{exp.title}</td>
                            <td className="hide-sm">{exp.location}</td>
                            <td className="hide-sm">
                                <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
                                {exp.current ? (
                                    'Now'
                                ) : (
                                    <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                                )}
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(exp._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Experience
