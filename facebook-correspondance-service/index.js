import settings from '../service-container/configuration';
import {Bot, Elements} from 'facebook-messenger-bot';
import request from 'requisition';

const bot = new Bot(settings.fb.myPageToken, settings.fb.myVerification);

bot.on('message', async message => {
    const {sender} = message;
    const {text} = message;

    await sender.fetch('first_name');

    //console.log(message);
    let msgIn = text;
    let smallTalkResponse = await request(`http://www.personalityforge.com/api/chat/?apiKey=eoSCUx78Dj8k0xJ2&chatBotID=3673&message=${msgIn}&externalID=1`);

    let body = await smallTalkResponse.json();
    let msgOut = body.message;

    let out = new Elements();
    out.add({text: `Hey ${sender.first_name}, ${msgOut}`});

    await bot.send(sender.id, out);
});

export default bot