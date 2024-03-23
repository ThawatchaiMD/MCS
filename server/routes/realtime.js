const express = require("express");
const router = express.Router();


// middleware
const { auth, adminCheck } = require("../middleware/auth");

// controllers
const { realtimeData }  = require("../controllers/realtime");

/**
 * @swagger
 * /api/realtimedata/{id}:
 *   get:
 *     summary: Get realtime data for a specific device
 *     tags:
 *       - Realtime Data
 *     parameters:
 *       - in: header
 *         name: authtoken
 *         required: true
 *         schema:
 *           type: string
 *         description: Authorization token (JWT)
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the device to fetch realtime data for.
 *     responses:
 *       200:
 *         description: Realtime data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: Name of the data point
 *                   value:
 *                     type: string
 *                     description: Value of the data point
 *                   unit:
 *                     type: string
 *                     description: Unit of the data point
 *       404:
 *         description: Device not found
 *       500:
 *         description: Server error
 */

// Enpoint http: //localhost:3000/api/building
// Method POST
// Access Private
router.get("/realtimedata/:id", auth, realtimeData);

module.exports = router;