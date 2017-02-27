import path from 'path';
import {merge} from 'lodash';

// Default configuations applied to all environments
const defaultConfig = {
  env: process.env.NODE_ENV,
  get envs() {
    return {
      test: process.env.NODE_ENV === 'test',
      development: process.env.NODE_ENV === 'development',
      production: process.env.NODE_ENV === 'production'
    }
  },
  root: path.normalize(__dirname + '/../../..'),
  port: process.env.PORT || 4567,
  ip: process.env.IP || '0.0.0.0',
  fb: {
    myPageToken: process.env.FB_PAGE_TOKEN,
    myVerification: process.env.FB_VERIFICATION
  },
  personalityForge :{
    baseUrl: 'http://www.personalityforge.com/api/chat/?',
    apiKey: process.env.PF_API_KEY,
    chatBotId: process.env.PF_CHATBOT_ID
  },
  domainRoutingService : {
    baseUrl : 'https://domain-routing-service.herokuapp.com'
  }
};

// Environment specific overrides
const environmentConfigs = {
  development: {},
  test: {
    port: 5678,
    security: {
      saltRounds: 4
    }
  },
  production: {}
};

// Recursively merge configurations
export default merge(defaultConfig, environmentConfigs[process.env.NODE_ENV] || {});
