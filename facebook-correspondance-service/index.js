import settings from '../service-container/configuration';
import maKeSmallTalk from './capabilities/make-small-talk'
import {Bot, Elements} from 'facebook-messenger-bot';

// WORKER
const correspondent = new Bot(settings.fb.myPageToken, settings.fb.myVerification);

correspondent.on('message', async message => {
    const {sender, text} = message;
    const input = text;

    await sender.fetch('first_name');

    let outputMessage = await maKeSmallTalk(input);

    let output = new Elements();
    output.add({text: `Hey ${sender.first_name}, ${outputMessage}`});

    await correspondent.send(sender.id, output);
});

export default correspondent