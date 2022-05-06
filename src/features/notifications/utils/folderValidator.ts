/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {  INotificationValidator } from '../interfaces';

class UserInfoValidator implements INotificationValidator{
	isValidNotification = (name: string) => {
		if (name) 
			return true;
		
		return false;
	};
}

export default new UserInfoValidator();
