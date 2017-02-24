import maKeSmallTalk from './capabilities/make-small-talk'
import {Elements as Response} from 'facebook-messenger-bot';
import correspondent from './correspondent-factory';

correspondent.on('message', async message => {
    const {sender, text} = message;
    const inputMessage = text;

    // Get sender's name
    await sender.fetch('first_name');

    // Generate small talk based on input and assign to response msg
    let responseMessage = await maKeSmallTalk(inputMessage);

    let response = new Response();
    response.add({text: `Hey ${sender.first_name}, ${responseMessage}`});

    // Send the user the output response
    await correspondent.send(sender.id, response);
});

export default correspondent