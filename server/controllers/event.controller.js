const Event = require('../models/event.model');

exports.getEventsByDate = async (req, res) => {
    try {
        let { startDate, endDate } = req.query;
        //expected result: YYY-MMM-DDD
        console.log({ startDate, endDate });

        const events = Event.find({
            date: {
                $gte: new Date(new Date(startDate).setHours(00, 00, 00)),
                $lt: new Date(new Date(endDate).setHours(23, 59, 59))
            }
        }).sort({ date: 'asc' })
        
        if (!events) {
            return res.status(404).json({
                status: 'failure',
                message: 'could not retrieve events'
            })
        }
        
        res.status(200).json({
            status: 'success',
            data: events
        })
    }
    catch (error) {
        return res.status(500).json({
            status: 'failure',
            error: error.message
        })
    }    
}