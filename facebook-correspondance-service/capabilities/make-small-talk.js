import request from 'requisition';
import settings from '../../service-container/configuration/index'

const makeSmallTalk = async(input) => {
    const baseUrl = settings.personalityForge.baseurl;
    const apiKey = settings.personalityForge.apiKey;
    const chatBotId = settings.personalityForge.chatBotId;

    let smallTalkFetchResponse = await request(`${baseUrl}apiKey=${apiKey}&chatBotID=${chatBotId}&message=${input}&externalID=1`);
    let body = await smallTalkFetchResponse.json();

    if (body && body.message) {
        return body.message.message;
    }

    return 'Come again? I broke when trying to understand that :(';
};

export default makeSmallTalk;