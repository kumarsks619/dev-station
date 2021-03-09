const express = require('express')

const auth = require('../middleware/auth')
const {
    profileGetMine,
    profileCreate,
    profileGetAll,
    profileGetByUserID,
    profileDeleteCompletely,
    profileAddExperience,
    profileDeleteExperience,
    profileAddEducation,
    profileDeleteEducation,
    profileGetGithubRepos,
} = require('../controllers/profile')
const {
    profileCreateValidator,
    profileAddExperienceValidator,
    profileAddEducationValidator,
} = require('../validators/profile')

const router = express.Router()

// @route   GET api/profiles/me
// @desc    To get current (logged in) user's profile
// @access  Private
router.get('/me', auth, profileGetMine)

// @route   POST api/profiles
// @desc    To create or update current user's profile
// @access  Private
router.post('/', auth, profileCreateValidator, profileCreate)

// @route   GET api/profiles
// @desc    To get all profiles
// @access  Public
router.get('/', profileGetAll)

// @route   GET api/profiles/:userID
// @desc    To get profile by user ID
// @access  Public
router.get('/:userID', profileGetByUserID)

// @route   DELETE api/profiles
// @desc    To delete a user's profile completely along with the user and its posts
// @access  Private
router.delete('/', auth, profileDeleteCompletely)

// @route   PATCH api/profiles/experience
// @desc    To add an experience to current (logged in) user's profile
// @access  Private
router.patch('/experience', auth, profileAddExperienceValidator, profileAddExperience)

// @route   DELETE api/profiles/experience/:experienceID
// @desc    To delete an experience from current (logged in) user's profile
// @access  Private
router.delete('/experience/:expID', auth, profileDeleteExperience)

// @route   PATCH api/profiles/education
// @desc    To add an education to current (logged in) user's profile
// @access  Private
router.patch('/education', auth, profileAddEducationValidator, profileAddEducation)

// @route   DELETE api/profiles/education/:educationID
// @desc    To delete an education from current (logged in) user's profile
// @access  Private
router.delete('/education/:eduID', auth, profileDeleteEducation)

// @route   GET api/profiles/github/:githubUsername
// @desc    To get a user's latest github repositories
// @access  Public
router.get('/github/:githubUsername', profileGetGithubRepos)

module.exports = router
