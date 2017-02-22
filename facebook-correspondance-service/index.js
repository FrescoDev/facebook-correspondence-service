import settings from '../service-container/configuration';
import {Bot, Elements} from 'facebook-messenger-bot';
import request from 'requisition';

const bot = new Bot(settings.fb.myPageToken, settings.fb.myVerification);

bot.on('message', async message => {
    const {sender} = message;

    await sender.fetch('first_name');

    let msgIn = message.message.text;
    let smallTalkResponse = await request(`http://www.personalityforge.com/api/chat/?apiKey=eoSCUx78Dj8k0xJ2&chatBotID=3673&message=${msgIn}&externalID=1`);
    let msgOut = smallTalkResponse.message.message;
    let body = await msgOut.json();
    console.log(body);

    let out = new Elements();
    out.add({text: `Hey ${sender.first_name}, ${msgOut}`});

    await bot.send(sender.id, out);
});

export default bot