if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

var Botkit = require('Botkit');

var controller = Botkit.slackbot({
    debug: true,
});

var bot = controller.spawn({
    token: process.env.token
}).startRTM();


controller.on('channel_created', function(bot,message) {

    bot.api.chat.postMessage({
        channel: '#general',
        text: '#' + message.channel.name + ' が作られました',
        as_user: true,
        link_names: 1,
    },function(err,res) {
      if (err) {
          bot.botkit.log('Failed to post message :(',err);
      }
    });
});
