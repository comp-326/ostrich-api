import mongoose from "mongoose"
/** 
 * *********** FOLDER ************
 */

import { IImageAsset } from ".";

export type IFolder = {
    [props: string]: any
    title: string
    image1Url: IImageAsset
    image2Url: IImageAsset
    image3Url: IImageAsset
    image4Url: IImageAsset
    image5Url: IImageAsset
    image6Url: IImageAsset
    description: string
    videoUrl: IImageAsset
    isStandout: boolean
    audioUrl: IImageAsset
    comments: Record<string, any>[]
    likes: number
    shares: number
    owner: Record<string, any>
    logo: IImageAsset
    size: number
    type: string
    country: string
    locationType: string
    population: number
    views: number
    location: {
        latitude: string
        longitude: string
        city: string
    }
    prompts: {
        type: string
        data: any
    }[]
    finances: {
        tuitionFeeUnderGraduate: number
        tuitionFeeGraduate: number
        tuitionFeePostGraduate: number
        scholarshipAverage: number
        scholarshipChances: number
        internationalFeeDifferential: number
        tuitionFeDeposit: number
        tuitionPricingCategory: string

    }
    _doc: any
}

export type IFolderDocument = {
    [x: string]: any
} & IFolder & mongoose.Document

export type IFolderModel = {
    findByName: (name: string) => Promise<IFolderDocument>
} & mongoose.Model<IFolderDocument>