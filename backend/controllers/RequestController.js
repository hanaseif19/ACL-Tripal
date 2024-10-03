const mongoose = require("mongoose");
const Request = require("../models/Request.js");

const createRequest = async (req, res) => {
    const { userName, email, password, role } = req.body;
    try {
        if (!userName ||!email || !password || !role ) {
            res.status(406).json('All fields are required!');
        }
        const createdRequest = await Request.create({ userName,email,password,role });
        res.status(201).json(createdRequest);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}
    

const getRequests = async (req, res) => {
    try {
        const reqs = await Request.find();

        if (reqs.length === 0) {
            return res.status(404).json('No requests found');
        }

        res.status(200).json(reqs);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const deleteRequest = async (req, res) => {
    const { id } = req.params;
    try {
        const req = await Request.findByIdAndDelete(id);

        return res.status(200).json('request deleted successfully')
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    createRequest,
    getRequests,
    deleteRequest
  }