/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@ostrich-app-db/mongodb';

export interface IAppointment{
    meetingLink:string
    startTime:string
    endTime:string
    title:string
    meetingLength:number
    description:string
    location:string
    attendees:string[]
    createdBy:string
    owner:any
    status:'confirmed'|'cancelled'|'upcoming'
    expectedAttendees:number
}

export interface IAppointmentDocument extends IAppointment, mongoose.Document{
    _doc:any
}

export interface IAppointmentDocumentModel extends mongoose.Model<IAppointmentDocument>{
    getCancelledAppointments: (userId:string) => Promise<any>;
    getUpcomingAppointments: (userId:string) => Promise<any>;
    getPastAppointments: (userId:string) => Promise<any>;
}