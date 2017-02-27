import request from 'requisition';
import settings from '../../service-container/configuration'

const infer = async(input) => {
    const {baseUrl} = settings.domainRoutingService

    let requestBody = {
        'content': input
    }

    let domainFetchResponse = await request
        .post(`${baseUrl}/inbox`)
        .send(requestBody);

    let body = await domainFetchResponse.json();

    if (body.domain) {
        return body.domain
    }

    return 'UNKNOWN'
};

export default infer;