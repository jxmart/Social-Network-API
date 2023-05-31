const router = require('express').Router();

const {
    getAllThoughts,
    getSingleThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createThoughtReaction,
    deleteThoughtReaction
} = require('../../controllers/thought-controller');

router.route('/').get(getAllThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(createThoughtReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteThoughtReaction);

module.exports = router;