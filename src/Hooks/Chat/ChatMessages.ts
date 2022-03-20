export type State = {
  type: "MESSAGE" | "JOIN" | "LEFT" | "OWNER_TRANSFERSHIP";
  message: {
    sentBy: string; //client_id
    username: string; //client_username,
    sentAt: string; //Date format,
    messageText: string; //client sent data,
    client_profile: string; //client profile picture URL
    message_id: string
    reply?: {
      mentioned: string; //replying username
      mentioned_user_profile: string; //replying user profile source
      mentioned_message: string,
      mentioned_user_id: string
    };
  };
};

type Action = {
  type: "MESSAGE" | "JOIN" | "LEFT" | "OWNER_TRANSFERSHIP" | "MAKE_EMPTY_MESSAGE_HISTORY";
  payload: {
    type: "MESSAGE" | "JOIN" | "LEFT" | "OWNER_TRANSFERSHIP";
    message: {
      sentBy: string; //client_id
      username: string; //client_username,
      sentAt: string; //Date format,
      messageText: string; //client sent data
      client_profile: string; //client profile picture URL
      message_id: string
      reply?: {
        mentioned: string; //replying username
        mentioned_user_profile: string; //replying user profile source
        mentioned_message: string;
        mentioned_user_id: string
      };
    };
  };
};

const message: State[] = [];

export const allMessages = (
  state: State[] = message,
  action: Action
): State[] => {
  switch (action.type) {
    case "MESSAGE": {
      const { sentBy, username, sentAt, messageText, client_profile, message_id } =
      action.payload.message;

      const {mentioned, mentioned_user_profile, mentioned_message, mentioned_user_id} = action.payload.message.reply!

      return [
        ...state,
        {
          type: "MESSAGE",
          message: {
            message_id: message_id,
            sentAt: sentAt,
            username: username,
            sentBy: sentBy,
            messageText: messageText,
            client_profile: client_profile,
            reply: {
              mentioned: mentioned, //replying username
              mentioned_user_profile: mentioned_user_profile, //replying user profile source
              mentioned_message: mentioned_message,
              mentioned_user_id: mentioned_user_id
            }
          },
        },
      ];
    }
    case "MAKE_EMPTY_MESSAGE_HISTORY" : {
      state = []
      return state
    }
    default:
      return state;
  }
};
