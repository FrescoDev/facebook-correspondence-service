import request from 'requisition';
import settings from '../../service-container/configuration'

const makeSmallTalk = async(input) => {
    const {baseUrl, apiKey, chatBotId} = settings.personalityForge;

    let smallTalkFetchResponse = await request(`${baseUrl}apiKey=${apiKey}&chatBotID=${chatBotId}&message=${input}&externalID=1`);
    let body = await smallTalkFetchResponse.json();

    if (body && body.message) {
        return body.message.message;
    }

    return 'Come again? I broke when trying to understand that :(';
};

export default makeSmallTalk;