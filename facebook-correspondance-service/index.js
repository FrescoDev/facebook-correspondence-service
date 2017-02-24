import maKeSmallTalk from './capabilities/make-small-talk'
import {Elements as Response} from 'facebook-messenger-bot';
import correspondent from './correspondent-factory';

correspondent.on('message', async message => {
    const {sender, text} = message;
    const inputMessage = text;

    // TODO: Add error handling any failure say, Sorry, couldn't get that message for some reason. Come again?
    // Get sender's name
    await sender.fetch('first_name');

    // TODO: Add logic to send message to domain router , get intendedDomainEstimate and intendedWorkRequestEstimate
    // TODO: Add logic to send intendedWorkRequestEstimate to intendedDomainEstimate, get response : work-outcome
    // TODO: Add logic that says if domain can't be esimated, make small talk. 

    // Generate small talk based on input and assign to response msg
    let responseMessage = await maKeSmallTalk(inputMessage);
    let response = new Response();
    response.add({text: `Hey ${sender.first_name}, ${responseMessage}`});

    // Send the user the output response
    await correspondent.send(sender.id, response);
});

export default correspondent