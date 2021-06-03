import { API, Auth, Storage } from "aws-amplify";
import { Constants } from '../models/constants.model';
import { CognitoUserSession, CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { ResponseMessage } from '../models/response.model';
import { LocalStorageHelper } from './localstorage.utils';
import { environment } from '../../../environments/environment';

export class AmplifyHelper {

    private static API_NAME = Constants.API_NAME;

    // API METHODS

    static async post<T>(path: string, obj?: any): Promise<ResponseMessage<T>> {
        let access = { AppName: Constants.APP_NAME, UserAccess: LocalStorageHelper.getUserId() };
        let _body = {
            body: obj ? { ...obj, ...access } : { ...access }
        };

        try {
            let { status, message, data, validate, length, name } = await API.post(this.API_NAME, path, _body);
            if (status == Constants.STATUS.Success)
                return new ResponseMessage<T>(status, message, <T>data, validate, length, name);
            else
                return new ResponseMessage<T>(status, message, null, validate);
        } catch (error) {
            //console.log(error);
            return new ResponseMessage<T>(Constants.STATUS.Error, "Ocurrio un error :( , intentelo nuevamente.", null);
        }
    }

    static async fileUpload(path: string, file: File): Promise<ResponseMessage<string>> {
        let responseMessage: ResponseMessage<string>;
        try {
            let parts = path.lastIndexOf(".");
            let random = new Date().getTime();
            let originalName = path.slice(0, parts);
            let extension = path.slice(parts + 1);
            let response = await Storage.put(`${originalName}_${random}.${extension}`, file);

            if (response['key'] != null && response['key'] != '') {
                responseMessage = new ResponseMessage<string>(Constants.STATUS.Success, Constants.STATUS_MESSAGES.Success, <string>response['key']);
            } else {
                responseMessage = new ResponseMessage<string>(Constants.STATUS.Error, 'Hubo un error al subir el archivo', null);
            }
        } catch (error) {
            responseMessage = new ResponseMessage<string>(Constants.STATUS.Error, 'Hubo un error al subir el archivo', null);
        }
        return responseMessage;
    }

    static async getSignedURL(path: string): Promise<string> {
        let url = await Storage.get(path, { expires: 300 });
        return <string>url;
    }

    static async getSignedURLWithCredentials(path: string): Promise<string> {
        // let url = await Storage.get(path, {
        //     expires: 300,
        //     credentials: {
        //         accessKeyId: '',
        //         secretAccessKey: ''
        //     }
        // });
        // return <string>url;
        if (environment.production) {
            return `/public/${path}`;
        } else {
            return `https://sitel.awsperu.dev/public/${path}`;
        }
    }

    // USER MANAGEMENT

    static login(email: string, password: string): Promise<any> {
        let credentials = {
            username: email,
            password: password
        };
        return Auth.signIn(credentials);
    }

    static register(email: string, password: string): Promise<any> {
        let data = {
            username: email,
            password: password
        };
        return Auth.signUp(data);
    }

    static logout(): Promise<any> {
        return Auth.signOut();
    }

    static confirmRegister(email: string, codeVerification: string): Promise<any> {
        return Auth.confirmSignUp(email, codeVerification);
    }

    // STATE USER

    static getAuthenticatedUser(): Promise<CognitoUser> {
        return Auth.currentAuthenticatedUser();
    }

    static getUserAttributes(userCognito: CognitoUser): Promise<CognitoUserAttribute[]> {
        return new Promise((resolve, reject) => {
            userCognito.getUserAttributes((error: Error, attributes: CognitoUserAttribute[]) => {
                if (error) {
                    reject('Hubo un erro al obtener los atributos');
                }
                resolve(attributes);
            });
        });
    }

    static getUserAttribute(userCognito: CognitoUserAttribute[], name: string): string {
        return userCognito.find(a => a.Name === name).Value || null;
    }

    /**
     * 
     * @returns getSessionUser() refresh all tokens
     */

    static getSessionUser(): Promise<CognitoUserSession> {
        return Auth.currentSession();
    }

    static async getJwtToken(): Promise<string> {
        let currentSessionUser = await this.getSessionUser();
        return currentSessionUser.getIdToken().getJwtToken();
    }

    static async getUrlAPI(): Promise<string> {
        return await API.endpoint(this.API_NAME);
    }

}