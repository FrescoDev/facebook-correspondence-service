import settings from '../service-container/configuration';
import maKeSmallTalk from './capabilities/make-small-talk'
import {Bot, Elements} from 'facebook-messenger-bot';

// BOT WORKER
const bot = new Bot(settings.fb.myPageToken, settings.fb.myVerification);

bot.on('message', async message => {
    const {sender, text} = message;
    const input = text;

    await sender.fetch('first_name');

    let outputMessage = await maKeSmallTalk(input);

    let output = new Elements();
    output.add({text: `Hey ${sender.first_name}, ${outputMessage}`});

    await bot.send(sender.id, output);
});

export default bot