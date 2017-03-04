import maKeSmallTalk from './capabilities/make-small-talk';
import {Elements as Response} from 'facebook-messenger-bot';
import correspondent from './correspondent-factory';
import infer from './capabilities/infer-service-domain';
import request from 'requisition';
import settings from '../service-container/configuration'

correspondent.on('message', async message => {

    const {sender, text, location} = message;
    const inputMessage = text;
    let response = new Response();

    try {
        if (location) {
            const {long, lat} = location;

            let weatherDataFetchResult = await request(`${settings.openWeatherMap.baseUrl}lat=${lat}&lon=${long}&APPID=${settings.openWeatherMap.apiKey}`);
            let body = await weatherDataFetchResult.json();

            console.log(location)
            console.log(body)
            console.log(`${settings.openWeatherMap.baseUrl}lat=${lat}&lon${long}&APPID=${settings.openWeatherMap.apiKey}`)

            const weatherDescription = body.weather[0].description;

            response.add({text: `Looking like it\'s ${weatherDescription}`});

            await correspondent.send(sender.id, response);
        } else {
            let domain = await infer(inputMessage);

            if (domain != 'UNKNOWN') {
                // let workOutcome = await serivceWorker.work(inutMessage, serviceDomain)
                // respond based on work outcome
                response.add({text: 'Okay, send me your location'});

                await correspondent.send(sender.id, response);
            } else {
                let responseMessage = await maKeSmallTalk(inputMessage);
                response.add({text: `${responseMessage}`});

                await correspondent.send(sender.id, response);
            }
        }
    } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
        response.add({text: 'For some reason that broke me, try again?'});

        await correspondent.send(sender.id, response);
    }
});

export default correspondent