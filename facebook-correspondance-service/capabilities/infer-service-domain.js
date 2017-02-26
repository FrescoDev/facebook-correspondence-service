import request from 'requisition';
import settings from '../../service-container/configuration'

const infer = async(input) => {
    const {baseUrl} = settings.domainRoutingService
        ? settings.domainRoutingService
        : 'https://domain-routing-service.herokuapp.com'

    let requestBody = {
        'content': input
    }

    let domainFetchResponse = await request
        .post(`${baseUrl}/inbox`)
        .send(requestBody);

    let body = await domainFetchResponse.json();

    if (body.content) {
        return body.content
    }

    return 'UNKNOWN'
};

export default infer;