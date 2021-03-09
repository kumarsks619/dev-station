const { validationResult } = require('express-validator')
const request = require('request')

const Profile = require('../models/Profile')
const User = require('../models/User')

const profileGetMine = async (req, res) => {
    try {
        const foundProfile = await Profile.findOne({ user: req.user.id }).populate(
            'user',
            ['name', 'avatar']
        )
        if (!foundProfile) {
            return res.status(404).json({ msg: 'Profile not found for this user' })
        }

        return res.json(foundProfile)
    } catch (err) {
        console.error(err.message)
        return res.status(500).send('Server Error')
    }
}

const profileCreate = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {
        company,
        website,
        location,
        bio,
        status,
        githubUsername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin,
    } = req.body

    // building profile object
    const profileFields = {}

    profileFields.user = req.user.id
    if (company) profileFields.company = company
    if (website) profileFields.website = website
    if (location) profileFields.location = location
    if (bio) profileFields.bio = bio
    if (status) profileFields.status = status
    if (githubUsername) profileFields.githubUsername = githubUsername
    if (skills) {
        profileFields.skills = skills.split(',').map((skill) => skill.trim())
    }

    // building social links object
    profileFields.social = {}

    if (youtube) profileFields.social.youtube = youtube
    if (twitter) profileFields.social.twitter = twitter
    if (facebook) profileFields.social.facebook = facebook
    if (linkedin) profileFields.social.linkedin = linkedin
    if (instagram) profileFields.social.instagram = instagram

    try {
        const foundProfile = await Profile.findOne({ user: req.user.id })

        if (foundProfile) {
            // if profile already exists, then update the profile
            const updatedProfile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            )

            return res.json(updatedProfile)
        }

        // if no profile found, then create a new profile
        const newProfile = new Profile(profileFields)
        await newProfile.save()

        return res.json(newProfile)
    } catch (err) {
        console.error(err.message)
        return res.status(500).send('Server Error')
    }
}

const profileGetAll = async (req, res) => {
    try {
        const foundProfiles = await Profile.find().populate('user', ['name', 'avatar'])
        return res.json(foundProfiles)
    } catch (err) {
        console.error(err.message)
        return res.send('Server Error')
    }
}

const profileGetByUserID = async (req, res) => {
    try {
        const foundProfile = await Profile.findOne({
            user: req.params.userID,
        }).populate('user', ['name', 'avatar'])
        if (!foundProfile) {
            return res.status(404).json({ msg: 'No profile found for this user ID' })
        }

        return res.json(foundProfile)
    } catch (err) {
        // custom catch based on error kind
        if (err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'No profile found for this user ID' })
        }
        console.error(err.message)
        return res.send('Server Error')
    }
}

const profileDeleteCompletely = async (req, res) => {
    try {
        // TODO: remove user's posts

        // removing user's profile
        await Profile.findOneAndRemove({ user: req.user.id })

        // removing user
        await User.findOneAndRemove({ _id: req.user.id })

        res.json({ msg: 'User deleted' })
    } catch (err) {
        console.error(err.message)
        return res.send('Server Error')
    }
}

const profileAddExperience = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { title, company, location, from, to, current, description } = req.body

    const newExperience = {
        title,
        company,
        location,
        from,
        to,
        current,
        description,
    }

    try {
        const foundProfile = await Profile.findOne({ user: req.user.id })
        if (!foundProfile) {
            return res.status(404).json({ msg: 'No profile found for this user' })
        }

        foundProfile.experience.unshift(newExperience)
        await foundProfile.save()

        res.json(foundProfile)
    } catch (err) {
        console.error(err.message)
        return res.send('Server Error')
    }
}

const profileDeleteExperience = async (req, res) => {
    try {
        const foundProfile = await Profile.findOne({ user: req.user.id })
        if (!foundProfile) {
            return res.status(404).json({ msg: 'No profile found for this user' })
        }

        // getting the index of the experience to be removed
        const removeIndex = foundProfile.experience.findIndex(
            (exp) => exp.id === req.params.expID
        )

        if (removeIndex === -1) {
            return res
                .status(404)
                .json({ msg: 'No experience found with this experience ID' })
        }

        foundProfile.experience.splice(removeIndex, 1)
        foundProfile.save()

        return res.json(foundProfile)
    } catch (err) {
        console.error(err.message)
        return res.send('Server Error')
    }
}

const profileAddEducation = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { school, degree, fieldOfStudy, from, to, current, description } = req.body

    const newEducation = {
        school,
        degree,
        fieldOfStudy,
        from,
        to,
        current,
        description,
    }

    try {
        const foundProfile = await Profile.findOne({ user: req.user.id })
        if (!foundProfile) {
            return res.status(404).json({ msg: 'No profile found for this user' })
        }

        foundProfile.education.unshift(newEducation)
        await foundProfile.save()

        res.json(foundProfile)
    } catch (err) {
        console.error(err.message)
        return res.send('Server Error')
    }
}

const profileDeleteEducation = async (req, res) => {
    try {
        const foundProfile = await Profile.findOne({ user: req.user.id })
        if (!foundProfile) {
            return res.status(404).json({ msg: 'No profile found for this user' })
        }

        // getting the index of the education to be removed
        const removeIndex = foundProfile.education.findIndex(
            (exp) => exp.id === req.params.eduID
        )

        if (removeIndex === -1) {
            return res
                .status(404)
                .json({ msg: 'No education found with this education ID' })
        }

        foundProfile.education.splice(removeIndex, 1)
        foundProfile.save()

        return res.json(foundProfile)
    } catch (err) {
        console.error(err.message)
        return res.send('Server Error')
    }
}

const profileGetGithubRepos = async (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.githubUsername}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET_KEY}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' },
        }

        request(options, (error, response, body) => {
            if (error) {
                console.error(error)
            }

            if (response.statusCode !== 200) {
                return res
                    .status(404)
                    .json({ msg: 'No Github profile found with this username' })
            }

            return res.json(JSON.parse(body))
        })
    } catch (err) {
        console.error(err.message)
        return res.send('Server Error')
    }
}

module.exports = {
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
}
