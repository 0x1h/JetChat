export type State = {
  type: "MESSAGE" | "JOIN" | "LEFT" | "OWNER_TRANSFERSHIP";
  message: {
    sentBy: string; //client_id
    username: string; //client_username,
    sentAt: string; //Date format,
    messageText: string; //client sent data,
    client_profile: string; //client profile picture URL
    reply?: {
      mentioned: string; //replying username
      mentioned_user_profile: string; //replying user profile source
      mentioned_message: string;
    };
  };
};

type Action = {
  type: "MESSAGE" | "JOIN" | "LEFT" | "OWNER_TRANSFERSHIP";
  payload: {
    type: "MESSAGE" | "JOIN" | "LEFT" | "OWNER_TRANSFERSHIP";
    message: {
      sentBy: string; //client_id
      username: string; //client_username,
      sentAt: string; //Date format,
      messageText: string; //client sent data
      client_profile: string; //client profile picture URL
      reply?: {
        mentioned: string; //replying username
        mentioned_user_profile: string; //replying user profile source
        mentioned_message: string;
      };
    };
  };
};

const message: State[] = [];
// {
// 	type: "MESSAGE",
// 	message: {
// 		setBy: "", //client_id
// 		username: "", //client_username,
// 		sentAt: "", //Date format
// 	}
// }

export const allMessages = (
  state: State[] = message,
  action: Action
): State[] => {
  switch (action.type) {
    case "MESSAGE": {
      const { sentBy, username, sentAt, messageText, client_profile } =
      action.payload.message;

      return [
        ...state,
        {
          type: "MESSAGE",
          message: {
            sentAt: sentAt,
            username: username,
            sentBy: sentBy,
            messageText: messageText,
            client_profile: client_profile,
          },
        },
      ];
    }
    default:
      return state;
  }
};
