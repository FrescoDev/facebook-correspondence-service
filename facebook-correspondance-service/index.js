import maKeSmallTalk from './capabilities/make-small-talk';
import {Elements as Response} from 'facebook-messenger-bot';
import correspondent from './correspondent-factory';
import infer from './capabilities/infer-service-domain';

correspondent.on('message', async message => {
    const {sender, text} = message;
    const inputMessage = text;
    let response = new Response();

    try {
        await sender.fetch('first_name');

        let domain = infer(inputMessage);
        // eslint-disable-next-line no-console        
        console.log(domain);

        let responseMessage = await maKeSmallTalk(inputMessage);
        response.add({text: `Hey ${sender.first_name}, ${responseMessage}`});

        await correspondent.send(sender.id, response);
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
    } finally {
        response.add({text: 'For some reason that broke me, try again?'});
    }
});

export default correspondent