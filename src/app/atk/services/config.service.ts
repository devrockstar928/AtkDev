
const serviceUrl = 'http://atkserver.mtcdevsite.com:5000';

// const serviceUrl = 'http://atk.mtcdevsite.com:5000';
export let CONFIG = {
    baseUrls: {
        base: serviceUrl,
        config: 'commands/config',
        users: `${serviceUrl}/users`,
        user: `${serviceUrl}/user`,
        contentCreator: `${serviceUrl}/ContentCreator`,
        admin: `${serviceUrl}/admin`,
        associations: `${serviceUrl}/associations`,
        events: `${serviceUrl}/events`,
        levels: `${serviceUrl}/levels`,
        logs: `${serviceUrl}/logs`,
        reports: `${serviceUrl}/reports`,
    }
};


