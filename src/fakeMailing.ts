let apiKey_ = "";

export const sendgrid = {
  send: async ({
    to,
    from,
    subject,
    text,
  }: {
    to: string;
    from: string;
    subject: string;
    text: string;
  }) => {
    if (apiKey_ === "") {
      throw new Error("Sendgrid API key not set");
    }

    console.log("Fake Mailing");
    console.log("Sending email to: ", to);
    console.log("From: ", from);
    console.log("Subject: ", subject);
    console.log("Text: ", text);
    return;
  },

  setApiKey: (apiKey: string) => {
    apiKey_ = apiKey;
  },
};
