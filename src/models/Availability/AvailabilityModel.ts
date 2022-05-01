/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from '@ostrich-db/mongodb';
export type dayValueType =
	| 'Monday'
	| 'Tuesday'
	| 'Wednesday'
	| 'Thursday'
	| 'Friday'
	| 'Saturday'
	| 'Sunday';
export type dayInitialType =
	| 'mon'
	| 'tue'
	| 'wed'
	| 'thu'
	| 'fri'
	| 'sat'
	| 'sun';
export type dayType = 'M' | 'T' | 'W' | 'F' | 'S';
export type AvailabilityType = {
	startTime: string;
	endTime: string;
	days: AvailabilityDayType[];
};
export type AvailabilityDayType = {
	day: dayType;
	value: dayValueType;
	initial: dayInitialType;
	position: number;
};

export type AvailabilityTypeMain = {
	user: Record<string, any>;
	availability: AvailabilityType;
	_doc: any;
};

export type AvailabilityDocumentType = {
	[x: string]: any;
} & mongoose.Document &
	AvailabilityTypeMain;

export type AvailabilityModelType = {
	findByName: (name: string) => Promise<AvailabilityDocumentType>;
	findById: (id: string) => Promise<AvailabilityDocumentType>;
} & mongoose.Model<AvailabilityDocumentType>;

const AvailabilitySchema: mongoose.Schema<AvailabilityDocumentType> =
	new mongoose.Schema(
		{
			user: {
				type: mongoose.SchemaTypes.ObjectId,
				ref: 'User',
				required: [true, 'You must be a valid user']
			},
			availability: {
				type: {
					days: [
						{
							position: {
								type: Number
							},
							initial: {
								type: String
							},
							value: {
								type: String
							},
							day: { type: String, uppercase: true }
						}
					],
					startTime: {
						type: String
					},
					endTime: { type: String }
				}
			}
		},
		{ timestamps: true }
	);
const AvailabilityModel = mongoose.model<
	AvailabilityDocumentType,
	AvailabilityModelType
>('Availability', AvailabilitySchema);

export default AvailabilityModel;
