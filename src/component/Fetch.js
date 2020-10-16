import React from 'react';
import CustomActivityIndicator from './CustomActivityIndicator';
import RNFetchBlob from 'rn-fetch-blob';
import session from '../session/SessionManager';

class Fetch extends React.Component {


    fetch(api, method, header, body) {

        if (header == '') {
            header = {}
            header['Content-Type'] = 'application/json';
        }
        header['Client-Type'] = 'HANDSET';
        return RNFetchBlob.config({ trusty: true, timeout: 240000, mimeType: 'multipart/form-data' }).fetch(method, api, header, body, { mimeType: 'multipart/formdata' })
            .then((res) => {
                let responseJson = res.json();

                console.log('------------------------- Api Call Start-------------------------');
                console.log(`${'\n'}Method : ${method}${'\n'}Api : ${api}${'\n'}---Request---${'\n'}Header :${JSON.stringify(header)}${'\n'}Body :${header['Content-Type'] == 'multipart/form-data' ? JSON.stringify(body) : body}${'\n'}Response : ${JSON.stringify(responseJson)}`);
                console.log('------------------------- Api Call End---------------------------');
                return responseJson;
            })

            .catch((error, statusCode) => {
                 session.logout();
                console.log('------------------------- Api Call Start-------------------------');
                console.log(`Fetch failed with error : ${error}`);

                console.log(`${'\n'}Method : ${method}${'\n'}Api : ${api}${'\n'}---Request---${'\n'}Header :${JSON.stringify(header)}${'\n'}Body :${body}${'\n'}`);
                console.log('------------------------- Api Call End-------------------------');
                return null;
            })
    }
}

const Api = new Fetch();
export default Api;