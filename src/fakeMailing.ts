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
    console.log("Fake Mailing");
    console.log("Sending email to: ", to);
    console.log("From: ", from);
    console.log("Subject: ", subject);
    console.log("Text: ", text);
    return;
  },
};
