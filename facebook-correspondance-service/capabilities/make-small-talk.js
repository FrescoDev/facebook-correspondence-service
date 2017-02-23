import request from 'requisition';

const makeSmallTalk = async(input) => {
    let smallTalkFetchResponse = await request(`http://www.personalityforge.com/api/chat/?apiKey=eoSCUx78Dj8k0xJ2&chatBotID=3673&message=${input}&externalID=1`);
    let body = await smallTalkFetchResponse.json();

    if (body && body.message) {
        return body.message.message;
    }

    return 'Come again? I broke when trying to understand that :(';
};

export default makeSmallTalk;