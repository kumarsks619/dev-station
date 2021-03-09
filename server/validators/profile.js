const { check } = require('express-validator')

const profileCreateValidator = [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills are required').not().isEmpty(),
]

const profileAddExperienceValidator = [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('from', 'Starting date is required').not().isEmpty(),
]

const profileAddEducationValidator = [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldOfStudy', 'Field of Study is required').not().isEmpty(),
    check('from', 'Starting date is required').not().isEmpty(),
]

module.exports = {
    profileCreateValidator,
    profileAddExperienceValidator,
    profileAddEducationValidator,
}
