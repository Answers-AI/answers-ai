import SlackObject from "./slackObject";

class SlackMessage extends SlackObject {
  constructor(message) {
    const tidiedMessage = SlackMessage.tidy(message);
    super(tidiedMessage);
    this.object.objectType = "Slack Message";
    this.object.uid = message.client_msg_id;
  }

  static getUserName(obj) {
    let user = obj?.user_profile?.real_name;
    if (!user) {
      user = obj?.user_profile?.display_name;
    }
    return user;
  }

  static tidy(message) {
    // console.log(message.blocks);
    // console.log(message.reactions);
    return {
      objectType: "Slack Message",
      message: message.text,
      dateSent: SlackObject.convertTimestampToDate(message.ts),
      dateEdited: SlackObject.convertTimestampToDate(message?.edited?.ts),
      user: SlackMessage.getUserName(message),
    };
  }
}

export default SlackMessage;
