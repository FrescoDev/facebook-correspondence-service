import settings from '../service-container/configuration';
import {Bot, Elements} from 'facebook-messenger-bot';

const bot = new Bot(settings.fb.myPageToken, settings.fb.myVerification);

bot.on('message', async message => {
    console.log(message);
    const {sender} = message;
    await sender.fetch('first_name');

    const out = new Elements();
    out.add({text: `Hey ${sender.first_name}, NioBi here! How are you ?`});

    await bot.send(sender.id, out);
});

export default bot