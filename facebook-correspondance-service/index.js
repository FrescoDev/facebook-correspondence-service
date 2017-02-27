import maKeSmallTalk from './capabilities/make-small-talk';
import {Elements as Response} from 'facebook-messenger-bot';
import correspondent from './correspondent-factory';
import infer from './capabilities/infer-service-domain';

correspondent.on('message', async message => {

    const {sender, text} = message;
    const inputMessage = text;
    let response = new Response();

    try {
        let domain = await infer(inputMessage);

        if (domain != 'UNKNOWN') {
            // let workOutcome = await serivceWorker.work(inutMessage, serviceDomain)
            // respond based on work outcome
            response.add({text: 'Okay, weather service engaged'});

            await correspondent.send(sender.id, response);
        } else {
            let responseMessage = await maKeSmallTalk(inputMessage);
            response.add({text: `${responseMessage}`});

            await correspondent.send(sender.id, response);
        }
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
        response.add({text: 'For some reason that broke me, try again?'});

        await correspondent.send(sender.id, response);
    }
});

export default correspondent