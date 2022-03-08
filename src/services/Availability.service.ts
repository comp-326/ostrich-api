import { AvailabilityModel, UserModel } from './../models/index';
import { NextFunction, Response } from 'express';
import { IRequest } from './../types/request.d';
class Availability {
    func = async (req: IRequest, res: Response, next: NextFunction) => { }
    createAvailability = async function (
        req: IRequest,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const availability = await AvailabilityModel.create({
                ...req.body,
                user: req.user.userId,
            })
            const user = UserModel.findByIdAndUpdate(req.user.userId, {
                $push: { availability: availability._id },
            }).populate("availability", "availability")
            return res.status(200).json({
                success: true,
                user,
                message: "Sucessfully added your availability",
            })
        } catch (error) {
            return next(error)
        }
    }
    deleteAvailability = async (
        req: IRequest,
        res: Response,
        next: NextFunction,
    ) => {
        try {
            const availabilityId = req.params.availabilityId
            await AvailabilityModel.findByIdAndDelete(availabilityId)
            UserModel.findByIdAndUpdate(req.user.userId, {
                $pull: { availability: availabilityId },
            })
                .populate("availability", "availability")
                .exec(async function (err, user) {
                    if (err) {
                        return next(err)
                    }
                    return res.status(200).json({
                        success: true,
                        user,
                        message: "Sucessfully deleted your availability",
                    })
                })
        } catch (error) {
            next(error)
        }
    }
}



export default Availability