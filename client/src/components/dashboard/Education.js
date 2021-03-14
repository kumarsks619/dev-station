import React from 'react'
import { useDispatch } from 'react-redux'
import Moment from 'react-moment'

import { profileDeleteExpEdu } from '../../store/actions/profile'

const Education = ({ educations }) => {
    const dispatch = useDispatch()

    const handleDelete = (eduID) => dispatch(profileDeleteExpEdu(eduID, true))

    return (
        <>
            <h2 className="my-2">Education Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Field Of Study</th>
                        <th className="hide-sm">Years</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {educations.map((edu) => (
                        <tr key={edu._id}>
                            <td>{edu.school}</td>
                            <td className="hide-sm">{edu.degree}</td>
                            <td className="hide-sm">{edu.fieldOfStudy}</td>
                            <td className="hide-sm">
                                <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
                                {edu.current ? (
                                    'Now'
                                ) : (
                                    <Moment format="YYYY/MM/DD">{edu.to}</Moment>
                                )}
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(edu._id)}
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

export default Education
